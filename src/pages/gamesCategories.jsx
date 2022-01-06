import React,{useEffect,useState} from 'react';
import { Container, Typography,Grid } from '@mui/material';
import {useDispatch,useSelector} from 'react-redux';
import { getAllProducts } from '../redux/actions/productsAction';
import { getGamesCategories } from '../redux/actions/categoriesActions';
import {url} from '../config';
import BasicSelect from '../components/select';
import ProductCard from '../components/productCard';


const GamesCategories = () => {
    
    const dispatch = useDispatch();
    const games = useSelector(state => state.products.products);
    const categories = useSelector(state => state.categories.categories);

    useEffect(()=>{
        dispatch(getAllProducts());
        dispatch(getGamesCategories())
    },[])
    return ( 
        <>

            <Typography variant='h1'>Games</Typography>

            <Container style={{display:'flex'}} maxWidth="xl">

                <Grid container width='70%' style={{justifyContent:'space-between'}} >
                    {games && games.map(game=>(
                       <ProductCard key={game._id} product={game}/>
                    ))}
                </Grid>

                <Grid container width="30%" >
                    <BasicSelect  categories={categories} />
                </Grid>
                
            </Container>

        </>
     );
}
 
export default GamesCategories;