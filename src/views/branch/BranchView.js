import React, { useState} from 'react';
import { useDispatch, useSelector } from 'react-redux'

import {
  Box,
  Container,
  Grid,
  
} from '@mui/material';
import './style.css'
import {Toolbar} from './Toolbar';
import {BranchCard} from './BranchCard';
import { BranchModal } from './BranchModal';
import { Pagination } from '@mui/material';;



const classes = {
  productCard: {
    height: '100%'
  },
  
}


export const BranchView = () => {
  
    const dispatch = useDispatch();
    const {branches} = useSelector(state => state.branch);


   


  return (
    <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Grid
            container
            spacing={3}
          >
            {branches.map((branch) => (
              <Grid
                item
                key={branch.id}
                lg={4}
                md={6}
                xs={12}
              >
                <BranchCard
                  className={classes.productCard}
                  branch={branch}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box
          mt={3}
          display="flex"
          justifyContent="center"
        >
          <Pagination
            color="primary"
            count={3}
            size="small"
          />
        </Box>
        <BranchModal/>
      </Container>  

  )
}
