import * as React from 'react'
import { Container,Divider,Grid, Typography,FormControl,InputLabel,Select,MenuItem, Button } from '@mui/material';
import {useLocation,useNavigate} from 'react-router-dom';
import {url} from '../../config';
import { makeStyles } from '@mui/styles';
import {useDispatch} from 'react-redux';
import { updateOrderStatus } from '../../redux/actions/ordersActions';

const useStyles = makeStyles(theme=>({

    orderRow:{
        display:'flex',
        alignItems:'center',
        justifyContent:'space-between',
        margin:'20px 0',
       
        
    },
    orderRowData:{
        paddingLeft:'50px',
        fontFamily:theme.fonts.main,
        fontWeight:theme.fontW.bold,
        fontSize:'1.2rem'
    },
    orderRowDataTotal:{
        paddingLeft:'50px',
        fontFamily:theme.fonts.main,
        fontWeight:theme.fontW.black,
        fontSize:'1.5rem'
    },
    totalBox:{
        display:'flex',
        justifyContent:'right'
    },
    totalPrice:{
        fontFamily:theme.fonts.main,
        fontSize:'2rem',
       marginTop:'20px'
        
    },
    row:{
        margin:'5px 0'
    }
}))

const SingleOrder = () => {

    const location = useLocation();
    const [order,setOrder] = React.useState({...location.state});
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const calculateTotal = ()=>{
        let total = 0;
        order.orderDetails.forEach(element => {
            let rowSum = element.price * element.amount;
            total += rowSum;
        })
        return total;
    }

    const handleChange = (e)=>{
        setOrder({...order,status:e.target.value})
    }

    return ( 
        <Container>
            <Grid container style={{display:'flex',justifyContent:'space-between',marginTop:'30px'}}>
                <Grid item sm={12} md={4}>
                    <Typography variant="h3">User Details</Typography>
                    <Grid container className={classes.row}>
                        <Grid item sm={6}><Typography  variant="rowBlack">Order ID</Typography></Grid>
                        <Grid item sm={6}><Typography  variant="rowBold">{order._id}</Typography></Grid>
                    </Grid>
                    <Grid container className={classes.row}>
                        <Grid item sm={6}><Typography  variant="rowBlack">Name</Typography></Grid>
                        <Grid item sm={6}><Typography variant="rowBold">{order.name}</Typography></Grid>
                    </Grid>
                    <Grid container className={classes.row}>
                        <Grid item sm={6}><Typography variant="rowBlack">Phone</Typography></Grid>
                        <Grid item sm={6}><Typography variant="rowBold">{order.phone.slice(0,3)}-{order.phone.slice(3)}</Typography></Grid>
                    </Grid>
                    <Grid container className={classes.row}>
                        <Grid item sm={6}><Typography variant="rowBlack">Email</Typography></Grid>
                        <Grid item sm={6}><Typography variant="rowBold">{order.email}</Typography></Grid>
                    </Grid>
                    <Grid container className={classes.row}>
                        <Grid item sm={6}><Typography variant="rowBlack">Address</Typography></Grid>
                        <Grid item sm={6}><Typography variant="rowBold">{order.address}, {order.state}</Typography></Grid>
                    </Grid>
                    <Divider style={{margin:'20px 0'}}/>
                    <Typography variant="h3">Payment Details</Typography>
                    <Grid container className={classes.row}>
                        <Grid item sm={6}><Typography variant="rowBlack">User ID Number</Typography></Grid>
                        <Grid item sm={6}><Typography variant="rowBold">{order.idNumber}</Typography></Grid>
                    </Grid>
                    <Grid container className={classes.row}>
                        <Grid item sm={6}><Typography variant="rowBlack">Card Number</Typography></Grid>
                        <Grid item sm={6}><Typography variant="rowBold">{order.cardNumber}</Typography></Grid>
                    </Grid>
                    <Grid container className={classes.row}>
                        <Grid item sm={6}><Typography variant="rowBlack">CCV Number</Typography></Grid>
                        <Grid item sm={6}><Typography variant="rowBold">{order.securityNumber}</Typography></Grid>
                    </Grid>
                
                    <Divider style={{margin:'50px 0'}}/>

                    <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Order Status</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={order.status}
                        label="Order Status"
                        onChange={handleChange}
                    >
                        <MenuItem value={'New Order'}>New Order</MenuItem>
                        <MenuItem value={'Canceled'}>Canceled</MenuItem>
                        <MenuItem value={'In Progress'}>In Progress</MenuItem>
                        <MenuItem value={'Sent'}>Sent</MenuItem>
                    </Select>
                    <Button variant='contained' style={{marginTop:'20px'}} onClick={()=>dispatch(updateOrderStatus(order._id,order.status))}>Update</Button>
                </FormControl>
                </Grid>


               

               

                <Grid item sm={12} md={7}>
                    <Typography variant="h3">Order Details</Typography>
                    {order.orderDetails && order.orderDetails.map((row,index)=>(
                        <div key={index} className={classes.orderRow}>
                            <div style={{display:'flex',alignItems:'center'}}>
                                <img src={`${url}/${row.image}`} alt="product image" width="80px" />
                                <p className={classes.orderRowData}>{row.title} $ {row.price} X {row.amount} </p>
                            </div>
                            <p className={classes.orderRowDataTotal}>$ {row.price*row.amount}</p>
                           
                        </div>
                    ))}
                    <Divider/>
                    <div className={classes.totalBox}>
                        <h6 className={classes.totalPrice}>Total: ${calculateTotal()}</h6>
                        
                    </div>
                </Grid>
                
            </Grid>
                
                <div style={{marginTop:'100px',textAlign:'center'}}>
                <Button size="large" onClick={()=>navigate('/admin-panel/orders')} color='error' variant='outlined'>Return</Button>

                </div>
        </Container>
     );

}
 
export default SingleOrder;