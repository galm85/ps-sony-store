import { Container, Grid, Typography, Divider, Button, Box, Chip } from '@mui/material';
import React,{useState,useEffect} from 'react';
import {useLocation} from 'react-router';
import {useDispatch,useSelector} from 'react-redux';
import { getBestSells } from '../redux/actions/productsAction';
import {makeStyles} from '@mui/styles';
import BestSales from '../components/bestSales';
import { addToCart, addToWishList } from '../redux/actions/usersActions';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import EditIcon from '@mui/icons-material/Edit';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import {useNavigate} from 'react-router-dom';

const useStyles = makeStyles(theme=>({
  page:{
    paddingTop:'48px',
    paddingBottom:'80px',
  },
  imageBox:{
    background:'#0e1829',
    borderRadius:'18px',
    padding:'28px',
    border:'1px solid rgba(255,255,255,0.07)',
    position:'sticky',
    top:'88px',
  },
  image:{
    width:'100%',
    borderRadius:'12px',
    display:'block',
  },
  detailBox:{
    background:'#0e1829',
    borderRadius:'18px',
    padding:'36px',
    border:'1px solid rgba(255,255,255,0.07)',
    boxShadow:'0 8px 40px rgba(0,0,0,0.3)',
  },
}));

const ProductPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const [product, setProduct] = useState({...location.state});
  const user = useSelector(state => state.users.user);
  const navigate = useNavigate();

  useEffect(()=>{
    dispatch(getBestSells());
  },[]);

  const addItem = (product)=>{
    if(!user){
      window.location = "/signin";
      return;
    }
    dispatch(addToCart(user._id, product, 1));
  };

  const displayAlert = React.useRef(null);

  return (
    <Container className={classes.page}>
      <Grid container spacing={4} sx={{mb:6,alignItems:'flex-start'}}>

        <Grid item xs={12} lg={5}>
          <div className={classes.imageBox}>
            <img className={classes.image} src={product.image} alt={product.title + ' image'} />
          </div>
        </Grid>

        <Grid item xs={12} lg={7}>
          <div className={classes.detailBox}>
            <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',mb:2,gap:2}}>
              <Typography variant="mainProductTitle" sx={{flex:1}}>
                {product.title}
              </Typography>
              <Button
                onClick={()=>{ dispatch(addToWishList(user._id,product._id)); }}
                sx={{
                  minWidth:'auto',
                  color:'rgba(240,244,255,0.4)',
                  p:1,
                  borderRadius:'10px',
                  '&:hover':{color:'#ff6b6b',background:'rgba(255,100,100,0.08)'},
                }}
              >
                <FavoriteBorderIcon />
              </Button>
            </Box>

            {user && user.role === 'admin' &&
              <Button
                onClick={()=>navigate(`/admin-panel/products/edit-product/${product.title}`,{state:product})}
                sx={{mb:2}}
                size="small"
              >
                <EditIcon sx={{color:'#ff9100',fontSize:'1.1rem'}} />
              </Button>
            }

            <Box sx={{display:'flex',alignItems:'center',gap:1.5,mb:3}}>
              {product.onSale && (
                <Chip
                  label="ON SALE"
                  size="small"
                  sx={{
                    background:'rgba(0,230,118,0.15)',
                    color:'#00e676',
                    border:'1px solid rgba(0,230,118,0.25)',
                    fontFamily:"'Space Grotesk',sans-serif",
                    fontWeight:700,
                    fontSize:'0.65rem',
                    letterSpacing:'0.06em',
                    height:22,
                  }}
                />
              )}
              {!product.onStock && (
                <Chip
                  label="OUT OF STOCK"
                  size="small"
                  sx={{
                    background:'rgba(255,68,68,0.12)',
                    color:'#ff6b6b',
                    border:'1px solid rgba(255,68,68,0.2)',
                    fontFamily:"'Space Grotesk',sans-serif",
                    fontWeight:700,
                    fontSize:'0.65rem',
                    letterSpacing:'0.04em',
                    height:22,
                  }}
                />
              )}
            </Box>

            <Divider sx={{mb:3}}/>

            <Box sx={{mb:4}}>
              {product.onSale ? (
                <Box sx={{display:'flex',flexDirection:'column',gap:0.5}}>
                  <Typography sx={{
                    textDecoration:'line-through',
                    color:'rgba(240,244,255,0.3)',
                    fontSize:'1.2rem',
                    fontFamily:"'Space Grotesk',sans-serif",
                    fontWeight:400,
                  }}>
                    $ {product.price}
                  </Typography>
                  <Box sx={{display:'flex',alignItems:'baseline',gap:1.5}}>
                    <Typography sx={{
                      color:'#00e676',
                      fontSize:'2.4rem',
                      fontWeight:800,
                      letterSpacing:'-0.03em',
                      fontFamily:"'Space Grotesk',sans-serif",
                      textShadow:'0 0 20px rgba(0,230,118,0.3)',
                    }}>
                      $ {product.salePrice}
                    </Typography>
                    <Typography sx={{color:'rgba(240,244,255,0.4)',fontSize:'0.85rem',fontFamily:"'Inter',sans-serif"}}>
                      on sale
                    </Typography>
                  </Box>
                </Box>
              ) : (
                <Typography sx={{
                  fontSize:'2.4rem',
                  fontWeight:800,
                  letterSpacing:'-0.03em',
                  fontFamily:"'Space Grotesk',sans-serif",
                  color:'#f0f4ff',
                }}>
                  $ {product.price}
                </Typography>
              )}
            </Box>

            <Typography variant="rowLight" sx={{display:'block',mb:4,lineHeight:1.8}}>
              {product.description}
            </Typography>

            {product.onStock ? (
              <Button
                fullWidth
                variant="contained"
                startIcon={<AddShoppingCartIcon />}
                sx={{borderRadius:'12px',fontWeight:700,py:1.7,fontSize:'1rem',letterSpacing:'0.01em'}}
                onClick={()=>addItem(product)}
              >
                Add to Cart
              </Button>
            ) : (
              <Button
                fullWidth
                variant="contained"
                disabled
                sx={{borderRadius:'12px',fontWeight:700,py:1.7,fontSize:'1rem'}}
              >
                Out of Stock
              </Button>
            )}
          </div>
        </Grid>
      </Grid>

      <Divider sx={{mb:6}}/>
      <BestSales/>
    </Container>
  );
};

export default ProductPage;
