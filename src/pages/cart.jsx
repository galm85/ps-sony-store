import { Container, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography,Box, Button,Divider } from '@mui/material';
import React,{useEffect} from 'react';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { useDispatch,useSelector } from 'react-redux';
import { getCart, removeItemFromCart } from '../redux/actions/usersActions';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles(theme=>({
    container:{
        display:"flex",
        justifyContent:'space-between',
        gap:'28px',
        paddingTop:'40px',
        paddingBottom:'70px',
        alignItems:'flex-start',
    },
    headRow:{
        background:'#f5f7fb',
    },
    headCell:{
        color:'#6b7a99',
        fontFamily:theme.fonts.heading || theme.fonts.main,
        fontSize:'0.72rem',
        fontWeight:700,
        textTransform:'uppercase',
        letterSpacing:'0.09em',
        borderBottom:'2px solid #e8edf5 !important',
        padding:'14px 16px',
    },
    bodyCell:{
        color:'#2c3e6a',
        padding:'16px',
        verticalAlign:'middle',
    },
    checkout:{
        padding:'32px',
        position:'sticky',
        top:'24px',
        background:'#ffffff',
        borderRadius:'20px',
        border:'1px solid #e8edf5',
        boxShadow:'0 4px 24px rgba(13,27,62,0.08)',
    },
    checkoutBtn:{
        color:'#003791',
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
    },[dispatch,user,navigate])

    const removeItem = (userId,itemId)=>{
       dispatch(removeItemFromCart(userId,itemId));
       window.location.reload();

    }

    return ( 
       <Container>
            <Typography variant="h1" style={{marginBottom:'8px',fontSize:'2rem'}}>My Cart</Typography>

            <Grid container  className={classes.container}>
                <Grid item sm={12} md={8}>
                    <TableContainer component={Paper} sx={{background:'#ffffff',border:'1px solid #e8edf5',borderRadius:3,boxShadow:'0 2px 12px rgba(13,27,62,0.06)'}}>
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
                                        <TableCell className={classes.bodyCell}><img src={item.image} width="50px" alt="product image" /></TableCell>
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
                        <Typography variant="h3" gutterBottom style={{fontSize:'1.35rem',fontWeight:700,marginBottom:'20px'}}>Order Summary</Typography>
                        <Divider/>
                        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',margin:'20px 0 8px'}}>
                            <Typography variant="body1" style={{color:'#6b7a99',fontSize:'0.95rem'}}>Subtotal</Typography>
                            <Typography variant="body1" style={{color:'#0d1b3e',fontWeight:600}}>$ {totalPrice}</Typography>
                        </div>
                        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'28px'}}>
                            <Typography variant="body1" style={{color:'#6b7a99',fontSize:'0.95rem'}}>Shipping</Typography>
                            <Typography variant="body1" style={{color:'#00a86b',fontWeight:600,fontSize:'0.9rem'}}>Free</Typography>
                        </div>
                        <Divider style={{marginBottom:'20px'}}/>
                        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'28px'}}>
                            <Typography variant="h4" style={{fontSize:'1.15rem',fontWeight:700}}>Total</Typography>
                            <Typography variant="h4" style={{fontSize:'1.5rem',fontWeight:800,color:'#003791'}}>$ {totalPrice}</Typography>
                        </div>
                        <Button onClick={()=>navigate('/checkout')} fullWidth variant='contained' sx={{borderRadius:'12px',fontWeight:700,padding:'15px',fontSize:'1rem',letterSpacing:'0.01em'}} >Proceed to Checkout</Button>
                    </Box>
                </Grid>
            </Grid>
            
       </Container>
     );
}
 
export default Cart;