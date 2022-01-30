import { Container, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography,Box, Button,Divider } from '@mui/material';
import React,{useEffect} from 'react';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { useDispatch,useSelector } from 'react-redux';
import { getCart, removeItemFromCart } from '../redux/actions/usersActions';
import {url} from '../config';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/loader';

const useStyles = makeStyles(theme=>({
    container:{
        display:"flex",
        justifyContent:'space-between'
    },
    headRow:{
        background:'black',
    
    },
    headCell:{
        color:"white",
        fontFamily:theme.fonts.main,
        fontSize:'2rem'
    },
    bodyCell:{},
    checkout:{
        minHeight:"400px",
        padding:'20px',
        position:'relative',
        background:'rgba(0,0,0,0.1)',
        borderRadius:'15px',
        boxShadow:'2px 2px 2px rgba(0,0,0,0.4)'
    },
    checkoutBtn:{
        color:"yellow"
    }
}))

const Cart = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const user = useSelector(state => state.users.user);
    const cart = useSelector(state => state.users.cart);
    const totalPrice = useSelector(state=> state.users.totalPrice);
    const navigate = useNavigate();

    useEffect(()=>{
        if(user){
            dispatch(getCart(user._id));
        }else{
            navigate('/signin')
        }
    },[totalPrice])

    const removeItem = (userId,itemId)=>{
       dispatch(removeItemFromCart(userId,itemId));
       window.location.reload();

    }

    return ( 
       <Container>
            <Typography variant="h1">My Cart</Typography>

            <Grid container  className={classes.container}>
                <Grid item sm={12} md={8}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow className={classes.headRow}>
                                    <TableCell variant='headCell' className={classes.headCell}>#</TableCell>
                                    <TableCell variant='headCell' className={classes.headCell}>Image</TableCell>
                                    <TableCell variant='headCell' className={classes.headCell}>Title</TableCell>
                                    <TableCell variant='headCell' className={classes.headCell}>Price</TableCell>
                                    <TableCell variant='headCell' className={classes.headCell}>Amount</TableCell>
                                    <TableCell variant='headCell' className={classes.headCell}>Total</TableCell>
                                    <TableCell variant='headCell' className={classes.headCell}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cart && cart.map((item,index)=>(
                                    <TableRow key={item._id}>
                                        <TableCell className={classes.bodyCell}>{index+1}</TableCell>
                                        <TableCell className={classes.bodyCell}><img src={`${url}/${item.image}`} width="50px" alt="product image" /></TableCell>
                                        <TableCell className={classes.bodyCell}>{item.title}</TableCell>
                                        <TableCell className={classes.bodyCell}>$ {item.price}</TableCell>
                                        <TableCell className={classes.bodyCell}>{item.amount}</TableCell>
                                        <TableCell className={classes.bodyCell}>$ {item.amount * item.price}</TableCell>
                                        <TableCell className={classes.bodyCell}><IconButton onClick={()=>removeItem(user._id,item._id)}><RemoveCircleIcon style={{color:'red'}}/></IconButton></TableCell>
                                    </TableRow>
                                ))}
                                
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>

                <Grid item sm={12} md={3}>
                    <Box  className={classes.checkout}>
                        <Typography variant="h3" gutterBottom>Total</Typography>
                        <Divider gutterBottom/>
                        <Typography variant="h3" style={{marginTop:'20px'}}>$ {totalPrice}</Typography>
                        <Button onClick={()=>navigate('/checkout')}  variant='contained' style={{background:"rgba(255, 200, 3, 0.966)",color:"black",position:'absolute',bottom:'20px',width:'85%'}} >Checkout</Button>
                    </Box>
                </Grid>
            </Grid>
            
       </Container>
     );
}
 
export default Cart;