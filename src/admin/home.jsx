import { Container, Typography ,Grid, Divider } from '@mui/material';
import React from 'react';
import { makeStyles } from '@mui/styles';


//icons
import CategoryIcon from '@mui/icons-material/Category';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import PeopleIcon from '@mui/icons-material/People';
import ArticleIcon from '@mui/icons-material/Article';
import EmailIcon from '@mui/icons-material/Email';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import { Link } from 'react-router-dom';


const useStyles = makeStyles(theme=>({
    linkContainer:{
       textAlign:'center',
       height:'150px',
       marginTop:'50px',
    },
    link:{
        textDecoration:'none',
        color:theme.colors.main,
        '&:hover':{
            color:theme.colors.naval
        }
       
    }

}))





const Home = () => {


    const classes = useStyles();

    return ( 
        <Container>
            <Typography align="center" variant='h1'>Admin Panel</Typography>
            <Divider style={{margin:'30px 0'}}/>
            
            <Grid container>
                <Grid item sm={12} md={4} className={classes.linkContainer} style={{marginTop:'50px'}}>
                    <Link to="/admin-panel/categories" className={classes.link}>
                        <CategoryIcon style={{height:'60%',width:'100%'}}/>
                        <Typography variant='h4' align="center">Categories</Typography>
                    </Link>
                </Grid>
                <Grid item sm={12} md={4} className={classes.linkContainer} style={{marginTop:'50px'}}>
                    <Link to="/admin-panel/products" className={classes.link}>
                        <SportsEsportsIcon style={{height:'60%',width:'100%'}}/>
                        <Typography variant='h4' align="center">Products</Typography>
                    </Link>
                </Grid>
                <Grid item sm={12} md={4} className={classes.linkContainer} style={{marginTop:'50px'}}>
                    <Link to="/admin-panel/users" className={classes.link}>
                        <PeopleIcon style={{height:'60%',width:'100%'}}/>
                        <Typography variant='h4' align="center">Users</Typography>
                    </Link>
                </Grid>
                <Grid item sm={12} md={4} className={classes.linkContainer} style={{marginTop:'50px'}}>
                    <Link to="/admin-panel/orders" className={classes.link}>
                        <ArticleIcon style={{height:'60%',width:'100%'}}/>
                        <Typography variant='h4' align="center">Orders</Typography>
                    </Link>
                </Grid>
                <Grid item sm={12} md={4} className={classes.linkContainer} style={{marginTop:'50px'}}>
                    <Link to="/admin-panel/messages" className={classes.link}>
                        <EmailIcon style={{height:'60%',width:'100%'}}/>
                        <Typography variant='h4' align="center">MESSAGES</Typography>
                    </Link>
                </Grid>
                <Grid item sm={12} md={4} className={classes.linkContainer} style={{marginTop:'50px'}}>
                    <Link to="/admin-panel/news" className={classes.link}>
                        <AnnouncementIcon style={{height:'60%',width:'100%'}}/>
                        <Typography variant='h4' align="center">NEWS</Typography>
                    </Link>
                </Grid>
                
        
            </Grid>

        </Container>
     );
}
 
export default Home;