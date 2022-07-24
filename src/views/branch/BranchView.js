import React, { useState, useEffect} from 'react';
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
import { Pagination } from '@mui/material';
import usePagination from '../../helpers/usePagination';



const classes = {
  productCard: {
    height: '100%'
  },
  
}


export const BranchView = () => {

    const dispatch = useDispatch();
    const {branches} = useSelector(state => state.branch); 
    const {searchTerm} = useSelector(state => state.branch); 
    let [page, setPage] = useState(1);
    const PER_PAGE = 6;
    const count = Math.ceil(branches.length / PER_PAGE);
    const _DATA = usePagination(branches, PER_PAGE);
    const[listbranches, setListbranches] = useState(_DATA)

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  useEffect(()=>{
    if(searchTerm !== '') { 
      const _DATA = branches.filter(item => item.name.includes(searchTerm));
      console.log(branches.filter(item => item.name.includes(searchTerm)));
      setListbranches(_DATA )    
    }
  },[searchTerm])
  
  return (
    <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Grid
            container
            spacing={3}
          >
            {_DATA.currentData().map((branch) => (
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
            size="small"
            count={count}
            onChange={handleChange}
          />
        </Box>
        <BranchModal/>
      </Container>  

  )
}
