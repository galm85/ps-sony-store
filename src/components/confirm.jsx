import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import {makeStyles} from '@mui/styles';
import { Typography } from '@mui/material';


const useStyles = makeStyles(theme=>({
  dialog:{
     minHeight:'200px',
     minWidth:'600px',
    position:'absolute',
    top:'-200px'
  },
    content:{
      color:theme.colors.main,
      textAlign:'center',
      "& h3":{
        marginBottom:'20px'
      }
    },
    
}))

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}
/**
 * 
 * @param {Object} objectConfirm {isOpen:Boolean, title:string ,subtitle:string, noBtn:String, yesBtn:String, onConfirm:()=>functionName()}
 * @param {function} setConfirmObject - setObjectConfirm function 
 * @returns  a confirm dialog
 */
export default function ConfirmMenu({confirmObject,setConfirmObject}) {

  const classes = useStyles();

  const handleClickOpen = () => {
    setConfirmObject({...confirmObject,isOpen:false});
    confirmObject.onConfirm();
  };

  const handleClose = () => {
    setConfirmObject({...confirmObject,isOpen:false});
  };

  return (
      <Dialog
        open={confirmObject.isOpen}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
        classes={{paper:classes.dialog}}
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title"></DialogTitle>
        
        <DialogContent className={classes.content}>
            <Typography variant="h3">{confirmObject.title}</Typography>
            <Typography variant='h5'>{confirmObject.subtitle ? confirmObject.subtitle : '' }</Typography>
        </DialogContent>
        
        <DialogActions className={classes.actions} style={{display:'flex',justifyContent:'space-around',padding:'20px'}}>
            <Button autoFocus onClick={handleClose} variant='outlined' color="error">{confirmObject.noBtn}</Button>
            <Button onClick={handleClickOpen} variant='contained'>{confirmObject.yesBtn}</Button>
        </DialogActions>
      
      </Dialog>
 
  );
}
