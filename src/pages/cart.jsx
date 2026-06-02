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
        gap:'24px',
        paddingTop:'40px',
        paddingBottom:'40px',
    },
    headRow:{
        background:'rgba(0,103,221,0.1)',
    },
    headCell:{
        color:'#c0cce8',
        fontFamily:theme.fonts.main,
        fontSize:'0.8rem',
        fontWeight:700,
        textTransform:'uppercase',
        letterSpacing:'0.07em',
    },
    bodyCell:{
        color:'#c0cce8',
    },
    checkout:{
        minHeight:"400px",
        padding:'28px',
        position:'relative',
        background:'#1a1f2e',
        borderRadius:'16px',
        border:'1px solid rgba(255,255,255,0.06)',
        boxShadow:'0 8px 32px rgba(0,0,0,0.4)',
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
    },[dispatch,user,navigate])

    const removeItem = (userId,itemId)=>{
       dispatch(removeItemFromCart(userId,itemId));
       window.location.reload();

    }

    return ( 
       <Container>
            <Typography variant="h1">My Cart</Typography>

            <Grid container  className={classes.container}>
                <Grid item sm={12} md={8}>
                    <TableContainer component={Paper} sx={{background:'#1a1f2e',border:'1px solid rgba(255,255,255,0.06)',borderRadius:2}}>
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
                        <Typography variant="h3" gutterBottom>Total</Typography>
                        <Divider gutterBottom/>
                        <Typography variant="h3" style={{marginTop:'20px'}}>$ {totalPrice}</Typography>
                        <Button onClick={()=>navigate('/checkout')}  variant='contained' style={{background:'linear-gradient(135deg, #f59e0b, #fbbf24)',color:'black',fontWeight:700,borderRadius:'12px',textTransform:'none',position:'absolute',bottom:'20px',width:'85%'}} >Checkout</Button>
                    </Box>
                </Grid>
            </Grid>
            
       </Container>
     );
}
 
export default Cart;