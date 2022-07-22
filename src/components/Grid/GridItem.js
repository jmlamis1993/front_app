import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { styled } from '@mui/material/styles';
import Grid from "@mui/material/Grid";
import useClasses from "../../helpers/useClasses.js";

const styles = {
  grid: {
    padding: "0 15px !important",
  },
};

export default function GridItem(props) {
  const classes = useClasses(styles);
  const { children, ...rest } = props;
  return (
    <Grid item {...rest} className={classes.grid}>
      {children}
    </Grid>
  );
}

GridItem.propTypes = {
  children: PropTypes.node,
};
