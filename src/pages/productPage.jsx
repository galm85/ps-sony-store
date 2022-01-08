import { Container, Grid,Typography,Divider,Button } from '@mui/material';
import React,{useState,useEffect} from 'react'
import {useLocation} from 'react-router';
import {url} from '../config';
import {useDispatch,useSelector} from 'react-redux';
import { getBestSells } from '../redux/actions/productsAction';
import ProductCard from '../components/productCard';
import {makeStyles} from '@mui/styles';
import BestSales from '../components/bestSales';

const useStyles = makeStyles(theme=>({

    container:{
        margin:'50px 0',
    },
    dataContainer:{
        display:'flex',
        justifyContent:'space-between',
        marginBottom:'50px'
    },
    image:{
        width:'100%'
    }

}));

const ProductPage = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const location = useLocation();
    const [product,setProduct] = useState({...location.state});
    const products = useSelector(state => state.products.bestSells);
    
    useEffect(()=>{
        dispatch(getBestSells())
    },[])

    return ( 
       <Container className={classes.container}>
           
           <Grid container className={classes.dataContainer}>
               <Grid item sm={12} lg={5}>
                   <img className={classes.image} src={`${url}/${product.image}`} alt={product.title + 'image'} />
               </Grid>
               <Grid item sm={12} lg={6}>
                   <Typography variant='h2'>{product.title}</Typography>
                   <Divider/>
                   <Typography variant='h4'>Price: $ {product.price}</Typography>
                   <Typography variant='body1'>{product.description}</Typography>
                   <div>
                       <Button variant="contained">Add To Cart</Button>
                   </div>
               </Grid>
           </Grid>

           <Divider/>

           
           <BestSales/>
           
       </Container>
     );
}
 
export default ProductPage;