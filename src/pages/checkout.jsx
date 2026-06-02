import { Box, Button, Container, Divider, Grid, TextField, Typography, MenuItem, InputLabel, Select, FormControl } from '@mui/material';
import React,{useState,useEffect} from 'react';
import { makeStyles } from '@mui/styles';
import { useDispatch,useSelector } from "react-redux";
import { clearCart, getCart } from '../redux/actions/usersActions';
import { addNewOrder } from '../redux/actions/ordersActions';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

const useStyles = makeStyles(theme=>({
  page:{
    paddingTop:'48px',
    paddingBottom:'80px',
  },
  card:{
    background:'#0e1829',
    border:'1px solid rgba(255,255,255,0.08)',
    borderRadius:'16px',
    padding:'32px',
    boxShadow:'none',
  },
  sectionLabel:{
    fontFamily:"'Space Grotesk', sans-serif",
    fontWeight:700,
    fontSize:'1rem',
    color:'#f0f4ff',
    display:'flex',
    alignItems:'center',
    gap:'10px',
    marginBottom:'24px',
  },
  summaryItem:{
    display:'flex',
    justifyContent:'space-between',
    alignItems:'center',
    padding:'10px 0',
    borderBottom:'1px solid rgba(255,255,255,0.05)',
  }
}));

const renderYears = ()=>{
  const years=[];
  const currentYear = new Date().getFullYear();
  years.push(currentYear);
  for(let i=1;i<7;i++){
    years.push(currentYear+i);
  }
  return years;
};


const Checkout = () => {
  const url = process.env.REACT_APP_API_URL;
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = useSelector(state => state.users.user);
  const cart = useSelector(state => state.users.cart);
  const totalPrice = useSelector(state => state.users.totalPrice);
  const [order, setOrder] = useState({});
  const years = renderYears();
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  useEffect(()=>{
    dispatch(getCart(user._id));
  },[]);

  const handleChange = (e)=>{
    setOrder({...order,[e.target.name]:e.target.value});
  };

  const handleSubmit = (e)=>{
    e.preventDefault();
    let fullOrder = {...order};
    fullOrder.orderDetails = [...cart];
    fullOrder.userId = user._id;
    fullOrder.totalPrice = totalPrice;
    fullOrder.cardExpireDate = String(`${order.month}/${order.year}`);
    dispatch(clearCart(user._id));
    dispatch(addNewOrder(fullOrder));
  };

  const fieldSx = {
    mb:2,
    '& .MuiInputBase-root':{background:'rgba(255,255,255,0.04)'},
  };

  return (
    <Container className={classes.page}>
      <Typography sx={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:'2rem',color:'#f0f4ff',letterSpacing:'-0.02em',mb:5}}>
        Checkout
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3} sx={{alignItems:'flex-start'}}>

          <Grid item xs={12} md={8}>
            <Grid container spacing={3}>

              <Grid item xs={12}>
                <Box className={classes.card}>
                  <div className={classes.sectionLabel}>
                    <HomeOutlinedIcon sx={{color:'#1a6aff',fontSize:'1.2rem'}} />
                    Billing Address
                  </div>
                  <TextField
                    name="name" fullWidth type="text"
                    onChange={handleChange}
                    value={user.firstName + " " + user.lastName}
                    required label="Full Name"
                    variant="outlined" sx={fieldSx}
                  />
                  <TextField
                    name="email" fullWidth type="email"
                    onChange={handleChange}
                    value={user.email}
                    required label="Email Address"
                    variant="outlined" sx={fieldSx}
                  />
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={8}>
                      <TextField
                        name="address" fullWidth type="text"
                        onChange={handleChange}
                        required label="Street Address"
                        variant="outlined" sx={fieldSx}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        name="state" fullWidth type="text"
                        onChange={handleChange}
                        required label="State / Region"
                        variant="outlined" sx={fieldSx}
                      />
                    </Grid>
                  </Grid>
                  <TextField
                    name="phone" fullWidth type="text"
                    onChange={handleChange}
                    required label="Phone Number"
                    variant="outlined" sx={{mb:0}}
                  />
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Box className={classes.card}>
                  <div className={classes.sectionLabel}>
                    <CreditCardOutlinedIcon sx={{color:'#1a6aff',fontSize:'1.2rem'}} />
                    Payment Details
                  </div>
                  <TextField
                    name="cardNumber" fullWidth type="number"
                    onChange={handleChange}
                    required label="Card Number"
                    variant="outlined" sx={fieldSx}
                  />
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        name="idNumber" fullWidth type="number"
                        onChange={handleChange}
                        required label="Card Holder ID"
                        variant="outlined" sx={fieldSx}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        name="securityNumber"
                        inputProps={{min:100,max:9999}}
                        fullWidth type="number"
                        onChange={handleChange}
                        required label="CVV"
                        variant="outlined" sx={fieldSx}
                      />
                    </Grid>
                  </Grid>
                  <Typography sx={{color:'rgba(240,244,255,0.4)',fontSize:'0.78rem',mb:2,fontFamily:"'Inter',sans-serif",textTransform:'uppercase',letterSpacing:'0.06em'}}>
                    Card Expiry Date
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <FormControl variant="outlined" fullWidth>
                        <InputLabel id="month">Month</InputLabel>
                        <Select
                          labelId="month" id="month"
                          value={order.month || ''}
                          label="Month"
                          onChange={handleChange}
                          name="month"
                          sx={{background:'rgba(255,255,255,0.04)'}}
                        >
                          {months.map((month,index)=>(
                            <MenuItem key={month} value={index+1}>{month}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl variant="outlined" fullWidth>
                        <InputLabel id="year">Year</InputLabel>
                        <Select
                          labelId="year" id="year"
                          value={order.year || ''}
                          label="Year"
                          onChange={handleChange}
                          name="year"
                          sx={{background:'rgba(255,255,255,0.04)'}}
                        >
                          {years.map(year=>(
                            <MenuItem key={year} value={year}>{year}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box className={classes.card} sx={{position:'sticky',top:'88px'}}>
              <Typography sx={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:'1.1rem',color:'#f0f4ff',mb:2.5}}>
                Order Summary
              </Typography>

              {cart && cart.map(item=>(
                <Box key={item._id} className={classes.summaryItem}>
                  <Box sx={{display:'flex',alignItems:'center',gap:1.5,flex:1,minWidth:0}}>
                    <img
                      src={`${url}/${item.image}`}
                      width="36px"
                      height="36px"
                      alt={item.title}
                      style={{borderRadius:'6px',objectFit:'cover',flexShrink:0,border:'1px solid rgba(255,255,255,0.08)'}}
                    />
                    <Typography sx={{
                      color:'rgba(240,244,255,0.7)',
                      fontSize:'0.82rem',
                      fontFamily:"'Inter',sans-serif",
                      overflow:'hidden',
                      textOverflow:'ellipsis',
                      whiteSpace:'nowrap',
                    }}>
                      {item.title} ×{item.amount}
                    </Typography>
                  </Box>
                  <Typography sx={{color:'#f0f4ff',fontWeight:600,fontSize:'0.85rem',fontFamily:"'Space Grotesk',sans-serif",flexShrink:0,ml:1}}>
                    $ {item.price * item.amount}
                  </Typography>
                </Box>
              ))}

              <Divider sx={{borderColor:'rgba(255,255,255,0.07)',my:2.5}}/>

              <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center',mb:3}}>
                <Typography sx={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:'1rem',color:'rgba(240,244,255,0.7)'}}>Total</Typography>
                <Typography sx={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:800,fontSize:'1.5rem',color:'#f0f4ff',letterSpacing:'-0.02em'}}>
                  $ {totalPrice}
                </Typography>
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{borderRadius:'12px',fontWeight:700,py:1.5,fontSize:'0.95rem'}}
              >
                Place Order
              </Button>
            </Box>
          </Grid>

        </Grid>
      </form>
    </Container>
  );
};

export default Checkout;
