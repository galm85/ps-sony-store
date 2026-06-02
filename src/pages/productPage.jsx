import { Container, Grid,Typography,Divider,Button } from '@mui/material';
import React,{useState,useEffect} from 'react'
import {useLocation} from 'react-router';
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
        paddingTop:'20px',
        paddingBottom:'40px',
    },
    dataContainer:{
        display:'flex',
        justifyContent:'space-between',
        marginBottom:'50px',
    },
    image:{
        width:'100%',
        borderRadius:'16px',
        boxShadow:'0 8px 40px rgba(0,0,0,0.6)',
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
                   
                   <img className={classes.image} src={product.image} alt={product.title + 'image'} />
               </Grid>
               <Grid item sm={12} lg={6}>
                   <div style={{display:'flex',justifyContent:'space-between'}}>
                        <Typography variant='mainProductTitle'>{product.title}</Typography>
                        <Button onClick={()=>{dispatch(addToWishList(user._id,product._id));displayAlert.current.show()}}><FavoriteBorderIcon /></Button>
                   </div>

                   <Divider style={{margin:'30px 0'}}/>

                   <div style={{display:'flex',justifyContent:'space-between',marginBottom:'50px'}}>
                       {product.onSale ? 
                       <div style={{display:'flex',flexDirection:'column'}}>
                       <Typography variant='h3' style={{textDecoration:'line-through'}} >Price: $ {product.price}</Typography>
                       <Typography variant='h3' style={{color:'#4ade80',marginTop:'20px'}} >Sale Price: $ {product.salePrice}</Typography>
                       </div>
                    :
                        <Typography variant='h3' >Price: $ {product.price}</Typography>
                    }
                        {user && user.role === 'admin' && <Button onClick={()=>navigate(`/admin-panel/products/edit-product/${product.title}`,{state:product})}><EditIcon color="warning" /></Button>}
                   </div>

                   <Typography variant='rowLight' >{product.description}</Typography>
                   
                   <div>
                       {product.onStock ?
                       <Button style={{marginTop:'50px',borderRadius:'50px',fontWeight:700,textTransform:'none',padding:'14px 40px',fontSize:'1rem',boxShadow:'0 4px 20px rgba(0,103,221,0.4)'}} variant="contained" onClick={()=>addItem(product)}>Add To Cart</Button>
                       :
                       <Button style={{marginTop:'50px'}} variant="contained" disabled >Out Of Stock</Button>
                    }
                   </div>
               </Grid>
           </Grid>

           <Divider/>

           
           <BestSales/>
           
          
       </Container>
     );
}
 
export default ProductPage;