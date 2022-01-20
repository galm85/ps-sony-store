import * as React from 'react';
import { Container,Divider,Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useSelector,useDispatch } from 'react-redux';
import {url} from '../config';
import ProfileTab from '../components/profileTab';
import { getOrdersByUser } from '../redux/actions/ordersActions';

const useStyles = makeStyles(theme=>({
    imageContainer:{
        width:'100%',
        textAlign:'center'
    },
    image:{
        width:'50%',
        objectFit:'cover',
        borderRadius:'50%',
        
    }
}));

export default function Profile(){

    const classes = useStyles();
    const dispatch = useDispatch();

    const user = useSelector(state=>state.users.user);
    const orders = useSelector(state=>state.orders.orders);

    React.useEffect(()=>{
        dispatch(getOrdersByUser(user._id));
    },[])


    return(
       
        <Container style={{marginTop:'50px'}}>
            <Grid container>
                <Grid item sm={12} md={4}>
                    <div className={classes.imageContainer}>
                        <img className={classes.image} src={url+"/"+user.image} alt="user image" />
                    </div>
                </Grid>
              
                <Grid item sm={12} md={8}>
                    <div className={classes.dataContainer}>
                        <Typography variant="h2">{user.firstName +" "+ user.lastName}</Typography>
                        <Typography variant="h4">{user.email}</Typography>
                    </div>
                    <Divider style={{margin:'20px 0'}}/>
                    <div className={classes.tab}>
                        <ProfileTab orders={orders}/>
                    </div>
                </Grid>

            </Grid>
        </Container>
    )

}
