import React from 'react'
import {Box,Button,TextField} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { makeStyles } from "@mui/styles";


const useStyles = makeStyles(theme=>({

    searchContainer:{
        height:'50px',
    },
    searchInput:{
        height:'100%',
        
    },
    searchBtn:{
        height:'100%',
    },
}))


const SearchBar = ({handleSearch,handleClick}) => {

    const classes = useStyles();

    return ( 
        <Box className={classes.searchContainer}>
            <TextField  id="standard-basic" className={classes.searchInput}  label="Search"  variant="outlined" name="search" onChange={handleSearch} />
            <Button variant='contained' className={classes.searchBtn} onClick={()=>handleClick()}><SearchIcon /></Button>
        </Box>
     );
}
 
export default SearchBar;