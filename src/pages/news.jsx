import * as React from 'react';
import { makeStyles } from '@mui/styles';
import { Button, Container, Divider, Grid } from '@mui/material';
import PageHeader from '../components/pageHeader';
import { Box } from '@mui/system';
import {useSelector,useDispatch} from 'react-redux';
import { getAllArticles } from '../redux/actions/articlesActions';
import {url} from '../config';





const useStyles = makeStyles(theme=>({
    mainArticleContainer:{
        margin:'40px 0',
        fontFamily:theme.fonts.main,
    },
    mainArticle:{
        padding:'0 30px'
    },
    articlesBox:{
        width:'80%',
        margin:'40px 0',
    },
    articleContianer:{fontFamily:theme.fonts.main,},
    article:{padding:'0 40px'},
}))


export default function News(){

    const dispatch = useDispatch();
    const articles = useSelector(state=>state.articles.articles);
    
    React.useEffect(()=>{
        dispatch(getAllArticles());
    },[])

    const classes = useStyles ();
    return(
        <>
        <PageHeader image="newsbanner.png" title="PS NEWS" color="white"/> 
    
        <Container>
                <Grid container className={classes.mainArticleContainer}>
                    <Grid item sm={4}>
                        <img src="https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" width="100%" alt="" />
                    </Grid>
                    <Grid item sm={8} className={classes.mainArticle}>
                        <h3>Title</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod culpa illum in ab fugit nisi mollitia voluptatibus nam, doloribus quidem.</p>
                        <Button>Read More</Button>
                    </Grid>
                </Grid>

                <Divider style={{margin:'30px 0'}}/>
                <Box  className={classes.articlesBox} >
                    
                    {articles && articles.map(row=>(

                        <Grid container className={classes.articleContianer}>
                            <Grid item sm={4}>
                                <img src={`${url}/${row.image}`} width="100%" alt="article main image" />
                            </Grid>
                            <Grid item sm={7} className={classes.article}>
                                <h3>{row.title}</h3>
                                <p>{row.article.substring(0,4)}...</p>
                            </Grid>
                        </Grid>
                    
                    ))}
                    
                </Box>

        </Container>
        </>
    )
}