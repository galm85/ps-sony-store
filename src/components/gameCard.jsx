import React from 'react';
import {Grid} from '@mui/material';
import Loader from './loader';

const GameCard = ({game}) => {
    return ( 

        // <Loader/>

        <Grid item  sm={12} md={4} lg={2} >
            <h3>{game.title}</h3>
            <img src={game.image} width="100%" alt="" />
        </Grid>
     );
}
 
export default GameCard;