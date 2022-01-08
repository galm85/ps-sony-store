import { Container, Grid, Typography } from '@mui/material';
import React,{useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {getBestSells} from '../redux/actions/productsAction';
import ProductCard from './productCard';


const BestSales = () => {

    const dispatch = useDispatch();
    const best = useSelector(state => state.products.bestSells);

    useEffect(()=>{
        dispatch(getBestSells());
    },[])

    return ( 
        <Container >
            <Typography variant="h3" align="center" >Most Popular</Typography>
            <Grid container style={{display:'flex',justifyContent:'center'}}>
                {best && best.map(item=>(
                    <ProductCard key={best._id} product={item}/>
                ))}
            </Grid>
        </Container>

        
     );
}
 
export default BestSales;