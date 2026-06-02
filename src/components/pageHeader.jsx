import React from 'react';
import {Typography, Box} from '@mui/material';

const PageHeader = ({image, title, color}) => {
  return (
    <Box sx={{width:'100%',height:{xs:'30vh',md:'40vh'},position:'relative',overflow:'hidden',lineHeight:0}}>
      <img
        src={`./images/${image}`}
        alt={title + " banner"}
        style={{
          width:'100%',
          height:'100%',
          objectFit:'cover',
          display:'block',
          filter:'brightness(0.28) saturate(0.8)',
        }}
      />

      <Box sx={{
        position:'absolute',inset:0,
        background:'linear-gradient(135deg, rgba(0,20,80,0.55) 0%, rgba(0,0,0,0.1) 100%)',
        pointerEvents:'none',
      }}/>
      <Box sx={{
        position:'absolute',inset:0,
        background:'linear-gradient(to bottom, transparent 30%, #070d1a 100%)',
        pointerEvents:'none',
      }}/>

      <Box sx={{
        position:'absolute',
        top:'50%',
        left:'50%',
        transform:'translate(-50%, -50%)',
        textAlign:'center',
        width:'100%',
        px:3,
      }}>
        <Box sx={{
          width:36,
          height:3,
          background:'linear-gradient(90deg, #003fcf, #1a6aff)',
          borderRadius:2,
          mx:'auto',
          mb:2,
        }}/>
        <Typography
          variant="h1"
          sx={{
            color: color || '#ffffff',
            fontSize:{xs:'2.5rem',md:'4.5rem',lg:'5.5rem'},
            fontWeight:800,
            letterSpacing:'-0.03em',
            textShadow:'0 4px 40px rgba(0,0,0,0.9)',
            lineHeight:0.95,
            fontFamily:"'Space Grotesk', sans-serif",
          }}
        >
          {title.toUpperCase()}
        </Typography>
      </Box>
    </Box>
  );
};

export default PageHeader;
