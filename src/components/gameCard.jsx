import React from 'react';
import {Grid} from '@mui/material';
let url = "https://gal-sony-store.herokuapp.com";


const GameCard = ({game}) => {
    return ( 
        <Grid item  sm={12} md={4} lg={2} >
            <h3>{game.title}</h3>
            <img src={`${url}/${game.image}`} width="100%" alt="" />
        </Grid>
     );
}
 
export default GameCard;