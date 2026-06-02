import { Container, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Box, Button, Divider } from '@mui/material';
import React,{useEffect} from 'react';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useDispatch,useSelector } from 'react-redux';
import { getCart, removeItemFromCart } from '../redux/actions/usersActions';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';

const useStyles = makeStyles(theme=>({
  page:{
    paddingTop:'48px',
    paddingBottom:'80px',
  },
  pageTitle:{
    color:'#f0f4ff',
    fontFamily:"'Space Grotesk', sans-serif",
    fontWeight:700,
    letterSpacing:'-0.02em',
    marginBottom:'8px',
    fontSize:'2rem',
  },
  headCell:{
    color:'rgba(240,244,255,0.4)',
    fontFamily:"'Space Grotesk', sans-serif",
    fontSize:'0.68rem',
    fontWeight:700,
    textTransform:'uppercase',
    letterSpacing:'0.1em',
    borderBottom:'1px solid rgba(255,255,255,0.07) !important',
    padding:'14px 16px',
    backgroundColor:'rgba(255,255,255,0.02)',
  },
  bodyCell:{
    color:'rgba(240,244,255,0.8)',
    padding:'14px 16px',
    verticalAlign:'middle',
    borderBottom:'1px solid rgba(255,255,255,0.05) !important',
    fontSize:'0.9rem',
    fontFamily:"'Inter', sans-serif",
  },
  summaryBox:{
    padding:'28px',
    position:'sticky',
    top:'88px',
    background:'#0e1829',
    borderRadius:'16px',
    border:'1px solid rgba(255,255,255,0.08)',
    boxShadow:'0 8px 32px rgba(0,0,0,0.3)',
  },
}));

const Cart = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector(state => state.users.user);
  const cart = useSelector(state => state.users.cart);
  const totalPrice = useSelector(state => state.users.totalPrice);
  const navigate = useNavigate();

  useEffect(()=>{
    if(user){
      dispatch(getCart(user._id));
    }else{
      navigate('/signin');
    }
  },[dispatch,user,navigate]);

  const removeItem = (userId, itemId)=>{
    dispatch(removeItemFromCart(userId, itemId));
    window.location.reload();
  };

  return (
    <Container className={classes.page}>
      <Typography className={classes.pageTitle}>My Cart</Typography>
      <Typography sx={{color:'rgba(240,244,255,0.35)',fontSize:'0.85rem',mb:4,fontFamily:"'Inter',sans-serif"}}>
        {cart ? cart.length : 0} {cart && cart.length === 1 ? 'item' : 'items'}
      </Typography>

      <Grid container spacing={3} sx={{alignItems:'flex-start'}}>
        <Grid item xs={12} md={8}>
          <TableContainer
            component={Paper}
            sx={{
              background:'#0e1829',
              border:'1px solid rgba(255,255,255,0.07)',
              borderRadius:'16px',
              boxShadow:'none',
              overflow:'hidden',
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.headCell}>#</TableCell>
                  <TableCell className={classes.headCell}>Item</TableCell>
                  <TableCell className={classes.headCell}>Title</TableCell>
                  <TableCell className={classes.headCell}>Price</TableCell>
                  <TableCell className={classes.headCell}>Qty</TableCell>
                  <TableCell className={classes.headCell}>Total</TableCell>
                  <TableCell className={classes.headCell}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart && cart.map((item, index)=>(
                  <TableRow key={item._id} sx={{'&:last-child td':{borderBottom:'none !important'}}}>
                    <TableCell className={classes.bodyCell} sx={{color:'rgba(240,244,255,0.3)'}}>{index+1}</TableCell>
                    <TableCell className={classes.bodyCell}>
                      <img
                        src={item.image}
                        width="48px"
                        height="48px"
                        alt={item.title}
                        style={{objectFit:'cover',borderRadius:'8px',border:'1px solid rgba(255,255,255,0.07)'}}
                      />
                    </TableCell>
                    <TableCell className={classes.bodyCell} sx={{fontWeight:500,color:'#f0f4ff',maxWidth:'180px'}}>
                      {item.title}
                    </TableCell>
                    <TableCell className={classes.bodyCell}>$ {item.price}</TableCell>
                    <TableCell className={classes.bodyCell}>
                      <Box sx={{
                        display:'inline-flex',
                        alignItems:'center',
                        justifyContent:'center',
                        background:'rgba(255,255,255,0.06)',
                        borderRadius:'6px',
                        px:1.5,
                        py:0.5,
                        minWidth:32,
                        fontWeight:600,
                        fontFamily:"'Space Grotesk',sans-serif",
                        fontSize:'0.9rem',
                        color:'#f0f4ff',
                      }}>
                        {item.amount}
                      </Box>
                    </TableCell>
                    <TableCell className={classes.bodyCell} sx={{fontWeight:700,color:'#f0f4ff',fontFamily:"'Space Grotesk',sans-serif"}}>
                      $ {item.amount * item.price}
                    </TableCell>
                    <TableCell className={classes.bodyCell}>
                      <IconButton
                        size="small"
                        onClick={()=>removeItem(user._id, item._id)}
                        sx={{
                          color:'rgba(255,100,100,0.6)',
                          '&:hover':{color:'#ff4444',background:'rgba(255,68,68,0.1)'},
                        }}
                      >
                        <RemoveCircleOutlineIcon sx={{fontSize:'1.15rem'}} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box className={classes.summaryBox}>
            <Typography sx={{
              fontFamily:"'Space Grotesk',sans-serif",
              fontWeight:700,
              fontSize:'1.15rem',
              color:'#f0f4ff',
              mb:3,
            }}>
              Order Summary
            </Typography>

            <Box sx={{display:'flex',justifyContent:'space-between',mb:1.5}}>
              <Typography sx={{color:'rgba(240,244,255,0.5)',fontSize:'0.88rem',fontFamily:"'Inter',sans-serif"}}>Subtotal</Typography>
              <Typography sx={{color:'#f0f4ff',fontWeight:600,fontFamily:"'Space Grotesk',sans-serif"}}>$ {totalPrice}</Typography>
            </Box>

            <Box sx={{display:'flex',justifyContent:'space-between',mb:3,alignItems:'center'}}>
              <Typography sx={{color:'rgba(240,244,255,0.5)',fontSize:'0.88rem',fontFamily:"'Inter',sans-serif",display:'flex',alignItems:'center',gap:'6px'}}>
                <LocalShippingOutlinedIcon sx={{fontSize:'1rem'}} /> Shipping
              </Typography>
              <Typography sx={{color:'#00e676',fontWeight:600,fontSize:'0.85rem',fontFamily:"'Space Grotesk',sans-serif"}}>Free</Typography>
            </Box>

            <Divider sx={{borderColor:'rgba(255,255,255,0.07)',mb:3}}/>

            <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center',mb:3.5}}>
              <Typography sx={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:'1rem',color:'rgba(240,244,255,0.7)'}}>
                Total
              </Typography>
              <Typography sx={{
                fontFamily:"'Space Grotesk',sans-serif",
                fontWeight:800,
                fontSize:'1.6rem',
                color:'#f0f4ff',
                letterSpacing:'-0.02em',
              }}>
                $ {totalPrice}
              </Typography>
            </Box>

            <Button
              onClick={()=>navigate('/checkout')}
              fullWidth
              variant="contained"
              sx={{borderRadius:'12px',fontWeight:700,py:1.5,fontSize:'0.95rem',letterSpacing:'0.01em'}}
            >
              Proceed to Checkout
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart;
