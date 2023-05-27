import { Divider, Grid, Typography ,Button,IconButton} from '@mui/material';
import React from 'react'
import {url} from '../config';
import {makeStyles} from '@mui/styles';
import {useNavigate} from 'react-router';
import CancelIcon from '@mui/icons-material/Cancel';
import { removeFromWishList } from '../redux/actions/usersActions';
import {useDispatch,useSelector} from 'react-redux';


const useStyles = makeStyles(theme=>({
    item:{
        position:'relative',
        margin:'10px 10px',
        transition:'all ease 0.2s',
        borderRadius:'10px',
        cursor:'pointer',
        "&:hover $image":{
            boxShadow:'5px 5px 5px rgba(0,0,0,0.2)',
            transform:'scale(1.03)'
        },
        "&:hover $data":{
            display:'block',
            opacity:'1',
            bottom:'50%',
            transition:'translateY(-50%)',
            padding:'20px 5px'
        },
        "&:hover $remove":{
            opacity:1
        }
        
    },
    data:{
        opacity:'0',
        position:'absolute',
        transition:'all ease 0.2s',
        bottom:'0',
        textAlign:'center',
        width:'100%',
        background:'rgba(0,0,0,0.8)',
        color:'white'   
    },
    image:{
        width:'100%',
        height:'100%',
        objectFit:'contain',
        borderRadius:'10px',
        transition:'all ease 0.2s',

    },
    remove:{
        opacity:0,
        position:'absolute',
        zIndex:200,
        top:-10,
        right:-10
    }
}))



const ProductCard = ({product,fromWishList}) => {

    const classes = useStyles();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state=>state.users.user);

    const removeFromFavorite = (e)=>{
        e.stopPropagation();
        dispatch(removeFromWishList(user._id,product._id));
    }
    
    return ( 

        <Grid item  sm={10} md={3} lg={2} className={classes.item} style={{margin:'40px 20px'}} onClick={()=>navigate(`/games/${product.title.toLowerCase().replace(/ /g,'-')}`,{state:product})}>
           
            <img className={classes.image} src={product.image}   alt={product.title} />
            <div className={classes.data}>
                <Typography variant="productTitle">{product.title}</Typography>
                <Divider/>
                {product.onSale ? 
                <div style={{display:'flex',flexDirection:'column'}}>
                    <Typography  variant="productTitle" style={{textDecoration:'line-through'}}>price:  $ {product.price}</Typography>
                    <Typography variant="productTitle">Sale:  $ {product.salePrice}</Typography>
                </div>
                :
                    <Typography variant="productTitle">price:  $ {product.price}</Typography>
                }

                {!product.onStock && 
                <>
                    <Divider/>
                    <Typography variant="productTitle">out of stock</Typography>
                </>
                }
            </div>
            {fromWishList && 
                <div className={classes.remove} onClickCapture={(e)=>removeFromFavorite(e)}>
                    <IconButton ><CancelIcon color="error"/></IconButton>
                </div>
            }

        </Grid>
     );
}
 
export default ProductCard;