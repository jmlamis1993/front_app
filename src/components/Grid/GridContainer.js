import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import Grid from "@mui/material/Grid";
import { styled } from '@mui/material/styles';
import useClasses from "../../helpers/useClasses.js";

const styles = {
  grid: {
    margin: "0 -15px !important",
    width: "unset",
  },
};


export default function GridContainer(props) {
  const classes = useClasses(styles);
  const { children, ...rest } = props;
  return (
    <Grid container {...rest} className={classes.grid}>
      {children}
    </Grid>
  );
}

GridContainer.propTypes = {
  children: PropTypes.node,
};
