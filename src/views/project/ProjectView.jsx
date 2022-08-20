import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@mui/material';
import {Result} from './Result';
import {Toolbar} from './Toolbar';
import { ProjectModal } from './ProjectModal';
import { useDispatch} from 'react-redux';
import { projectStartLoading } from '../../actions/project';



export const ProjectView = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(projectStartLoading())
  }, [dispatch])
  

  return (   
      <Container maxWidth={false}>
       <Toolbar />
        <Box mt={3}>
          <Result/>
        </Box>
        <ProjectModal/>
      </Container>
   )


}
