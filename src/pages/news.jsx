import * as React from 'react';
import { makeStyles } from '@mui/styles';
import { Button, Container, Divider, Grid,Fab } from '@mui/material';
import PageHeader from '../components/pageHeader';

import {useSelector,useDispatch} from 'react-redux';
import {getPostedArticles } from '../redux/actions/articlesActions';
import {url} from '../config';
import {useNavigate} from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';



const useStyles = makeStyles(theme=>({
   
    container:{
        fontFamily:theme.fonts.main,
        margin:'50px 0',
        display:'flex',
        justifyContent:'space-between'
    },
    article:{
       position:'relative',
       textAlign:'center',
       transition:'all 0.2s ease',
       height:'300px',
       '&:hover ':{
        transform:'scale(1.05)', 
       },
       '&:hover $edit':{
           opacity:1
       }
    },
    edit:{
       position:'absolute',
       top:'10px',
       right:'10px',
       cursor:'pointer',
       opacity:0,
       transition:'all 0.2s ease'
    
    }
}))


export default function News(){

    const dispatch = useDispatch();
    const articles = useSelector(state=>state.articles.articles);
    const user = useSelector(state=>state.users.user);
    const navigate = useNavigate()
    const classes = useStyles ();

    React.useEffect(()=>{
        dispatch(getPostedArticles());
    },[])

    return(
        <>
        <PageHeader image="newsbanner.png" title="PS NEWS" color="white"/> 
    
        <Container>
                <Grid container className={classes.container}>    
                    {articles && articles.map(row=>(
                            <Grid item sm={5} className={classes.article} key={row._id} style={{marginBottom:'50px'}}>
                                <img src={`${url}/${row.image}`} width="100%" style={{objectFit:'cover',height:'80%',borderRadius:'20px'}} alt="article main image" onClick={()=>navigate(`/news/${row.title.toLowerCase().replace(/ /g,'-')}`,{state:row})}/>
                                <h3>{row.title}</h3>
                                {user && user.role === 'admin' && 
                                    <div className={classes.edit}>
                                        <Button color="warning" onClick={()=>navigate(`/admin-panel/news/edit/${row._id}`,{state:row})}><EditIcon fontSize='large'/></Button>
                                    </div>
                                }
                                
                            </Grid>
                            
                            ))}
                    </Grid>
                    
              
                    {user && user.role === 'admin' && 
                    <>
                        <Divider style={{margin:'50px'}}/>
                        
                        <div style={{textAlign:'right',marginBottom:'50px'}}>    
                            <Fab color="primary" aria-label="add" onClick={()=>navigate('/admin-panel/news/add-new-article')}>
                                <AddIcon />
                            </Fab>
                        </div>
                    </>
                    }

        </Container>
        </>
    )
}