import React,{useEffect} from 'react'
import { Typography,Container,Button,Grid, Divider} from '@mui/material';
import {makeStyles} from '@mui/styles';
import {useDispatch,useSelector} from 'react-redux';
import { getBestSells,getComingSoon,getNewGames} from '../redux/actions/productsAction';
import GameCard from '../components/gameCard';
import ProductCard from '../components/productCard'
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

    useEffect(()=>{
        dispatch(getBestSells());
        dispatch(getNewGames());
        dispatch(getComingSoon());
    },[])

    return ( 
        <>
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
            
            <Divider/>
            
            <Container className={classes.container}>
                <Typography variant='h3' align='center'>New Games</Typography>
                <Grid container className={classes.gamesRow}>
                {newGames && newGames.map(row=>(
                   <ProductCard product={row} key={row._id}/>
                ))}
                </Grid>   
            </Container>
            
            <Divider/>
            
            <Container  className={classes.container}>
                <Typography variant='h3' align='center'>Pre Order</Typography>
                <Grid container className={classes.gamesRow}>
                {comingSoon && comingSoon.map(row=>(
                    <ProductCard product={row} key={row._id}/>
                ))}
                </Grid>   
            </Container>
        </>
     );
}
 
export default Home;