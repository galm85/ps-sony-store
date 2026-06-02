import { Container, Grid, Typography, Box } from '@mui/material';
import React,{useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {getBestSells} from '../redux/actions/productsAction';
import ProductCard from './productCard';

const BestSales = () => {
  const dispatch = useDispatch();
  const best = useSelector(state => state.products.bestSells);

  useEffect(()=>{
    dispatch(getBestSells());
  },[]);

  return (
    <Container sx={{py:6}}>
      <Box sx={{display:'flex',alignItems:'center',gap:'14px',mb:5}}>
        <Box sx={{
          width:4,
          height:30,
          background:'linear-gradient(to bottom, #003fcf, #1a6aff)',
          borderRadius:'3px',
          flexShrink:0,
        }}/>
        <Typography variant="h3" sx={{margin:0,fontSize:{xs:'1.5rem',md:'2rem'}}}>
          Most Popular
        </Typography>
      </Box>
      <Grid container sx={{display:'flex',justifyContent:'flex-start',flexWrap:'wrap',m:'-6px'}}>
        {best && best.map(item=>(
          <ProductCard key={item._id} product={item}/>
        ))}
      </Grid>
    </Container>
  );
};

export default BestSales;
