import * as React from 'react';
import { styled } from '@mui/material/styles';
import { url } from "../../config";

import {Table,TableBody,TableContainer,TableCell,tableCellClasses,TableHead,TableRow,Paper,Container, IconButton, Typography, Button, Divider} from '@mui/material';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {deleteCategory, getAllCategories} from '../../redux/actions/categoriesActions';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


export default function AdminCategories() {
  
    const dispatch = useDispatch();
    const categories = useSelector(state => state.categories.categories);
    const navigate = useNavigate();
  
    React.useEffect(()=>{
        dispatch(getAllCategories())
    },[])

    return (

    <Container style={{marginBottom:'50px'}}>

        <Typography variant="h1" align='center'>Cagtegories</Typography>

        <Button onClick={()=>navigate('/admin-panel/categories/add-new-category')} style={{margin:'30px'}} color="primary" variant='contained'>Add New Category</Button>

        <Divider/>

        <TableContainer component={Paper} style={{marginTop:'100px'}}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
            <TableRow>
                <StyledTableCell>#</StyledTableCell>
                <StyledTableCell align="left">Image</StyledTableCell>
                <StyledTableCell align="left">Title</StyledTableCell>
                <StyledTableCell align="left">Parent Category</StyledTableCell>
                <StyledTableCell align="left">Actions</StyledTableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {categories && categories.map((row,index) => (
                <StyledTableRow key={row._id}>
                <StyledTableCell component="th" scope="row">{index+1}</StyledTableCell>
                <StyledTableCell align="left"><img src={`${url}/${row.image}`} width="40px" alt="category image" /></StyledTableCell>
                <StyledTableCell align="left">{row.title}</StyledTableCell>
                <StyledTableCell align="left">{row.parentCategorieTitle}</StyledTableCell>
                <StyledTableCell align="left">
                    <IconButton><EditIcon color="primary" /></IconButton>
                    <IconButton><DeleteForeverIcon color="error" onClick={()=>dispatch(deleteCategory(row._id))}/></IconButton>
                </StyledTableCell>
                </StyledTableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>



    </Container>
  );
}
