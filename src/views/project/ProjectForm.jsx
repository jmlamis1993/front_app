import { React, useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { Formik } from "formik";
import * as Yup from "yup";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import {
  Box,
  TextField,
  Typography,
  TextareaAutosize,
  Button,
  InputAdornment,
} from "@mui/material";
import { projectStartAddNew, projectStartUpdate } from "../../actions/project";
import { useDispatch, useSelector } from "react-redux";
import { uiCloseProjectModal } from "../../actions/ui";
import InputField from "../../components/FormFields/InputField";
import MarkunreadIcon from "@mui/icons-material/Markunread";
import moment from "moment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { branchStartLoading } from "../../actions/branch";
import SelectField from "../../components/FormFields/SelectField";
import { userStartLoading } from "../../actions/user";
import Multiselect from "multiselect-react-dropdown";

const initialValues = {
  name: "",
  description: "",
  startDate: "",
  EndDate: "",
  status: "",
};

export const ProjectForm = () => {
  const { activeEvent } = useSelector((state) => state.project);
  const { branches } = useSelector((state) => state.branch);
  const { users } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [values, setFieldValue] = useState(initialValues);
  const [descript, setDescription] = useState(
    activeEvent ? activeEvent.description : ""
  );
  const now = moment().minutes(0).seconds(0).add(1, "hours");
  const [start, setSartDate] = useState(activeEvent ? values.start : now);
  const [end, setEndDate] = useState(activeEvent ? values.end : now);
  const [status, setStatus] = useState(activeEvent ? activeEvent.status : "");
  const [listbransh, SetListBransh] = useState([]);
  const [listuser, SetListUsers] = useState([]);
  const [selectedOptions, SetselectedOptions] = useState(
    activeEvent ? activeEvent.members : []
  );

  useEffect(() => {
    let listuser = [];
    if (users.length !== 0) {
      listuser = users.map((e) => ({
        name: e.name,
        id: e.id,
      }));
    } else {
      dispatch(userStartLoading());
      listuser = users.map((e) => ({
        name: e.name,
        id: e.id,
      }));
    }
    SetListUsers(listuser);
  }, [users]);
  useEffect(() => {
    if (activeEvent) {
      setFieldValue(activeEvent);
    } else {
      setFieldValue(initialValues);
    }
  }, [activeEvent, setFieldValue]);
  useEffect(() => {
    let listbranch = [];
    if (branches.length !== 0) {
      listbranch = branches.map((e) => ({
        value: e.id,
        label: e.name,
      }));
    } else {
      dispatch(branchStartLoading());
      listbranch = branches.map((e) => ({
        value: e.id,
        label: e.name,
      }));
    }
    SetListBransh(listbranch);
  }, [branches]);

  const handleCancelClick = () => {
    dispatch(uiCloseProjectModal());
  };

  const handleDescription = (e) => {
    setDescription(e);
  };
  const handleStartDateChange = (e) => {
    setSartDate(e);
  };
  const handleEndDateChange = (e) => {
    setEndDate(e);
  };
  const handleSetStatus = (e) => {
    setStatus(e.target.value);
  };
  const onSelect = (selectedList, selectedItem) => {
    SetselectedOptions([...selectedOptions, selectedItem]);
  };

  const onRemove = (selectedList, removedItem) => {
    const opt = selectedOptions.filter((e) => e.id !== removedItem.id);
    SetselectedOptions(opt);
  };

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={values}
        validationSchema={Yup.object().shape({
          /*task_name: Yup.string().max(255).required('La contraseña actual es requerida'),     
       project: Yup.string().max(255).required('La nueva contraseña  es requerida'), 
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
              projectStartUpdate({
                ...values,
                status: status,
                description: descript,
                start: start,
                end: end,
                members: selectedOptions,
              })
            );
          } else {
            dispatch(
              projectStartAddNew({
                ...values,
                status: status,
                description: descript,
                start: start,
                end: end,
                members: selectedOptions,
              })
            );
          }
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
                {activeEvent ? "Update Project" : "New Project"}
              </Typography>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <InputField
                  size="small"
                  margin="normal"
                  type="text"
                  name="name"
                  label="Project Name"
                  variant="outlined"
                  value={values.name}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <SelectField
                  size="small"
                  value ={values.companie}
                  required
                  name="companie"
                  label="Company"
                  data={listbransh}
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <br />
              <Grid item xs={12}>
                <TextareaAutosize
                  aria-label="minimum height"
                  minRows={6}
                  placeholder="Description"
                  style={{ width: "100%", fontSize: "16px" }}
                  value={descript}
                  onChange={(e) => handleDescription(e.target.value)}
                />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <DatePicker
                        label="Start Date"
                        value={start}
                        onChange={handleStartDateChange}
                        renderInput={(params) => (
                          <TextField
                            size="small"
                            margin="normal"
                            required
                            id="start"
                            name="date"
                            fullWidth
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                            {...params}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <DatePicker
                        label="End Date"
                        value={end}
                        onChange={handleEndDateChange}
                        renderInput={(params) => (
                          <TextField
                            size="small"
                            margin="normal"
                            required
                            id="end"
                            name="end"
                            fullWidth
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                            {...params}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={8}>
                    <InputField
                      fullWidth
                      size="small"
                      onChange={handleSetStatus}
                      margin="normal"
                      id="input-with-icon-textfield"
                      label="Status"
                      variant="outlined"
                      value={status}
                      name="email"
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Multiselect
                  options={listuser} // Options to display in the dropdown
                  selectedValues={selectedOptions}
                  onSelect={onSelect} // Function will trigger on select event
                  onRemove={onRemove} // Function will trigger on remove event
                  displayValue="name" // Property name to display in the dropdown options
                />
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
                  {activeEvent ? "Edit" : "Add"}
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button
                  size="large"
                  margin="normal"
                  variant="contained"
                  color="inherit"
                  fullWidth
                  onClick={handleCancelClick}
                >
                  {" "}
                  {"Cancel"}
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};
