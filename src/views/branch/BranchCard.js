import React from "react";
import clsx from "clsx";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  IconButton,
  Grid,
  Typography,
} from "@mui/material";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import MarkunreadIcon from "@mui/icons-material/Markunread";
import { useDispatch, useSelector } from "react-redux";
import {
  branchClearActiveEvent,
  branchStartDelete,
  branchSetActive,
  branchUpdate,
} from "../../actions/branch";
import Swal from "sweetalert2";
import { uiOpenBranchModal } from "../../actions/ui";

const classes = {
  root: {
    display: "flex",
    flexDirection: "column",
  },
  statsItem: {
    alignItems: "center",
    display: "flex",
  },
};

export const BranchCard = ({ className, branch, ...rest }) => {
  const dispatch = useDispatch();
  const { activeEvent } = useSelector((state) => state.branch);
  const baseURL = "http://127.0.0.1:8000/";

  const handleDeleteClick = (branch) => {
    dispatch(branchSetActive(branch));
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(branchStartDelete());
        Swal.fire("Deleted!", "Your Branch has been deleted.", "success");
      }
      else{
        dispatch(branchClearActiveEvent());
      }
    });
  };

  const handleEditClick = (branch) => {
    dispatch(branchSetActive(branch));
    dispatch(uiOpenBranchModal());
  };

  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="center" mb={3}>
          <Avatar
           className = "avatar"
            alt="Product"
            src={baseURL + branch.avatar}
            variant="square"
          />
        </Box>
        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h5"
        >
          {branch.name}
        </Typography>
        <Typography align="center" color="textPrimary" variant="p">
          {branch.description}
        </Typography>

        <Grid container justify="space-between" spacing={2}>
          <Grid xs={6} item>
            <br />
            <LocalPhoneIcon className="icon_font" spacing={2} />
            <Typography className="text_foot" variant="p" align="center">
              {branch.phone}
            </Typography>
          </Grid>
          <Grid xs={6} item>
            <br />
            <MarkunreadIcon className="icon_font" spacing={2} />
            <Typography variant="p" align="center" className="text_foot">
              {branch.address}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <Box flexGrow={1} />
      <Divider />
      <Box p={2}>
        <Grid
          container
          justify="space-between"
          spacing={2}
          className={"container_foot"}
        >
          <Grid item xs={1}>
            <PermContactCalendarIcon color="action" />
          </Grid>
          <Grid item xs={8}>
            <Typography color="textSecondary" display="inline" variant="p">
              {branch.user.email}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Grid container justify="space-between" spacing={2}>
              <Grid item xs={4}>
                <IconButton className="icon_font" onClick={() => handleEditClick(branch)}>
                  <EditIcon color="primary" />
                </IconButton>
              </Grid>
              <Grid item xs={4}>
                <IconButton className="icon_font" onClick={() => handleDeleteClick(branch)}>
                  <DeleteIcon color="error" />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid />
        </Grid>
      </Box>
    </Card>
  );
};
