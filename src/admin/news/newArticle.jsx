import * as React from 'react';
import { Container, Grid, Typography,TextField,Button,IconButton,Input, Divider, FormControl, FormGroup,MenuItem,InputLabel,Select } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles(theme=>({
    container:{ display:'flex',justifyContent:'center'},
    formGroup:{margin:'30px 0',width:'40%',justifyContent:'center',margin:'auto'},
    imageContainer:{display:'flex',alignItems:'center',margin:'50px 0'},
    articleField:{margin:'30px 0'}
}))


export default function NewArticle(){
    
    const classes = useStyles();
    const [article,setArticle] = React.useState({status:'draft'});
    const [image,setImage] = React.useState(null);

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

    const handleSubmit =(e)=>{
        e.preventDefault();
        console.log(article);
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
                    
                        <FormGroup className={classes.articleField}>
                            <TextField label="Article" multiline  minRows={10} name="article" onChange={handleChange}/>
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
                        
                        
                        <div style={{textAlign:'center',margin:'50px 0'}}>
                            {article.status === 'draft' ? <Button type="submit" color='success' variant="contained" >SAVE Draft</Button> : <Button type="submit" variant="contained" >Post</Button>}
                            
                        </div>

                    </form>
                </Grid>
            </Grid>

        </Container>
    )
}