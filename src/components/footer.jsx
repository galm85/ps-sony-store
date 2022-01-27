import React from 'react'
import {makeStyles} from '@mui/styles';
import {Container,Divider,Grid} from '@mui/material';
import { useNavigate } from 'react-router-dom';
// icons
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import StorageIcon from '@mui/icons-material/Storage';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import HomeIcon from '@mui/icons-material/Home';


const useStyles = makeStyles(theme=>({

    footer:{
        background:theme.colors.main,
        minHeight:'5vh',
        width:'100%',
        fontFamily:theme.fonts.main,
        color:'white',
        padding:'50px',
        
    },
    para:{
        textAlign:'center',
        lineHeight:'3',
        fontFamily:theme.fonts.main,
        color:'white',
        fontWeight:theme.fontW.thin,
        
    },
    gwdLink:{
        color:theme.colors.secondary,
        textDecoration:'none',
        fontWeight:theme.fontW.black
    },
    link:{
        fontFamily:theme.fonts.main,
        fontWeight:theme.fontW.thin,
        height:'50px',
        fontSize:'1.3rem',
        display:'flex',
        alignItems:'center',
        cursor:'pointer',
        "&:hover":{
            color:theme.colors.secondary
        }
    }
    

}))

const Footer = () => {

    const classes = useStyles();
    const navigate = useNavigate();


    return ( 
        <div className={classes.footer}>
            <Container>
                <Grid container>

                    <Grid item sm={12} md={8}>
                        <i className="fab fa-playstation" style={{fontSize:'4rem',color:'white'}} ></i>
                        <p>Sony Store</p>
                        
                    </Grid>


                    <Grid item sm={12} md={4}>
                            <Grid container>
                                <Grid item md={6}>
                                    <p className={classes.link} onClick={()=>navigate('/')}><HomeIcon style={{marginRight:'10px'}}/> Home</p>
                                    <p className={classes.link} onClick={()=>navigate('/games')}><SportsEsportsIcon style={{marginRight:'10px'}}/> Games</p>
                                    <p className={classes.link} onClick={()=>navigate('/hardware')}><StorageIcon style={{marginRight:'10px'}}/>Hardware</p>
                            
                                </Grid>
                                <Grid item md={6}>
                                    <p className={classes.link} onClick={()=>navigate('/news')}><AnnouncementIcon style={{marginRight:'10px'}}/> News</p>
                                    <p className={classes.link} onClick={()=>navigate('/support')}><HelpCenterIcon style={{marginRight:'10px'}}/> Support</p>
                                    <p className={classes.link} onClick={()=>navigate('/services')}><RssFeedIcon style={{marginRight:'10px'}}/> Services</p>
                           
                                </Grid>
                            </Grid>
                    </Grid>

                </Grid>

                <Divider color="white" style={{marginTop:'20px'}}/>

                <Grid container>
                    <Grid item sm={12}>
                    <p className={classes.para}>Sony Store |  <a target="_blank" href="https://galwebdev.com" className={classes.gwdLink}>GWD</a> | {new Date().getFullYear()}</p>
                    </Grid>
                </Grid>

            </Container>
        </div>
     );
}
 
export default Footer;