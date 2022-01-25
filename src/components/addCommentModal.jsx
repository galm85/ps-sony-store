import * as React from 'react';
import { styled, Box } from '@mui/system';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import { makeStyles } from '@mui/styles';
import { Button, Typography,FormGroup, TextField } from '@mui/material';
import {useDispatch,useSelector} from 'react-redux';
import { getCommentsByArticleId, postNewComment } from '../redux/actions/commentsActions';


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
  minWidth: '50%',
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

export default function AddComment( {btn,articleId,postComment}) {
  
    const [open, setOpen] = React.useState(false);
    const [comment,setComment] = React.useState({});
    const user = useSelector(state=>state.users.user);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const classes = useStyles();
    const dispatch = useDispatch();

    const handleChange = (e)=>{
        setComment({...comment,[e.target.name]:e.target.value});
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();

        let data = {};
        data.title = comment.title;
        data.body = comment.comment;
        data.author = user.firstName+' '+user.lastName;
        data.authorId = user._id;
        data.articleId = articleId;
        dispatch(postNewComment(data));
        handleClose();

       
    }


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
          <Typography variant="h2">Add Comment</Typography>
          <form onSubmit={handleSubmit}>
              <FormGroup>
                  <TextField variant="standard" label="title" name='title' onChange={handleChange}/>
              </FormGroup>
              <FormGroup>
                  <TextField multiline  variant="standard" label="Comment" name='comment' onChange={handleChange}/>
              </FormGroup>
              <FormGroup>
                  <Button type="submit" variant='contained'>POST</Button>
              </FormGroup>
          </form>
        </Box>
      </StyledModal>
    </div>
  );
}
