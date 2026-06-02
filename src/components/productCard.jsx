import { Divider, Grid, Typography ,IconButton} from '@mui/material';
import React from 'react'
import {makeStyles} from '@mui/styles';
import {useNavigate} from 'react-router';
import CancelIcon from '@mui/icons-material/Cancel';
import { removeFromWishList } from '../redux/actions/usersActions';
import {useDispatch,useSelector} from 'react-redux';


const useStyles = makeStyles(theme=>({
    item:{
        position:'relative',
        margin:'12px',
        transition:'all 0.3s ease',
        borderRadius:'16px',
        cursor:'pointer',
        overflow:'hidden',
        background:'#ffffff',
        border:'1px solid #e8edf5',
        boxShadow:'0 2px 10px rgba(13,27,62,0.06)',
        "&:hover $image":{
            transform:'scale(1.05)',
        },
        "&:hover $data":{
            opacity:'1',
            transform:'translateY(0)',
        },
        "&:hover $remove":{
            opacity:1,
        },
        "&:hover":{
            boxShadow:'0 10px 32px rgba(13,27,62,0.14)',
            transform:'translateY(-5px)',
            border:'1px solid rgba(0,55,145,0.18)',
        }
    },
    data:{
        opacity:'0',
        position:'absolute',
        transition:'all 0.3s ease',
        bottom:'0',
        left:'0',
        right:'0',
        transform:'translateY(8px)',
        textAlign:'center',
        background:'linear-gradient(to top, rgba(13,27,62,0.92) 0%, rgba(13,27,62,0.55) 55%, transparent 100%)',
        color:'white',
        padding:'50px 12px 16px',
    },
    image:{
        width:'100%',
        height:'100%',
        objectFit:'cover',
        display:'block',
        transition:'all 0.3s ease',
    },
    remove:{
        opacity:0,
        position:'absolute',
        zIndex:200,
        top:8,
        right:8,
        transition:'opacity 0.2s ease',
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