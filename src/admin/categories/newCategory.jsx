import { Container, Grid, TextField, Typography,FormControl,InputLabel,Select,MenuItem, Divider, Button, Input } from '@mui/material';
import React,{useState} from 'react';
import { makeStyles } from '@mui/styles';
import { useDispatch,useSelector } from 'react-redux';
import { addNewCategory } from '../../redux/actions/categoriesActions';



const useStyles = makeStyles(theme=>({
    container:{
        marginTop:'20px',
    },
    rowContainer:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        marginBottom:'50px'
    }
}))


const NewCategory = () => {

    const classes = useStyles();
    const dispatch = useDispatch();

    const [category,setCategory] = useState({});
    const [image,setImage] = useState(null);

    const handleChange = (e)=>{
        setCategory({...category,[e.target.name]:e.target.value});
    }

    const handleImage = (e)=>{
        let file = e.target.files[0];
        setCategory({...category,image:file});
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e)=>{
            setImage(e.target.result);
        }
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        const data = new FormData();
        data.append('title',category.title);
        data.append('image',category.image);
        data.append('parentCategorieTitle',category.parent);
        dispatch(addNewCategory(data));
    }

    

    

    return ( 
        <Container className={classes.container}>
            <Typography variant="h1" align='center' style={{marginBottom:'100px'}}>Add New Category</Typography>
            
           
                <form onSubmit={handleSubmit}>
                    <Grid container className={classes.rowContainer} >
                        <Grid item sm={12} md={7}  >
                            <TextField fullWidth id="standard-basic" label="Title" variant="standard" name="title" onChange={handleChange} />
                        </Grid> 
                        
                        <Grid item sm={12} md={7} style={{margin:'50px 0'}}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Parent Category</InputLabel>
                                <Select labelId="demo-simple-select-label" id="demo-simple-select" variant='standard' value={category.parent} name="parent" label="Platform" onChange={handleChange}>
                                    <MenuItem value='Games'>Games</MenuItem>
                                    <MenuItem value='Hardware'>Hardware</MenuItem>  
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    

                    <Grid container className={classes.rowContainer}>
                        <Grid item sm={12} md={6} style={{textAlign:'center'}}>
                            <label htmlFor="contained-button-file">
                                <Input accept="image/*" id="contained-button-file" multiple type="file" style={{display:'none'}} onChange={handleImage}/>
                                <Button variant="contained" component="span"> Upload</Button>
                            </label>
                            {image && 
                            <div style={{width:'100%'}}>
                                <img src={image} style={{width:'40%',marginTop:'10px'}} alt="product image" />
                            </div>
                            }
                        </Grid>
                    </Grid>
                    
                    <Divider />
                    <div style={{textAlign:'center',margin:'50px 0'}}>
                        <Button type="submit" variant='contained'>Save</Button>
                    </div>

                </form>
          


        </Container>
     );
}
 
export default NewCategory;