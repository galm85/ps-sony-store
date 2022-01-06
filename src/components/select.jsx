import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch } from 'react-redux';
import { getAllProducts, getProducts } from '../redux/actions/productsAction';

export default function BasicSelect({categories}) {

    const dispatch = useDispatch();

  const handleChange = (event) => {
      if(!event.target.value){
         dispatch(getAllProducts());
      }else{
         dispatch(getProducts(event.target.value));

      }
  };

  return (
    <Box sx={{ minWidth: '80%' }} style={{margin:'50px auto'}}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={null}
          label="Category"
          onChange={handleChange}
         
        >
             <MenuItem value={undefined}>All</MenuItem>
            {categories && categories.map(row=>(
                <MenuItem value={row.title}>{row.title}</MenuItem>

            ))}
          
        </Select>
      </FormControl>
    </Box>
  );
}
