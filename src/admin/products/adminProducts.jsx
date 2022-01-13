import * as React from 'react';
import { styled } from '@mui/material/styles';
import { url } from "../../config";

import {Table,TableBody,TableContainer,TableCell,tableCellClasses,TableHead,TableRow,Paper,Container, IconButton, Typography, Button, Divider} from '@mui/material';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllProducts } from '../../redux/actions/productsAction';

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


export default function AdminProducts() {
  
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.products);
    const navigate = useNavigate();
  
    React.useEffect(()=>{
        dispatch(getAllProducts())
    },[])

    return (

    <Container style={{marginBottom:'50px'}}>

        <Typography variant="h1" align='center'>Products</Typography>

        <Button onClick={()=>navigate('/admin-panel/products/add-new-products')} style={{margin:'30px'}} color="primary" variant='contained'>Add New Product</Button>

        <Divider/>

        <TableContainer component={Paper} style={{marginTop:'100px'}}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
            <TableRow>
                <StyledTableCell>#</StyledTableCell>
                <StyledTableCell align="left">Image</StyledTableCell>
                <StyledTableCell align="left">Title</StyledTableCell>
                <StyledTableCell align="left">Category</StyledTableCell>
                <StyledTableCell align="left">On Stock</StyledTableCell>
                <StyledTableCell align="left">Actions</StyledTableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {products && products.map((row,index) => (
                <StyledTableRow key={row._id}>
                <StyledTableCell component="th" scope="row">{index+1}</StyledTableCell>
                <StyledTableCell align="left"><img src={`${url}/${row.image}`} width="40px" alt="category image" /></StyledTableCell>
                <StyledTableCell align="left">{row.title}</StyledTableCell>
                <StyledTableCell align="left">{row.categorie}</StyledTableCell>
                <StyledTableCell align="left">{row.onStock ? 'yes' :' no'}</StyledTableCell>
                <StyledTableCell align="left">
                    <IconButton><EditIcon color="primary" /></IconButton>
                    <IconButton><DeleteForeverIcon color="error"/></IconButton>
                </StyledTableCell>
                </StyledTableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>



    </Container>
  );
}
