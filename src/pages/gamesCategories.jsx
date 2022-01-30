import React,{useEffect} from 'react';
import { Container, Typography,Grid,Divider } from '@mui/material';
import {useDispatch,useSelector} from 'react-redux';
import { getAllProducts } from '../redux/actions/productsAction';
import { getGamesCategories } from '../redux/actions/categoriesActions';

import BasicSelect from '../components/select';
import ProductCard from '../components/productCard';
import BestSales from '../components/bestSales';
import PageHeader from '../components/pageHeader';


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
            <PageHeader title="games" image="gamesBanner.png" color="white"/>

                <div style={{matginTop:'50px',height:'100px'}}></div>
           
            <Container style={{display:'flex'}} maxWidth="xl">

                <Grid container width='70%' style={{justifyContent:'space-between'}} >
                    {games && games.map(game=>(
                        <>
                        {(game.categorie !== 'Consoles' && game.categorie !== 'Accessories') &&
                       <ProductCard key={game._id} product={game}/>
                        }
                        </>
                    ))}
                </Grid>

                <Grid container width="30%" >
                    <BasicSelect  categories={categories} />
                </Grid>
                
            </Container>

            <Divider style={{margin:'30px 0'}} />
            <BestSales />
        </>
     );
}
 
export default GamesCategories;