import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@mui/material';
import {Result} from './Result';
import {Toolbar} from './Toolbar';
import { ProjectModal } from './ProjectModal';


export const ProjectView = () => {


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
