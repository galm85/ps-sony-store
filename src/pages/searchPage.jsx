import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { Button, Container, Divider, Grid, Typography } from '@mui/material';
import { getSearchProduct } from '../redux/actions/productsAction';
import ProductCard from '../components/productCard';
import { useNavigate } from 'react-router-dom';

const SearchPage = () => {

    const location = useLocation();
    const value = location.state;
    const dispatch = useDispatch();
    const products = useSelector(state=>state.products.products);
    const navigate = useNavigate();
    
    React.useEffect(()=>{
        dispatch(getSearchProduct(value));
    },[value])

    return ( 
       <Container>
           <Typography align='center' style={{padding:'20px 0'}} variant="h4">Reasult of: {value}</Typography>
           <Button color="error" variant="outlined" style={{margin:'0 0 10px 0'}} onClick={()=>navigate('/')}>Return</Button>
           <Divider/>
           

            <Grid container>
                {products && products.map(item=>(
                    <ProductCard key={item._id} product={item}/>
                ))}
                
            </Grid>


       </Container>
     );
}
 
export default SearchPage;