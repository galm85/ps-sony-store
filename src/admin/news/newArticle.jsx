import * as React from 'react';
import { Container, Grid, Typography,TextField,Button,IconButton,Input, Divider, FormControl, FormGroup,MenuItem,InputLabel,Select } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { makeStyles } from '@mui/styles';
import TextEditor from '../../components/textEditor';
import {useDispatch,useSelector} from 'react-redux';
import { postNewArticle } from '../../redux/actions/articlesActions';
import ConfirmMenu from '../../components/confirm';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles(theme=>({
    container:{ display:'flex',justifyContent:'center'},
    formGroup:{margin:'30px 0',width:'40%',justifyContent:'center',margin:'auto'},
    imageContainer:{display:'flex',alignItems:'center',margin:'50px 0'},
    articleField:{margin:'30px 0'}
}))


export default function NewArticle(){
    
    const dispatch = useDispatch();
    const classes = useStyles();
    const [article,setArticle] = React.useState({status:'draft'});
    const [image,setImage] = React.useState(null);
    const user = useSelector(state=>state.users.user);
    const navigate = useNavigate();
    const [confirmObject,setConfirmObject] = React.useState({isOpen:false});

    const handleChange =(e)=>{
        setArticle({...article,[e.target.name]:e.target.value});
    }
    
    const handleImage =(e)=>{
        let file = e.target.files[0];
        setArticle({...article,image:file});

        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e)=>{
            setImage(e.target.result);
        }
    }

    const handleSubmit =()=>{
        const data = new FormData();
        data.append('title',article.title);
        data.append('image',article.image);
        data.append('status',article.status);
        data.append('author',user.firstName + ' ' + user.lastName);
        data.append('article',article.article);
        data.append('likes',0);
        data.append('comments',[]);

       dispatch(postNewArticle(data))
    }

    const handleEditor = (value)=>{
        setArticle({...article,article:value});
    }
    
    return(
        <Container>
            <Typography align='center' gutterBottom variant="h1">Add New Article</Typography>

            <Grid container className={classes.container}>
                <Grid item sm={11} >
                    <form onSubmit={handleSubmit}>
                        <FormGroup className={classes.formGroup} >
                                <TextField id="standard-basic" label="Title" variant="standard" name="title" onChange={handleChange} />
                        </FormGroup>

                        <FormGroup className={classes.imageContainer}>
                            <label htmlFor="icon-button-file">
                                <Input accept="image/*" id="icon-button-file" type="file" name="image" style={{display:'none'}} onChange={handleImage}/>
                                <IconButton color="primary" aria-label="upload picture" component="span">
                                    <PhotoCamera />
                                </IconButton>
                            </label>
                            {image && <img src={image}  width="40%" alt="article image"/>}
                        </FormGroup>
                    
                        

                        <FormGroup  className={classes.formGroup} >
                                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={article.status}
                                    label="Status"
                                    onChange={handleChange}
                                    name="status"
                                >
                                    <MenuItem value='draft'>Draft</MenuItem>
                                    <MenuItem value='post'>Post</MenuItem>
                                </Select>
                        </FormGroup>
                        
                        <FormGroup style={{margin:'50px 0'}}>


                        <TextEditor fn={handleEditor}/>
                        
                        </FormGroup>
                        <div style={{display:'flex',justifyContent:'space-around',margin:'50px 0'}}>
                            <Button type="button" variant="outlined" color="error" onClick={()=>setConfirmObject({isOpen:true,title:'Go Back?',subtitle:'Changes will NOT save',yesBtn:'continue without save',noBtn:'continue edit',onConfirm:()=>navigate('/admin-panel/news')})}>Cancel</Button>

                            {article.status === 'draft' ? 
                            <Button type="button" onClick={()=>setConfirmObject({isOpen:true,title:'Save Draft?',subtitle:'The article will save to drafts',yesBtn:'save draft',noBtn:'continue edit',onConfirm:handleSubmit})} color='success' variant="contained" >SAVE Draft</Button> 
                            : 
                            <Button type="button" variant="contained" onClick={()=>setConfirmObject({isOpen:true,title:'Save & Post?',subtitle:'The article will Post immediately',yesBtn:'Post',noBtn:'continue edit',onConfirm:handleSubmit})}>Post</Button>
                            }

                            
                        </div>

                    </form>
                </Grid>
            </Grid>
            <ConfirmMenu confirmObject={confirmObject} setConfirmObject={setConfirmObject}/>

        </Container>
    )
}