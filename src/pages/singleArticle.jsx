import { Button, Container, Grid, Typography,Divider, Box ,IconButton} from '@mui/material';
import * as React from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import { url } from '../config';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { makeStyles } from '@mui/styles';
import {useDispatch,useSelector} from 'react-redux';
import { getSingleArticle, likeArticle } from '../redux/actions/articlesActions';
import AddComment from '../components/addCommentModal';
import { getCommentsByArticleId } from '../redux/actions/commentsActions';
import DetailsAccordion from '../components/detailsAccordion';


const useStyles = makeStyles(theme=>({
    container:{margin:'50px 0'},
    titleContainer:{display:'flex',justifyContent:'space-between',alignItems:'center'},
    authorContainer:{display:'flex',justifyContent:'space-between',color:theme.colors.naval},
    articleContainer:{fontFamily:theme.fonts.main,fontSize:'1.2rem'},
    imageContainer:{width:'100%',height:'30vh',background:'red'},
    image:{width:"100%",height:'100%',objectFit:'cover'},
    like:{color:theme.colors.main,height:'auto'},
    comments:{marginTop:'30px',display:'flex',justifyContent:'space-around'},
    text:{
     '& p':{
         margin:'20px 0',
     }
    }
}))

export default function SingleArticle(){

    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const classes = useStyles();
    const [like,setLike] = React.useState(false);
    const article = useSelector(state=>state.articles.article)
    const comments = useSelector(state=>state.comments.comments);
    const user = useSelector(state=>state.users.user);

    const handleLike = async ()=>{
        let op = 'remove like';
        if(!like){
            op = 'like';
        }
        await dispatch(likeArticle(article._id,op));
        dispatch(getSingleArticle(location.state._id));
        setLike(!like);
    }

    

    React.useEffect(()=>{
        dispatch(getSingleArticle(location.state._id))
        dispatch(getCommentsByArticleId(location.state._id));
    },[])

    return(

        <div>
        {article && 
       <>
       
        <Box className={classes.imageContainer}>
            <img className={classes.image}   src={`${url}/${article.image}`} alt="article main image" />
        </Box>
        <Container className={classes.container}>
            
            <Grid container>
                <Grid item sm={12} className={classes.titleContainer}>
                    <Typography variant="h2">{article.title}</Typography>
                    {like ?
                    <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                    <ThumbUpIcon className={classes.like} fontSize='large' onClick={()=>handleLike()}/>
                    <span style={{marginTop:'5px'}}>{article.likes}</span>
                    </div>
                    :
                    <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                        <ThumbUpOutlinedIcon className={classes.like} fontSize='large' onClick={()=>handleLike()}/>
                        <span style={{marginTop:'5px'}}>{article.likes}</span>
                    </div>
                    }
                </Grid>  
            </Grid>
            
            <Grid container style={{marginTop:'20px'}}>
                <Grid item sm={12} className={classes.authorContainer}>
                    <Typography variant='h6'>{article.author}</Typography>
                    <Typography variant='h6'>{new Date(article.updatedAt).toDateString()}</Typography>
                </Grid>
            
            </Grid>
            
            <Divider style={{margin:'30px 0'}}/>
            
            <Grid container>
                <Grid item sm={12} lg={10} className={classes.articleContainer}>
                    <div className={classes.text}  dangerouslySetInnerHTML={{__html:article.article}}></div>
                </Grid>
            </Grid>

            <Divider style={{margin:'30px 0'}}/>
            
            <div style={{textAlign:'center'}}>
                 <Button color='error' onClick={()=>navigate('/news')}>Return</Button>
            </div>
            
            <Divider style={{margin:'30px 0'}}/>

            <Grid container className={classes.comments}>

                    <Grid item sm={7} >
                        <DetailsAccordion data={comments} />
                    </Grid>
                    
                    <Grid item sm={3}>
                        {user ?  <AddComment btn='Add Comment' articleId={article._id}/> : <Button onClick={()=>navigate('/signin')}>Sign in to comment</Button>}
                      
                    </Grid>
                
            </Grid>



            

        </Container>
        </>
         }
        </div>
      
    )


}