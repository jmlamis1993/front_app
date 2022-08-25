import { React, useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { Formik } from "formik";
import * as Yup from "yup";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import {
  Box,
  Typography,
  TextareaAutosize,
  Button,
  InputAdornment,
  CardMedia
} from "@mui/material";
import WebAssetIcon from "@mui/icons-material/WebAsset";
import {
  branchClearActiveEvent,
  branchStartDelete,
  branchStartAddNew,
  branchStartUpdate,
} from "../../actions/branch";
import { useDispatch, useSelector } from "react-redux";
import { uiCloseBranchModal } from "../../actions/ui";
import InputField from "../../components/FormFields/InputField";
import MarkunreadIcon from "@mui/icons-material/Markunread";
import { v4 as uuid } from "uuid";
import { category } from "../../helpers/constants";
import SelectField from "../../components/FormFields/SelectField";
import Multiselect from "multiselect-react-dropdown";
import { tagsStartLoading } from "../../actions/tag";
import { TagForm } from "../calendar/TagForm";


const initialValues = {
  "id": '',
  "name": '',
  "category": '',
  "description": '',         
  "avatar": '',   
  "address": '',         
  "phone": '',                  
  "tags": [],
  "website": '',         
  "contact": [],
  "user": {
     _id : '',
     name: '',
     email: '',
     }
};

export const BranchForm = () => {
  const { activeEvent } = useSelector((state) => state.branch);
  const dispatch = useDispatch();
  const [values, setFieldValue] = useState(initialValues);
  const [descript, setDescription] = useState(
    activeEvent ? activeEvent.description : ""
  );
  const { tags } = useSelector((state) => state.tag);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleCloseDialog = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };
  const [file, setFile] = useState();
  const [selectedTags, SetSelectedTags] = useState(
    activeEvent ? activeEvent.member : []
  );
  const [listTags, SetListTags] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState();
  const [selectedFile, setSelectedFile] = useState()
  const [preview, setPreview] = useState()

  useEffect(() => {
    let listTags = [];
    if (tags.length !== 0) {
      listTags = tags.map((e) => ({
        name: e.name,
        id: e.id,
      }));
    } else {
      dispatch(tagsStartLoading());
      listTags = tags.map((e) => ({
        name: e.name,
        id: e.id,
      }));
    }   
    SetListTags(listTags);
  }, []);

  useEffect(() => {
    if (activeEvent) {
      setFieldValue(activeEvent);
    } else {
      setFieldValue(initialValues);
    }
  }, [activeEvent]);

  useEffect(() => {
    if (!selectedFile) {
        setPreview(undefined)
        return
    }

    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl)
}, [selectedFile])

const onSelectFile = e => {
    if (!e.target.files || e.target.files.length === 0) {
        setSelectedFile(undefined)
        return
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0])
    handleAvatar(e);
}
const handleAvatar = (e) => {
  const aux = e.target.files[0];
  const fileReader = new FileReader();
  fileReader.readAsDataURL(aux);
  fileReader.onload = function(){
    let base64 = fileReader.result;
    base64 = base64.split(',');
    setFile(base64[1]);
   
  } 
};

  const handleDeleteClick = () => { 
      dispatch(uiCloseBranchModal());  
  };

  const handleDescription = (e) => {
    setDescription(e);
  };
  const onSelectTags = (selectedList, selectedItem) => {
    SetSelectedTags([...selectedTags, selectedItem]);
  }
  
  const onRemoveTags = (selectedList, removedItem) => {
  const opt = selectedTags.filter( e => (e.id !== removedItem.id));
  SetSelectedTags(opt);    
  }
 

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={values}
        validationSchema={Yup.object().shape({
        name: Yup.string().max(50).required('Name is a riquired field'),  
        category : Yup.string().required('Category is a riquired field'),     
        /*project: Yup.string().max(255).required('La nueva contraseña  es requerida'), 
        time_spent: Yup.string().max(255).required('La nueva contraseña  es requerida'),        
        est_time: Yup.string().max(255).required('Debe confirmar la contraseña').oneOf([Yup.ref("newPassword"), null],"Las contraseñas no coinciden"),
        //description: Yup.string().max(255).required('La nueva contraseña  es requerida'), 
        tags: Yup.string().max(255).required('La nueva contraseña  es requerida'),
        priority: Yup.string().max(255).required('La nueva contraseña  es requerida'),
        type: Yup.string().max(255).required('La nueva contraseña  es requerida'),
        status: Yup.string().max(255).required('La nueva contraseña  es requerida'),  
        start_date: Yup.string().max(255).required('La nueva contraseña  es requerida'),  
        end_date: Yup.string().max(255).required('La nueva contraseña  es requerida'),*/
        })}
        onSubmit={(values, actions) => {
          if (activeEvent) {
            dispatch(
              branchStartUpdate({
                ...values,
                description: descript,
                avatar: file,
              })
            );
          } else {            
            dispatch(
              branchStartAddNew({
                id: uuid(),
                ...values,
                avatar: file,
                description: descript,
              })
            );
          }
          dispatch(uiCloseBranchModal());
        }}
      >
        {({
          errors,
          handleBlur,
          handleSubmit,
          handleChange,
          touched,
          values,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box mb={3}>
              <Typography color="textPrimary" variant="h5">
                {activeEvent ? "Update branch" : "New Branch"}
              </Typography>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <InputField
                  size="small"
                  margin="normal"
                  type="text"
                  name="name"
                  label="Branch Name"
                  variant="outlined"
                  value={values.name}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
              <SelectField
                  size="small"
                  required
                  name="category"
                  margin="normal"
                  label="Category"
                  data={category}
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextareaAutosize
                  aria-label="minimum height"
                  minRows={6}
                  placeholder="Description"
                  style={{ width: "100%", fontSize: "16px" }}
                  value={descript}
                  onChange={(e) => handleDescription(e.target.value)}
                />
                <label> Avatar </label>
                <br />
                <InputField
                  variant="outlined"
                  required
                  name="file"
                  onChange={(e) => onSelectFile(e)}
                  id="file"
                  type="file"
                  inputProps={{ accept: ".png,.jpg,.jpeg" }}
                />
                {selectedFile &&  <>
                <CardMedia
                component="img"
                sx={{
                height: 233,
                width: 350,
                maxHeight: { xs: 233, md: 167 },
                maxWidth: { xs: 350, md: 250 },
                }}
                src={preview}
                />
                </> }
                <Grid item xs={12} sx={{marginTop:'10px'}}>
            <Typography color="textPrimary" variant="p" size="small">
              Tags
            </Typography>
                <Multiselect
                  options={listTags} // Options to display in the dropdown
                  selectedValues={selectedTags}
                  onSelect={onSelectTags} // Function will trigger on select event
                  onRemove={onRemoveTags} // Function will trigger on remove event
                  displayValue="name" // Property name to display in the dropdown options
                />
                </Grid>
                <Grid>
                <Button size="small" onClick={handleClickOpen}>Create New Tag</Button>
              </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <InputField
                      fullWidth
                      size="small"
                      margin="normal"
                      id="input-with-icon-textfield"
                      label="Phone"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LocalPhoneIcon />
                          </InputAdornment>
                        ),
                      }}
                      variant="outlined"
                      value={values.phone}
                      name="phone"
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <InputField
                      fullWidth
                      size="small"
                      margin="normal"
                      id="input-with-icon-textfield"
                      label="Website"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <WebAssetIcon />
                          </InputAdornment>
                        ),
                      }}
                      variant="outlined"
                      value={values.website}
                      name="website"
                    />
                  </Grid>
                </Grid>
              
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={8}>
                    <InputField
                      fullWidth
                      size="small"
                      margin="normal"
                      id="input-with-icon-textfield"
                      label="Address"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <MarkunreadIcon />
                          </InputAdornment>
                        ),
                      }}
                      variant="outlined"
                      value={values.address}
                      name="address"
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={3}>
                <Button
                  size="large"
                  margin="normal"
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  {" "}
                  {activeEvent ? "Editar" : "Adicionar"}
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button
                  size="large"
                  margin="normal"
                  variant="contained"
                  color={ "inherit"}
                  fullWidth
                  onClick={handleDeleteClick}
                >
                  {" "}
                  {"Cancelar"}
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
      <TagForm
        selectedValue={selectedValue}
        open={open}
        onClose={handleCloseDialog}
      />
     
    </>
  );
};
 