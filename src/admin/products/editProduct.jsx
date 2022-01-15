import { Container, Grid, TextField, Typography,FormGroup,FormControlLabel,Switch,FormControl,InputLabel,Select,MenuItem, Divider, Button, Input } from '@mui/material';
import React,{useEffect,useState} from 'react';
import { makeStyles } from '@mui/styles';
import { useDispatch,useSelector } from 'react-redux';
import { getAllCategories } from '../../redux/actions/categoriesActions';
import { addNewProducts, updateProduct } from '../../redux/actions/productsAction';
import { useNavigate, useLocation } from "react-router-dom";
import {url} from '../../config';

const useStyles = makeStyles(theme=>({
    container:{
        marginTop:'20px',
    },
    rowContainer:{
        display:'flex',
        justifyContent:'space-around',
        marginBottom:'50px'
    }
}))


const EditProduct = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const [product,setProduct] = useState({...location.state});
    const categories = useSelector(state => state.categories.categories);
    const [image,setImage] = useState(url + "/" + product.image);

    const goBack = ()=>{
        if(window.confirm('Are you sure to cancel? changes will not save')){

            navigate('/admin-panel/products')
        }
    }

    const handleChange = (e)=>{
        setProduct({...product,[e.target.name]:e.target.value});
    }

    const handleImage = (e)=>{
        let file = e.target.files[0];
        setProduct({...product,image:file});
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e)=>{
            setImage(e.target.result);
        }
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        const data = new FormData();
        data.append('title',product.title);
        data.append('categorie',product.categorie);
        data.append('platform',product.platform);
        data.append('image',product.image);
        data.append('price',product.price);
        data.append('onStock',product.onStock ? true : false);
        data.append('onSale',product.onSale ? true : false);
        data.append('salePrice',product.onSale ? product.salePrice :0);
        data.append('description',product.description);
        data.append('sells',0);
        data.append('newGame',product.newGame ? true : false);
        data.append('comingSoon',product.comingSoon ? true : false);

        dispatch(updateProduct(product._id,data));
    }

    const handleSwitch = (e)=>{
        setProduct({...product,[e.target.name]:e.target.checked}); 
    }

    useEffect(()=>{
        dispatch(getAllCategories());
    },[])

    return ( 
        <Container className={classes.container}>
            <Typography variant="h1" align='center' style={{marginBottom:'100px'}}>Add New Product</Typography>
            
           
                <form onSubmit={handleSubmit}>
                    <Grid container className={classes.rowContainer} >
                        <Grid item sm={12} md={4}  >
                            <TextField fullWidth id="standard-basic" label="Title" variant="standard" name="title" onChange={handleChange} value={product.title} />
                        </Grid>

                        <Grid item sm={12} md={3} >
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                <Select labelId="demo-simple-select-label" id="demo-simple-select" variant='standard' value={product.categorie} name="categorie" label="Cagtegory" onChange={handleChange}>
                                        <MenuItem value={product.categorie}>{product.categorie}</MenuItem>
                                    {categories &&  categories.map(row=>(
                                        <MenuItem value={row.title}>{row.title}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item sm={12} md={3}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Platform</InputLabel>
                                <Select labelId="demo-simple-select-label" id="demo-simple-select" variant='standard' value={product.platform} name="platform" label="Platform" onChange={handleChange}>
                                    <MenuItem value={product.platform}>{product.platform}</MenuItem>
                                    <MenuItem value='ps5'>PS5</MenuItem>
                                    <MenuItem value='ps4'>PS4</MenuItem>
                                   
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    
                 <Divider style={{marginBottom:'50px'}}/>

                    <Grid container className={classes.rowContainer}>
                        <Grid item sm={12} md={6} style={{paddingLeft:'100px'}}>
                            <FormGroup>
                                <FormControlLabel control={<Switch checked={product.onStock}  name="onStock" onChange={(e)=>{handleSwitch(e)}}/>} label="On Stock" />
                                <FormControlLabel control={<Switch checked={product.onSale} name="onSale" onChange={(e)=>{handleSwitch(e)}}/>} label="On Sale" />
                                <FormControlLabel control={<Switch checked={product.newGame} name="newGame" onChange={(e)=>{handleSwitch(e)}} />} label="New Game" />
                                <FormControlLabel control={<Switch checked={product.comingSoon} name="comingSoon" onChange={(e)=>{handleSwitch(e)}}/>} label="Coming Soon" />
                            </FormGroup>
                        </Grid>



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

                    <Grid container className={classes.rowContainer} >
                        <Grid item sm={12} md={5}>
                            <TextField fullWidth id="standard-basic" label="price" value={product.price} variant="standard"  name="price" onChange={handleChange}/>
                        </Grid>
                        {product.onSale &&
                        <Grid item sm={12} md={5}>
                            <TextField fullWidth id="standard-basic" label="Sell Price" value={product.salePrice} variant="standard" name="salePrice" onChange={handleChange} />
                        </Grid>
                        }
                    </Grid>

                    <Grid container className={classes.rowContainer}>
                            <Grid item sm={10}>
                                <TextField multiline rows={10} fullWidth label="description" name="description" value={product.description} onChange={handleChange}/>
                            </Grid>
                    </Grid>
                    
                    <div style={{display:'flex',justifyContent:'space-around',margin:'50px 0'}}>
                        <Button type="button" variant="outlined" color="error" onClick={()=>goBack()}>Cancel</Button>
                        <Button type="submit" variant='contained'>Save</Button>
                    </div>
                </form>
          


        </Container>
     );
}
 
export default EditProduct;