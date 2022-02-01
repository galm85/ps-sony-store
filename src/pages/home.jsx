import React,{useEffect, useState} from 'react'
import { Typography,Container,Button,Grid, Divider} from '@mui/material';
import {makeStyles} from '@mui/styles';
import {useDispatch,useSelector} from 'react-redux';
import { getBestSells,getComingSoon,getNewGames} from '../redux/actions/productsAction';
import ProductCard from '../components/productCard';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {url} from '../config';

const useStyles = makeStyles(theme=>({
    
    
    container:{
        textAlign:'center',
        margin:"50px auto",
       
        
    },
    bannerBtn:{
        background:theme.colors.cyan,
        '&:hover':{
            background:theme.colors.primary
        }
    },
    gamesRow:{
        display:'flex',
        justifyContent:'space-around'
    },
    banner:{
        width:"100%",
    },
    bannerImage:{
        width:'100%'
    }
    

}))

const Home = () => {
    
    const classes = useStyles();
    const dispatch = useDispatch();
    const bestSells = useSelector(state => state.products.bestSells);
    const newGames = useSelector(state => state.products.newGames);
    const comingSoon = useSelector(state => state.products.comingSoon);
    const navigate = useNavigate();
    const [promoteProduct,setPromoteProduct] = useState(null);
    

    const getPromotePeoduct = async ()=>{
        const res = await axios.get(`${url}/products/product-by-id/61e02241acceb5000477e7ac`);
        setPromoteProduct(res.data);
    }

    useEffect(()=>{
        dispatch(getBestSells());
        dispatch(getNewGames());
        dispatch(getComingSoon());
        getPromotePeoduct();
       
    },[])


    

    return ( 
        <div className={classes.page}>

            
          
            <div className={classes.banner}>
                <img className={classes.bannerImage} src="./images/banner.png"  alt="games banner" />
            </div>

            
            <Container  className={classes.container} >
                <Typography variant='h3' align='center'  >Best Selles</Typography>
                <Grid container className={classes.gamesRow}>
                {bestSells && bestSells.map(row=>(
                    <ProductCard product={row} key={row._id}/>
                ))}
                </Grid>   
            </Container>
            
            {promoteProduct &&
                <div style={{position:'relative'}}>
                    <img src="/images/unchartedBanner.png" width='100%' alt="" />
                    <Button variant="contained" style={{position:'absolute',top:'70%',right:'10%'}} onClick={()=>navigate(`/games/uncharted-collection`,{state:promoteProduct})}>Order Now</Button>
                </div>
                }
            
            <Container className={classes.container}>
                
                


                <Typography variant='h3' align='center'>New Games</Typography>
                <Grid container className={classes.gamesRow}>
                {newGames && newGames.map(row=>(
                   <ProductCard product={row} key={row._id}/>
                ))}
                </Grid>   
            </Container>
            
            {promoteProduct &&
                <div style={{position:'relative'}}>
                    <img src="/images/ps5banner.png" width='100%' alt="ps5 banner" />
                    
                </div>
                }
            
            <Container  className={classes.container}>
                <Typography variant='h3' align='center'>Pre Order</Typography>
                <Grid container className={classes.gamesRow}>
                {comingSoon && comingSoon.map(row=>(
                    <ProductCard product={row} key={row._id}/>
                ))}
                </Grid>   
            </Container>

            
            
        </div>
     );
}
 
export default Home;