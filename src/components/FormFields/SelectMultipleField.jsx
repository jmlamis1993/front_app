
import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { useField } from 'formik';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
      color: 'blue',
    },
  },
};



function getStyles( e,personName, theme) {
  return {
    fontWeight:
      personName.indexOf(e) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
export const SelectMultipleField = (props) => {

    const theme = useTheme();
    const { label, data,errorText, ...rest} = props;  
    const [field, meta] = useField(props);
    const [personName, setPersonName] = React.useState([]);
  
    const handleChange = (event) => {
      const {
        target: { value },
      } = event;
      setPersonName(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );
    };
  
    return (
      <div>
        <FormControl {...rest}  sx={{  width: '100%' }}>
          <InputLabel id="demo-multiple-chip-label">Members</InputLabel>
          <Select
             {...field}
            labelId="demo-multiple-chip-label"
            fullWidth
            id="demo-multiple-chip"
            multiple
            value={personName}
            rows ={2}
            onChange={handleChange}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((e) => (                  
                  <Chip key={e} label={e} sx={{marginRight:'2px', color:'white',background:'#1976d2'}}/>
                ))}
                 
                  
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {data.map((e) => (
              <MenuItem
                key={e.value}
                value={e.label}
                style={getStyles(e, personName, theme)}
              >
                {e.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
}
