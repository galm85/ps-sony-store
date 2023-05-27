import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Loader({size=100}) {
  return (
    <Box sx={{ display: 'flex',width:"100%",position:"fixed",zIndex:200,top:"40%",left:"50%" }}>
      <CircularProgress size={size} />
    </Box>
  );
}
