import * as React from 'react';
import { styled, Box } from '@mui/system';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import { makeStyles } from '@mui/styles';
import { Button } from '@mui/material';

const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled('div')`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  minWidth: '400px',
  maxWidth: '70%',
  minHeight:'400px',
  maxHeight:'70vh',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  p: 2,
  px: 4,
  pb: 3,
  overflow:'scroll'
  
};


const useStyles = makeStyles(theme=>({
    title:{
        textAlign:'center',
        fontFamily:theme.fonts.main,
        color:theme.colors.main,
        fontSize:'2rem'
    },
    text:{
        fontFamily:theme.fonts.main,
        color:theme.colors.main,
        fontWeight:theme.fontW.thin,
        fontSize:'1.2rem',
        overflow:'scroll',
        padding:'40px'

    }
}))

export default function MyModal( {btn,title,text}) {
  
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const classes = useStyles();
  
  return (
    <div>
      <Button type="button" variant='contained' onClick={handleOpen}>
        {btn}
      </Button>
      <StyledModal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        BackdropComponent={Backdrop}
      >
        <Box sx={style}>
          <h2 className={classes.title} id="unstyled-modal-title">{title}</h2>
          <p className={classes.text} id="unstyled-modal-description">{text}</p>
        </Box>
      </StyledModal>
    </div>
  );
}
