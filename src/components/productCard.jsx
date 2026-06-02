import { Grid, Typography, IconButton } from '@mui/material';
import React from 'react';
import {makeStyles} from '@mui/styles';
import {useNavigate} from 'react-router';
import CancelIcon from '@mui/icons-material/Cancel';
import { removeFromWishList } from '../redux/actions/usersActions';
import {useDispatch,useSelector} from 'react-redux';

const useStyles = makeStyles(theme=>({
  item:{
    position:'relative',
    margin:'10px',
    transition:'all 0.32s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    borderRadius:'14px',
    cursor:'pointer',
    overflow:'hidden',
    background:'#0e1829',
    border:'1px solid rgba(255,255,255,0.07)',
    aspectRatio:'2/3',
    minHeight:'260px',
    "&:hover $image":{
      transform:'scale(1.07)',
    },
    "&:hover $overlay":{
      opacity:1,
      transform:'translateY(0)',
    },
    "&:hover $removeBtn":{
      opacity:1,
    },
    "&:hover":{
      boxShadow:'0 0 0 1px rgba(26,106,255,0.45), 0 20px 50px rgba(0,0,0,0.65)',
      transform:'translateY(-5px)',
      border:'1px solid rgba(26,106,255,0.38)',
    }
  },
  image:{
    width:'100%',
    height:'100%',
    objectFit:'cover',
    display:'block',
    transition:'transform 0.38s ease',
    position:'absolute',
    inset:0,
  },
  overlay:{
    opacity:0,
    position:'absolute',
    transition:'all 0.3s ease',
    bottom:0,
    left:0,
    right:0,
    transform:'translateY(6px)',
    textAlign:'center',
    background:'linear-gradient(to top, rgba(6,10,20,0.99) 0%, rgba(6,10,20,0.82) 38%, transparent 100%)',
    padding:'60px 14px 16px',
    zIndex:10,
  },
  removeBtn:{
    opacity:0,
    position:'absolute',
    zIndex:20,
    top:8,
    right:8,
    transition:'opacity 0.2s ease',
  },
  pricePill:{
    position:'absolute',
    bottom:12,
    left:14,
    zIndex:5,
    background:'rgba(0,63,207,0.88)',
    backdropFilter:'blur(8px)',
    borderRadius:'6px',
    padding:'3px 10px',
    color:'white',
    fontWeight:700,
    fontSize:'0.78rem',
    fontFamily:"'Space Grotesk', sans-serif",
    transition:'opacity 0.25s ease',
    pointerEvents:'none',
  },
  salePill:{
    position:'absolute',
    top:10,
    left:12,
    zIndex:15,
    background:'rgba(0,230,118,0.92)',
    backdropFilter:'blur(8px)',
    borderRadius:'5px',
    padding:'2px 9px',
    color:'#04200e',
    fontWeight:800,
    fontSize:'0.68rem',
    fontFamily:"'Space Grotesk', sans-serif",
    letterSpacing:'0.06em',
    textTransform:'uppercase',
  },
  outOfStockBadge:{
    position:'absolute',
    top:10,
    left:12,
    zIndex:15,
    background:'rgba(255,68,68,0.85)',
    backdropFilter:'blur(8px)',
    borderRadius:'5px',
    padding:'2px 9px',
    color:'white',
    fontWeight:700,
    fontSize:'0.68rem',
    fontFamily:"'Space Grotesk', sans-serif",
    letterSpacing:'0.04em',
    textTransform:'uppercase',
  }
}));


const ProductCard = ({product, fromWishList}) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.users.user);

  const removeFromFavorite = (e)=>{
    e.stopPropagation();
    dispatch(removeFromWishList(user._id, product._id));
  };

  return (
    <Grid
      item sm={10} md={3} lg={2}
      className={classes.item}
      style={{margin:'14px 12px'}}
      onClick={()=>navigate(`/games/${product.title.toLowerCase().replace(/ /g,'-')}`,{state:product})}
    >
      <img className={classes.image} src={product.image} alt={product.title} />

      {product.onSale && <div className={classes.salePill}>Sale</div>}
      {!product.onStock && <div className={classes.outOfStockBadge}>Out of stock</div>}

      {!product.onSale && (
        <div className={classes.pricePill}>$ {product.price}</div>
      )}

      <div className={classes.overlay}>
        <Typography style={{
          color:'#f0f4ff',
          fontFamily:"'Space Grotesk', sans-serif",
          fontWeight:600,
          fontSize:'0.92rem',
          lineHeight:1.3,
          marginBottom:'8px',
          textShadow:'0 1px 8px rgba(0,0,0,0.8)',
        }}>
          {product.title}
        </Typography>

        {product.onSale ? (
          <div style={{display:'flex',justifyContent:'center',alignItems:'center',gap:'8px'}}>
            <span style={{textDecoration:'line-through',color:'rgba(255,255,255,0.3)',fontSize:'0.78rem'}}>
              $ {product.price}
            </span>
            <span style={{
              color:'#00e676',
              fontWeight:700,
              fontSize:'1.05rem',
              fontFamily:"'Space Grotesk',sans-serif",
              textShadow:'0 0 12px rgba(0,230,118,0.5)',
            }}>
              $ {product.salePrice}
            </span>
          </div>
        ) : (
          <span style={{
            color:'#f0f4ff',
            fontWeight:700,
            fontSize:'1.05rem',
            fontFamily:"'Space Grotesk',sans-serif",
          }}>
            $ {product.price}
          </span>
        )}
      </div>

      {fromWishList && (
        <div className={classes.removeBtn} onClickCapture={(e)=>removeFromFavorite(e)}>
          <IconButton
            size="small"
            sx={{
              background:'rgba(10,16,30,0.7)',
              backdropFilter:'blur(6px)',
              border:'1px solid rgba(255,255,255,0.1)',
              color:'#ff6b6b',
              width:28,
              height:28,
              '&:hover':{background:'rgba(255,100,100,0.15)',color:'#ff4444'},
            }}
          >
            <CancelIcon sx={{fontSize:'0.95rem'}} />
          </IconButton>
        </div>
      )}
    </Grid>
  );
};

export default ProductCard;
