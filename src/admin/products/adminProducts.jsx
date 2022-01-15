import * as React from 'react';
import { styled } from '@mui/material/styles';
import { url } from "../../config";
import SearchBar from '../../components/searchBar';

import {Table,TableBody,TableContainer,TableCell,tableCellClasses,TableHead,TableRow,Paper,Container, IconButton, Typography, Button, Divider, Grid} from '@mui/material';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteProduct, getAllProducts, getSearchProduct } from '../../redux/actions/productsAction';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

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
    const [search,setSearch] = React.useState(null);

  

    React.useEffect(()=>{
      dispatch(getAllProducts());


    },[])

    const handleSearch = (e)=>{
      setSearch(e.target.value);
    };

    const handleClick = ()=>{
      if(search === ''){
        dispatch(getAllProducts());
      }else{
        dispatch(getSearchProduct(search));

      }
    }
   

    return (

    <Container style={{marginBottom:'50px'}}>

        <Typography variant="h1" align='center'>Products</Typography>
        
        <Grid container style={{display:'flex',alignItems:'center'}}>
          <Grid item sm={12} md={6}>
              <Button onClick={()=>navigate('/admin-panel/products/add-new-products')} style={{margin:'30px'}} color="primary" variant='contained'>Add New Product</Button>
          </Grid>
          <Grid style={{textAlign:'right'}} item sm={12} md={6}>
              <SearchBar handleSearch={handleSearch} handleClick={handleClick}/>
          </Grid>
        </Grid>



        <Divider style={{margin:'20px 0'}}/>

        <TableContainer component={Paper} style={{marginTop:'100px'}} style={{height:'80vh',overflow:'scroll'}}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table" >
            <TableHead   style={{position:'sticky',top:'0',zIndex:'100'}}>
            <TableRow >
                <StyledTableCell>#</StyledTableCell>
                <StyledTableCell align="left">Image</StyledTableCell>
                <StyledTableCell align="left">Title</StyledTableCell>
                <StyledTableCell align="left">Category</StyledTableCell>
                <StyledTableCell align="left">Platform</StyledTableCell>
                <StyledTableCell align="left">Price</StyledTableCell>
                <StyledTableCell align="left">On Stock</StyledTableCell>
                <StyledTableCell align="left">On Sale</StyledTableCell>
                <StyledTableCell align="left">New</StyledTableCell>
                <StyledTableCell align="left">Pre Order</StyledTableCell>
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
                <StyledTableCell align="left">{row.platform}</StyledTableCell>
                <StyledTableCell align="left">{row.salePrice ? row.salePrice : row.price}</StyledTableCell>
                <StyledTableCell align="left">{row.onStock ? <CheckCircleIcon color="success"/> :<RemoveCircleIcon color="error"/>}</StyledTableCell>
                <StyledTableCell align="left">{row.onSale ? <CheckCircleIcon color="success"/> :<RemoveCircleIcon color="error"/>}</StyledTableCell>
                <StyledTableCell align="left">{row.newGame ? <CheckCircleIcon color="success"/> :<RemoveCircleIcon color="error"/>}</StyledTableCell>
                <StyledTableCell align="left">{row.comingSoon ? <CheckCircleIcon color="success"/> :<RemoveCircleIcon color="error"/>}</StyledTableCell>
                <StyledTableCell align="left">
                    <IconButton onClick={()=>navigate(`/admin-panel/products/edit-product/${row.title}`,{state:row})}><EditIcon color="primary" /></IconButton>
                    <IconButton><DeleteForeverIcon color="error" onClick={()=>dispatch(deleteProduct(row._id))}/></IconButton>
                </StyledTableCell>
                </StyledTableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>



    </Container>
  );
}
