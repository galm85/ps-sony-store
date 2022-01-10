import { Container, Grid,Typography,Divider,Button } from '@mui/material';
import React,{useState,useEffect} from 'react'
import {useLocation} from 'react-router';
import {url} from '../config';
import {useDispatch,useSelector} from 'react-redux';
import { getBestSells } from '../redux/actions/productsAction';
import {makeStyles} from '@mui/styles';
import BestSales from '../components/bestSales';
import { addToCart } from '../redux/actions/usersActions';

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
    const user = useSelector(state => state.users.user);
    
    useEffect(()=>{
        dispatch(getBestSells())
    },[])

    const addItem = (product)=>{
        if(!user){
            window.location = "/signin";
            return;
        }else{
            dispatch(addToCart(user._id,product,1));
        }
    }

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
                       <Button variant="contained" onClick={()=>addItem(product)}>Add To Cart</Button>
                   </div>
               </Grid>
           </Grid>

           <Divider/>

           
           <BestSales/>
           
       </Container>
     );
}
 
export default ProductPage;