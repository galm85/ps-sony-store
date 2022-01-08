import React from 'react';
import {Typography, typographyClasses} from '@mui/material';



const PageHeader = ({image,title,color}) => {
    return ( 
        <div style={{width:'100%',height:'40vh',position:'relative'}}>
            <img src={`../images/${image}`} alt={title+" banner"} align="center"  style={{width:'100%',height:'100%',objectFit:'cover'}}/>
            <Typography variant="h1" style={{position:'absolute',top:'50%',left:'50%',transform: 'translate(-50%, -50%)',color:color,fontSize:'10rem'}}>{title.toUpperCase()}</Typography>
        </div>
     );
}
 
export default PageHeader;