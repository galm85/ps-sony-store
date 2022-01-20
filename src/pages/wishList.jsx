import { Container, Divider, Grid, Typography } from '@mui/material';
import * as React from 'react';
import {useDispatch,useSelector} from 'react-redux';
import { getWishList } from '../redux/actions/usersActions';
import { makeStyles } from '@mui/styles';
import ProductCard from '../components/productCard';

const useStyles = makeStyles(theme=>({
    row:{
        display:'flex',
        alignItems:'center'
    },
    
}))

const WishList = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const user = useSelector(state=>state.users.user);
    const wishList = useSelector(state=>state.users.wishList);

    React.useEffect(()=>{
        if(!user){
            window.location ='/signin';
        }
        dispatch(getWishList(user._id));
    },[])

    return ( 
        
        <Container>
            <Typography align="center" variant="h1">{user.firstName}'s Wish List</Typography>
            <Divider style={{margin:'20px 0'}}/>
            <Grid container style={{display:"flex",justifyContent:'center'}}>
                {wishList && wishList.map((item,index)=>(
                    <ProductCard product={item} key={index} className={classes.card} fromWishList={true}/>
                ))}
                
            </Grid>
        </Container>

     );
}
 
export default WishList;