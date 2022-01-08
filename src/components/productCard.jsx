import { Divider, Grid, Typography } from '@mui/material';
import React from 'react'
import {url} from '../config';
import {makeStyles} from '@mui/styles';
import {useNavigate} from 'react-router';

const useStyles = makeStyles(theme=>({
    item:{
        position:'relative',
        margin:'10px 10px',
        transition:'all ease 0.2s',
        borderRadius:'10px',
        cursor:'pointer',
        "&:hover $image":{
            boxShadow:'5px 5px 5px rgba(0,0,0,0.2)',
            transform:'scale(1.03)'
        },
        "&:hover $data":{
            display:'block',
            opacity:'1',
            bottom:'50%',
            transition:'translateY(-50%)',
            padding:'20px 5px'
        }
    },
    data:{
        opacity:'0',
        position:'absolute',
        transition:'all ease 0.2s',
        bottom:'0',
        textAlign:'center',
        width:'100%',
        background:'rgba(0,0,0,0.5)',
        color:'white'   
    },
    image:{
        width:'100%',
        height:'100%',
        objectFit:'cover',
        borderRadius:'10px',
        transition:'all ease 0.2s',

    }
}))



const ProductCard = ({product}) => {

    const classes = useStyles();
    const navigate = useNavigate();
    return ( 
        <Grid item  sm={10} md={3} lg={2} className={classes.item} style={{margin:'20px 20px'}} onClick={()=>navigate(`/games/${product.title.toLowerCase()}`,{state:product})}>
           
            <img className={classes.image} src={`${url}/${product.image}`}  alt={product.title} />
            

            <div className={classes.data}>
                <Typography variant="productTitle">{product.title}</Typography>
                <Divider/>
                <Typography variant="productTitle">price: {product.price}</Typography>

            </div>

        </Grid>
     );
}
 
export default ProductCard;