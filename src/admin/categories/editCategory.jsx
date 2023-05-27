import { Container, Grid, TextField, Typography,FormControl,InputLabel,Select,MenuItem, Divider, Button, Input } from '@mui/material';
import React,{useState} from 'react';
import { makeStyles } from '@mui/styles';
import { useDispatch } from 'react-redux';
import { updateCategory } from '../../redux/actions/categoriesActions';
import {useNavigate, useLocation} from 'react-router-dom';
import {url} from '../../config';
import Loader from '../../components/loader';

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


const EditCategory = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const [category,setCategory] = useState({...location.state});
    const [image,setImage] = useState(url+"/"+location.state.image);
    const [loading,setLoading] = useState(false);


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

    const handleSubmit = async (e)=>{
        e.preventDefault();
        setLoading(true);
        const data = new FormData();
        data.append('title',category.title);
        data.append('image',category.image);
        data.append('parentCategorieTitle',category.parentCategorieTitle ? category.parentCategorieTitle : null);
        await dispatch(updateCategory(category._id,data));
        setLoading(false);
    }

    const goBack = ()=>{
        if(window.confirm('Return to Categories? Changes will NOT save')){
            navigate('/admin-panel/categories')
        }
    }
    

    

    return ( 
        <Container className={classes.container}>
            
            {loading && <Loader size={200}/>}
            <Typography variant="h1" align='center' style={{marginBottom:'100px'}}>Edit Category</Typography>
            
           
                <form onSubmit={handleSubmit}>
                    <Grid container className={classes.rowContainer} >
                        <Grid item sm={12} md={7}  >
                            <TextField fullWidth id="standard-basic" label="Title" variant="standard" value={category.title} name="title" onChange={handleChange} />
                        </Grid> 
                        
                        <Grid item sm={12} md={7} style={{margin:'50px 0'}}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Parent Category</InputLabel>
                                <Select labelId="demo-simple-select-label" id="demo-simple-select" variant='standard' defaultValue={category.parentCategorieTitle} name="parentCategorieTitle" label="Platform" onChange={handleChange}>
                                    
                                    <MenuItem value='Games'>Games</MenuItem>
                                    <MenuItem value='Hardware'>Hardware</MenuItem>  
                                </Select>
                                {!category.parentCategorieTitle && <span style={{color:'red',margin:'10px 0'}}>* This Category is a currentlly Parant Category</span>}
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
                    <div style={{display:'flex',justifyContent:'space-around',margin:'50px 0'}}>
                        <Button color="error" variant='outlined' onClick={()=>goBack()}>Cancel</Button>
                        <Button type="submit" variant='contained'>Update</Button>
                    </div>

                </form>
          


        </Container>
     );
}
 
export default EditCategory;