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


const initialValues = {
  "id": '',
  "name": '',
  "category": '',
  "description": '',         
  "avatar": '',   
  "address": '',         
  "phone": '',                  
  "tags": '',
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
  const [file, setFile] = useState();

  useEffect(() => {
    if (activeEvent) {
      setFieldValue(activeEvent);
    } else {
      setFieldValue(initialValues);
    }
  }, [activeEvent]);

  const handleDeleteClick = () => { 
      dispatch(uiCloseBranchModal());  
  };

  const handleDescription = (e) => {
    setDescription(e);
  };
 
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
                  onChange={(e) => handleAvatar(e)}
                  id="file"
                  type="file"
                  inputProps={{ accept: ".png,.jpg,.jpeg" }}
                />
                <Grid item xs={12}>
                  <InputField
                    size="small"
                    margin="normal"
                    type="text"
                    name="tags"
                    label="tags"
                    variant="outlined"
                    value={values.tags}
                    fullWidth
                  />
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
    </>
  );
};
 