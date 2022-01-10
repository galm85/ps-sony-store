import { Box, Button, Container,Divider,Grid, TextField, Typography } from '@mui/material';
import React,{useState,useEffect} from 'react';
import { makeStyles } from '@mui/styles';
import { useDispatch,useSelector } from "react-redux";
import {url} from '../config';
import { clearCart, getCart, getUserData } from '../redux/actions/usersActions';
import { addNewOrder } from '../redux/actions/ordersActions';


const useStyles = makeStyles(theme=>({
   container:{
       display:'flex',
       justifyContent:'space-between',
       marginTop:'60px'
   },
   formContainer:{
       display:"flex",
       justifyContent:"space-between"
   },
    totalBox:{
           borderLeft:'1px solid black',
           paddingLeft:'50px',
           minHeight:'500px',    
    },
    cartRow:{
        display:'flex',
       fontFamily:theme.fonts.main,
       fontWeight:theme.fontW.bold,
       fontSize:"1.2rem",
       justifyContent:'space-between',
       alignItems:'center'
    },
    totalRow:{
        fontFamily:theme.fonts.main,
        fontSize:'2rem',
        fontWeight:theme.fontW.normal
    }
   
}))



const Checkout = () => {

    const dispatch = useDispatch();
    const classes = useStyles();
    const user = useSelector(state => state.users.user);
    const cart = useSelector(state => state.users.cart);
    const totalPrice = useSelector(state => state.users.totalPrice);
    const [order,setOrder] = useState({});
    
    useEffect(()=>{
        dispatch(getCart(user._id))
    },[])

    const handleChange = (e)=>{
        setOrder({...order,[e.target.name]:e.target.value});
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log(order);
        let fullOrder = {...order};
        fullOrder.orderDetails = [...cart];
        dispatch(clearCart(user._id))
         dispatch(addNewOrder(fullOrder));
    }

    return ( 
       
        <Container>
            <Grid container className={classes.container}>

                <Grid item sm={12} md={8}>
                    <form onSubmit={handleSubmit}>
                        <Grid container className={classes.formContainer}>
                            <Grid Item sm={12} md={5}>
                                <Typography variant="h3">Billing Address</Typography>
                                <TextField id="standard-basic" name='name' fullWidth type='text' onChange={handleChange} required label="Full Name" variant="standard"  />
                                <TextField id="standard-basic" name='email' fullWidth  type='email' onChange={handleChange} required label="email" variant="standard"  />
                                <TextField id="standard-basic" name='address' fullWidth  type='text' onChange={handleChange} required label="Address" variant="standard" />
                                <TextField id="standard-basic" name='state' fullWidth  type='text' onChange={handleChange} required label="State" variant="standard" />
                                <TextField id="standard-basic" name='phone' fullWidth  type='text' onChange={handleChange} required label="Phone" variant="standard" />
                            </Grid>
                            <Grid Item sm={12} md={5}>
                                <Typography variant="h3">Payments</Typography>
                                <TextField id="standard-basic" name='cardNumber' fullWidth type='number' onChange={handleChange} required label="Card Number" variant="standard" />
                                <TextField id="standard-basic" name='idNumber' fullWidth type='number' onChange={handleChange} required label="Card Holder ID" variant="standard" />
                                <TextField id="standard-basic" name='securityNumber' fullWidth  type='number' onChange={handleChange} required label="CCV" variant="standard" />
                                <TextField id="standard-basic" name='year' fullWidth type='number' onChange={handleChange} required label="Expire Year" variant="standard" />
                                <TextField id="standard-basic" name='month' fullWidth  type='number' onChange={handleChange} required label="Expire Month" variant="standard" />
                            </Grid>
                            <Button type='submit' style={{width:'100%',marginTop:'50px'}} variant="contained">Place Order</Button>
                        </Grid> 
                    </form>
                </Grid>

                <Grid item sm={12} md={3}>
                    <Box className={classes.totalBox}>
                            <Typography variant="h3" gutterBottom>Total Order</Typography>
                            <Divider style={{margin:'20px 0'}}/>
                            {cart && cart.map(item=>(
                                <div className={classes.cartRow} key={item._id} >
                                    <img src={`${url}/${item.image}`} width="40px" alt="product image"/>
                                    <p> $ {item.price} X {item.amount} = {item.price * item.amount}</p>
                                </div>
                            ))}
                             <Divider style={{margin:'20px 0'}}/>
                            <h4 className={classes.totalRow}>Total: $ {totalPrice}</h4>
                    </Box> 
                </Grid>
            </Grid>
        </Container>
     );
}
 
export default Checkout;