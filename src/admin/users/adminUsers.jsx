import * as React from 'react';
import { styled } from '@mui/material/styles';
import { url } from "../../config";

import {Table,TableBody,TableContainer,TableCell,tableCellClasses,TableHead,TableRow,Paper,Container, IconButton, Typography, Button, Divider} from '@mui/material';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {deleteCategory, getAllCategories} from '../../redux/actions/categoriesActions';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { deleteUser, getAllUsers } from '../../redux/actions/usersActions';

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


export default function AdminUsers() {
  
    const dispatch = useDispatch();
    const categories = useSelector(state => state.categories.categories);
    const users = useSelector(state => state.users.users);
    const navigate = useNavigate();
  
    React.useEffect(()=>{
        dispatch(getAllCategories());
        dispatch(getAllUsers());
    },[])

    return (

    <Container style={{marginBottom:'50px'}}>

        <Typography variant="h1" align='center'>Users</Typography>

        <Button onClick={()=>navigate('/admin-panel/users/new-admin')} style={{margin:'30px'}} color="primary" variant='contained'>Add New Admin</Button>

        <Divider/>

        <TableContainer component={Paper} style={{marginTop:'100px'}}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
            <TableRow>
                <StyledTableCell>#</StyledTableCell>
                <StyledTableCell align="left">Image</StyledTableCell>
                <StyledTableCell align="left">Name</StyledTableCell>
                <StyledTableCell align="left">Phone</StyledTableCell>
                <StyledTableCell align="left">Address</StyledTableCell>
                <StyledTableCell align="left">State</StyledTableCell>
                <StyledTableCell align="left">Rule</StyledTableCell>
                <StyledTableCell align="left">Actions</StyledTableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {users && users.map((row,index) => (
                <StyledTableRow key={row._id}>
                <StyledTableCell component="th" scope="row">{index+1}</StyledTableCell>
                <StyledTableCell align="left"><img src={`${url}/${row.image}`} width="40px" alt="category image" /></StyledTableCell>
                <StyledTableCell align="left">{row.firstName}{row.lastName}</StyledTableCell>
                <StyledTableCell align="left">{row.phone}</StyledTableCell>
                <StyledTableCell align="left">{row.address}</StyledTableCell>
                <StyledTableCell align="left">{row.state}</StyledTableCell>
                <StyledTableCell align="left">{row.role}</StyledTableCell>
                <StyledTableCell align="left">
                    <IconButton onClick={()=>navigate(`/admin-panel/user/edit-user/${row.title.toLowerCase()}`,{state:row})} ><EditIcon color="primary" /></IconButton>
                    <IconButton><DeleteForeverIcon color="error" onClick={()=>dispatch(deleteUser(row._id))}/></IconButton>
                </StyledTableCell>
                </StyledTableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>



    </Container>
  );
}
