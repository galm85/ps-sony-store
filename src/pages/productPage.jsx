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
        margin:'0 auto',
        paddingTop:'40px',
        paddingBottom:'70px',
    },
    dataContainer:{
        display:'flex',
        justifyContent:'space-between',
        marginBottom:'60px',
        alignItems:'flex-start',
        gap:'40px',
    },
    imageBox:{
        background:'#f8f9fc',
        borderRadius:'20px',
        padding:'32px',
        border:'1px solid #e8edf5',
        position:'sticky',
        top:'24px',
    },
    image:{
        width:'100%',
        borderRadius:'12px',
        display:'block',
    },
    detailBox:{
        background:'#ffffff',
        borderRadius:'20px',
        padding:'40px',
        border:'1px solid #e8edf5',
        boxShadow:'0 2px 12px rgba(13,27,62,0.06)',
    },
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
                   <div className={classes.imageBox}>
                       <img className={classes.image} src={product.image} alt={product.title + ' image'} />
                   </div>
               </Grid>
               <Grid item sm={12} lg={6}>
                   <div className={classes.detailBox}>
                       <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'8px'}}>
                            <Typography variant='mainProductTitle'>{product.title}</Typography>
                            <Button onClick={()=>{dispatch(addToWishList(user._id,product._id));displayAlert.current.show()}} sx={{minWidth:'auto',color:'#6b7a99','&:hover':{color:'#e53935',background:'#fff5f5'}}}><FavoriteBorderIcon /></Button>
                       </div>

                       <Divider style={{margin:'24px 0'}}/>

                       <div style={{marginBottom:'32px'}}>
                           {product.onSale ?
                           <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
                               <Typography variant='h3' style={{textDecoration:'line-through',color:'#94a3b8',fontSize:'1.4rem',fontWeight:400}}>$ {product.price}</Typography>
                               <Typography variant='h3' style={{color:'#00a86b',fontSize:'2.2rem',fontWeight:700,letterSpacing:'-0.02em'}}>$ {product.salePrice} <span style={{fontSize:'1rem',fontWeight:500,color:'#6b7a99'}}>on sale</span></Typography>
                           </div>
                        :
                            <Typography variant='h3' style={{fontSize:'2.2rem',fontWeight:700,letterSpacing:'-0.02em'}}>$ {product.price}</Typography>
                        }
                            {user && user.role === 'admin' && <Button onClick={()=>navigate(`/admin-panel/products/edit-product/${product.title}`,{state:product})} sx={{mt:1}}><EditIcon color="warning" /></Button>}
                       </div>

                       <Typography variant='rowLight' style={{display:'block',marginBottom:'36px'}}>{product.description}</Typography>

                       <div>
                           {product.onStock ?
                           <Button fullWidth variant="contained" sx={{borderRadius:'12px',fontWeight:700,padding:'16px',fontSize:'1.05rem',letterSpacing:'0.01em'}} onClick={()=>addItem(product)}>Add to Cart</Button>
                           :
                           <Button fullWidth variant="contained" sx={{borderRadius:'12px',fontWeight:700,padding:'16px',fontSize:'1.05rem'}} disabled>Out of Stock</Button>
                        }
                       </div>
                   </div>
               </Grid>
           </Grid>

           <Divider/>

           
           <BestSales/>
           
          
       </Container>
     );
}
 
export default ProductPage;