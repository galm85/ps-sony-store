import { Container, Grid,Typography,Divider,Button } from '@mui/material';
import React,{useState,useEffect} from 'react'
import {useLocation} from 'react-router';
import {url} from '../config';
import {useDispatch,useSelector} from 'react-redux';
import { getBestSells } from '../redux/actions/productsAction';
import {makeStyles} from '@mui/styles';
import BestSales from '../components/bestSales';
import { addToCart, addToWishList } from '../redux/actions/usersActions';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import EditIcon from '@mui/icons-material/Edit';
import {useNavigate} from 'react-router-dom';

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
    const navigate = useNavigate();
    
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

    const displayAlert = React.useRef(null);

    return ( 
       <Container className={classes.container}>
           
           <Grid container className={classes.dataContainer}>
               <Grid item sm={12} lg={5}>
                   <img className={classes.image} src={`${url}/${product.image}`} alt={product.title + 'image'} />
               </Grid>
               <Grid item sm={12} lg={6}>
                   <div style={{display:'flex',justifyContent:'space-between'}}>
                        <Typography variant='mainProductTitle'>{product.title}</Typography>
                        <Button onClick={()=>{dispatch(addToWishList(user._id,product._id));displayAlert.current.show()}}><FavoriteBorderIcon /></Button>
                   </div>

                   <Divider style={{margin:'30px 0'}}/>

                   <div style={{display:'flex',justifyContent:'space-between',marginBottom:'50px'}}>
                        <Typography variant='h3' >Price: $ {product.price}</Typography>
                        {user && user.role === 'admin' && <Button onClick={()=>navigate(`/admin-panel/products/edit-product/${product.title}`,{state:product})}><EditIcon color="warning" /></Button>}
                   </div>

                   <Typography variant='rowLight' >{product.description}</Typography>
                   
                   <div>
                       <Button style={{marginTop:'50px'}} variant="contained" onClick={()=>addItem(product)}>Add To Cart</Button>
                   </div>
               </Grid>
           </Grid>

           <Divider/>

           
           <BestSales/>
           
          
       </Container>
     );
}
 
export default ProductPage;