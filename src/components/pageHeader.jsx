import React from 'react';
import {Typography, typographyClasses} from '@mui/material';



const PageHeader = ({image,title,color}) => {
    return ( 
        <div style={{width:'100%',height:'40vh',position:'relative',overflow:'hidden'}}>
            <img src={`./images/${image}`} alt={title+" banner"} align="center"  style={{width:'100%',height:'100%',objectFit:'cover',filter:'brightness(0.45)'}}/>
            <div style={{position:'absolute',inset:0,background:'linear-gradient(to bottom, transparent 0%, rgba(14,17,23,0.65) 100%)'}}></div>
            <Typography variant="h1" style={{position:'absolute',top:'50%',left:'50%',transform: 'translate(-50%, -50%)',color:color || '#f0f0f0',fontSize:'5rem',fontWeight:800,letterSpacing:'-0.02em',textShadow:'0 4px 24px rgba(0,0,0,0.6)',whiteSpace:'nowrap'}}>{title.toUpperCase()}</Typography>
        </div>
     );
}
 
export default PageHeader;