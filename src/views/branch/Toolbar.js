import React from 'react';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  
} from '@mui/material';
import { Search as SearchIcon } from 'react-feather';
import { useDispatch } from 'react-redux';
import { uiOpenBranchModal } from '../../actions/ui';

const classes = {
    root: {},
    importButton: {
      marginRight: '15px'
    },
    exportButton: {
      marginRight: '15px'
    }  
    }
      
export const Toolbar = ({ className, ...rest }) => {
   
  
  const dispatch = useDispatch();
  const handleClick = () => {
     dispatch(uiOpenBranchModal());  
  }

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >

    <Box
      display="flex"
      justifyContent="flex-end"
    >     
      <Button
        color="primary"
        variant="contained"
        onClick={handleClick}
      >
        Add Branch
      </Button>
    </Box>
    <Box mt={3}>
      <Card>
        <CardContent>
          <Box maxWidth={500}>
            <TextField
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SvgIcon
                      fontSize="small"
                      color="action"
                    >
                      <SearchIcon />
                    </SvgIcon>
                  </InputAdornment>
                )
              }}
              placeholder="Search product"
              variant="outlined"
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  </div>

  )
}
