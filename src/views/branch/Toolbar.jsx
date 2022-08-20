import {React,useState} from 'react';
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
import { branchClearSearch, branchSearch } from '../../actions/branch';

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
  const [search, setSearch] = useState();
  const handleClick = () => {
     dispatch(uiOpenBranchModal());  
  }
  const handleChange = (e) => {
    if(e.target.value === '') { 
      dispatch(branchClearSearch()); 
    }
    else{
      dispatch(branchSearch(e.target.value)); 
    }  
    setSearch(e.target.value); 
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
              placeholder="Search Branch"
              variant="outlined"
              onChange={(e) => handleChange(e)}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  </div>

  )
  
}
