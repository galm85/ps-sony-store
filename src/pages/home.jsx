import React,{useEffect, useState} from 'react';
import { Typography,Container,Button,Grid,Box} from '@mui/material';
import {makeStyles} from '@mui/styles';
import {useDispatch,useSelector} from 'react-redux';
import { getBestSells,getComingSoon,getNewGames} from '../redux/actions/productsAction';
import ProductCard from '../components/productCard';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const useStyles = makeStyles(theme=>({
  section:{
    padding:'72px 0 56px',
  },
  sectionAlt:{
    padding:'72px 0 56px',
    background:'#090f1e',
  },
  sectionHeading:{
    display:'flex',
    alignItems:'center',
    gap:'14px',
    marginBottom:'40px',
  },
  accentBar:{
    width:'4px',
    height:'30px',
    background:'linear-gradient(to bottom, #003fcf, #1a6aff)',
    borderRadius:'3px',
    flexShrink:0,
  },
  gamesRow:{
    display:'flex',
    justifyContent:'flex-start',
    flexWrap:'wrap',
    margin:'-6px',
  },
  bannerWrap:{
    position:'relative',
    lineHeight:0,
    overflow:'hidden',
  },
  bannerImg:{
    width:'100%',
    display:'block',
    filter:'brightness(0.88)',
  },
  promoBannerWrap:{
    position:'relative',
    lineHeight:0,
    overflow:'hidden',
  },
}));

const SectionTitle = ({label}) => {
  const classes = useStyles();
  return (
    <div className={classes.sectionHeading}>
      <div className={classes.accentBar}/>
      <Typography variant="h3" sx={{margin:0,fontSize:{xs:'1.5rem',md:'2rem'}}}>
        {label}
      </Typography>
    </div>
  );
};

const Home = () => {
  const url = process.env.REACT_APP_API_URL;
  const classes = useStyles();
  const dispatch = useDispatch();
  const bestSells = useSelector(state => state.products.bestSells);
  const newGames = useSelector(state => state.products.newGames);
  const comingSoon = useSelector(state => state.products.comingSoon);
  const navigate = useNavigate();
  const [promoteProduct, setPromoteProduct] = useState(null);

  const getPromoteProduct = async ()=>{
    try {
      const res = await axios.get(`${url}/products/product-by-id/61e02241acceb5000477e7ac`);
      setPromoteProduct(res.data);
    } catch(e) {}
  };

  useEffect(()=>{
    dispatch(getBestSells());
    dispatch(getNewGames());
    dispatch(getComingSoon());
    getPromoteProduct();
  },[]);

  return (
    <div>

      <div className={classes.bannerWrap}>
        <img className={classes.bannerImg} src="./images/banner.png" alt="games banner" />
        <Box sx={{
          position:'absolute',
          inset:0,
          background:'linear-gradient(to bottom, transparent 55%, #070d1a 100%)',
          pointerEvents:'none',
        }}/>
      </div>

      <div className={classes.section}>
        <Container maxWidth="xl">
          <SectionTitle label="Best Sellers" />
          <Grid container className={classes.gamesRow}>
            {bestSells && bestSells.map(row=>(
              <ProductCard product={row} key={row._id} />
            ))}
          </Grid>
        </Container>
      </div>

      {promoteProduct &&
        <div className={classes.promoBannerWrap}>
          <img
            src="./images/unchartedBanner.png"
            width='100%'
            alt="Uncharted Collection"
            style={{display:'block',filter:'brightness(0.82)'}}
          />
          <Box sx={{
            position:'absolute',inset:0,
            background:'linear-gradient(to right, rgba(7,13,26,0.65) 0%, transparent 55%)',
            pointerEvents:'none',
          }}/>
          <Button
            variant="contained"
            sx={{
              position:'absolute',
              bottom:{xs:'10%',md:'14%'},
              left:{xs:'5%',md:'6%'},
              borderRadius:'50px',
              fontWeight:700,
              textTransform:'none',
              py:{xs:1.2,md:1.6},
              px:{xs:3,md:5},
              fontSize:{xs:'0.88rem',md:'1rem'},
              boxShadow:'0 4px 28px rgba(0,63,207,0.6)',
            }}
            onClick={()=>navigate(`/games/uncharted-collection`,{state:promoteProduct})}
          >
            Order Now
          </Button>
        </div>
      }

      <div className={classes.sectionAlt}>
        <Container maxWidth="xl">
          <SectionTitle label="New Games" />
          <Grid container className={classes.gamesRow}>
            {newGames && newGames.map(row=>(
              <ProductCard product={row} key={row._id} />
            ))}
          </Grid>
        </Container>
      </div>

      {promoteProduct &&
        <div style={{position:'relative',lineHeight:0}}>
          <img
            src="./images/ps5banner.png"
            width='100%'
            alt="PS5 banner"
            style={{display:'block',filter:'brightness(0.85)'}}
          />
          <Box sx={{
            position:'absolute',inset:0,
            background:'linear-gradient(to bottom, transparent 55%, #070d1a 100%)',
            pointerEvents:'none',
          }}/>
        </div>
      }

      <div className={classes.section}>
        <Container maxWidth="xl">
          <SectionTitle label="Pre Order" />
          <Grid container className={classes.gamesRow}>
            {comingSoon && comingSoon.map(row=>(
              <ProductCard product={row} key={row._id} />
            ))}
          </Grid>
        </Container>
      </div>

    </div>
  );
};

export default Home;
