import * as React from 'react';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import {Table,TableBody,TableContainer,TableCell,tableCellClasses,TableHead,TableRow,Paper,Container, IconButton, Typography, Button, Divider,Grid, Select, MenuItem} from '@mui/material';

import { useDispatch,useSelector } from 'react-redux';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { makeStyles } from '@mui/styles';
import SearchBar from '../../components/searchBar';
import { deleteMessage, getAllMessages, getMessagesByEmail } from '../../redux/actions/messagesActions';

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
    '&:hover':{
        background:'rgba(0,0,0,0.2)'
    },
    
    
  },

  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


const useStyles = makeStyles(theme=>({
    row:{
        position:'relative',
        zIndex:2,
        
        "&:hover":{
            background:'rgba(0,0,0,0.2)',
            color:"blue"
        }
    },
    
    }
))


export default function AdminMessages() {
  
    const dispatch = useDispatch();
    const messages = useSelector(state => state.messages.messages);
    const navigate = useNavigate();
    const classes = useStyles();
    const [search,setSearch] = React.useState(null);

    const handleSearch = (e)=>{
        setSearch(e.target.value);
    }
    const handleClick = (e)=>{
        if(search === '' || search === null){
            dispatch(getAllMessages());
         
        }else{
            dispatch(getMessagesByEmail(search));
        
        }
    }

    React.useEffect(()=>{
        dispatch(getAllMessages());
    },[])

    return (

    <Container style={{margin:'30px 0'}}>

        <Typography variant="h1" gutterBottom align='center'>Messages</Typography>
        
        <Grid container style={{display:'flex',justifyContent:'space-between'}}>
            
            <Grid item sm={12} md={8} style={{textAlign:'right'}} >
                    <SearchBar  handleSearch={handleSearch} handleClick={handleClick}/> 
            </Grid>
                
            
        </Grid>

        <Divider style={{margin:'30px 0'}}/>

        <TableContainer component={Paper} style={{marginTop:'50px',height:'80vh',overflow:'scroll'}} >
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead style={{position:'sticky',top:'0',zIndex:'100'}}>
            <TableRow>
                <StyledTableCell>#</StyledTableCell>
                <StyledTableCell align="left">Date</StyledTableCell>
                <StyledTableCell align="left">Name</StyledTableCell>
                <StyledTableCell align="left">Email</StyledTableCell>
                <StyledTableCell align="left">Phone</StyledTableCell>
                <StyledTableCell align="left">Subject</StyledTableCell>
                <StyledTableCell align="left">Status</StyledTableCell>
                <StyledTableCell align="left">Actions</StyledTableCell>
            </TableRow>
            </TableHead>
            <TableBody >
            {messages && messages.map((row,index) => (
                <StyledTableRow key={row._id} className={classes.row} onClick={()=>navigate(`/admin-panel/messages/${row._id}`,{state:row})} style={{cursor:'pointer'}} >
                    <StyledTableCell component="th" scope="row">{index+1}</StyledTableCell>
                    <StyledTableCell style={{fontWeight: row.read ? '300' : '700'}} align="left">{new Date(row.createdAt).toLocaleDateString()} - {new Date(row.createdAt).toLocaleTimeString()}</StyledTableCell>
                    <StyledTableCell style={{fontWeight: row.read ? '300' : '700'}} align="left">{row.name}</StyledTableCell>
                    <StyledTableCell style={{fontWeight: row.read ? '300' : '700'}} align="left">{row.email}</StyledTableCell>
                    <StyledTableCell style={{fontWeight: row.read ? '300' : '700'}} align="left">{row.phone}</StyledTableCell>
                    <StyledTableCell style={{fontWeight: row.read ? '300' : '700'}} align="left">{row.subject}</StyledTableCell>
                    <StyledTableCell style={{fontWeight: row.read ? '300' : '700'}} align="left">{row.status}</StyledTableCell>
                    <StyledTableCell style={{fontWeight: row.read ? '300' : '700'}} align="left"  style={{position:'relative',zIndex:200}} onClick={(e)=>{e.stopPropagation();dispatch(deleteMessage(row._id))}}>
                        <IconButton ><DeleteForeverIcon color="error" /></IconButton>
                    </StyledTableCell>
                </StyledTableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>



    </Container>
  );
}
