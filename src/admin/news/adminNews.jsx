import * as React from 'react';
import { styled } from '@mui/material/styles';
import { url } from '../../config';
import {Table,TableBody,TableContainer,TableCell,tableCellClasses,TableHead,TableRow,Paper,Container, IconButton, Typography, Button, Divider,Grid, Select, MenuItem} from '@mui/material';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { makeStyles } from '@mui/styles';
import {deleteCategory, getAllCategories} from '../../redux/actions/categoriesActions';
import { deleteOrder, getAllOrders, getOrderByEmailSearch, getOrderById } from '../../redux/actions/ordersActions';
import { getAllArticles } from '../../redux/actions/articlesActions';
import SearchBar from '../../components/searchBar';

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
    }
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
    }
}))


export default function AdminNews() {
  
    const dispatch = useDispatch();
    const orders = useSelector(state => state.orders.orders);
    const articles = useSelector(state => state.articles.articles);
    const navigate = useNavigate();
    const classes = useStyles();
    const [search,setSearch] = React.useState(null);
    const [searchBy,setSearchBy] = React.useState('id');

    const handleSearch = (e)=>{
        setSearch(e.target.value);
    }
    const handleClick = (e)=>{
        if(search === '' || search === null){
            dispatch(getAllOrders());
         
        }else{
            dispatch(getOrderByEmailSearch(search));
            // dispatch(getOrderById(search));
        }
    }

    React.useEffect(()=>{
        dispatch(getAllOrders());
        dispatch(getAllArticles());
    },[])

    return (

    <Container style={{margin:'30px 0'}}>

        <Typography variant="h1" gutterBottom align='center'>News (Articles)</Typography>
        
        <Grid container style={{display:'flex',justifyContent:'space-between'}}>
            <Grid item sm={12} md={4}>
                <Button onClick={()=>navigate('/admin-panel/news/add-new-article')} style={{margin:'30px'}} color="primary" variant='contained'>Add New Article</Button>
            </Grid>
            <Grid item sm={12} md={8} style={{textAlign:'right'}} >
                    <SearchBar  handleSearch={handleSearch} handleClick={handleClick}/> 
            </Grid>
                
            
        </Grid>

        <Divider/>

        <TableContainer component={Paper} style={{marginTop:'100px',height:'80vh',overflow:'scroll'}} >
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead style={{position:'sticky',top:'0',zIndex:'100'}}>
            <TableRow>
                <StyledTableCell>#</StyledTableCell>
                <StyledTableCell align="left">Date</StyledTableCell>
                <StyledTableCell align="left">Image</StyledTableCell>
                <StyledTableCell align="left">Title</StyledTableCell>
                <StyledTableCell align="left">Comments</StyledTableCell>
                <StyledTableCell align="left">Author</StyledTableCell>
                <StyledTableCell align="left">Actions</StyledTableCell>
            </TableRow>
            </TableHead>
            <TableBody >
            {articles && articles.map((row,index) => (
                <StyledTableRow key={row._id} className={classes.row} onClick={()=>navigate(`/admin-panel/orders/${row._id}`,{state:row})} style={{cursor:'pointer'}} >
                    <StyledTableCell component="th" scope="row">{index+1}</StyledTableCell>
                    <StyledTableCell align="left">{new Date(row.createdAt).toLocaleDateString()} - {new Date(row.createdAt).toLocaleTimeString()}</StyledTableCell>
                    <StyledTableCell align="left"><img src={`${url}/${row.image}`} width="50px" alt="article image" /></StyledTableCell>
                    <StyledTableCell align="left">{row.title}</StyledTableCell>
                    <StyledTableCell align="left">{row.comments.length}</StyledTableCell>
                    <StyledTableCell align="left">{row.author?row.author : 'Admin'}</StyledTableCell>
                    
                    <StyledTableCell align="left"  style={{position:'relative',zIndex:200}} onClick={(e)=>{e.stopPropagation();dispatch(deleteOrder(row._id))}}>
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
