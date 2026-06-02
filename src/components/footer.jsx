import React from 'react';
import {makeStyles} from '@mui/styles';
import {Container,Divider,Grid,Typography,Box} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import StorageIcon from '@mui/icons-material/Storage';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import HomeIcon from '@mui/icons-material/Home';

const useStyles = makeStyles(theme=>({
  footer:{
    background:'#060c18',
    borderTop:'1px solid rgba(255,255,255,0.06)',
    width:'100%',
    padding:'64px 0 32px',
  },
  colLabel:{
    fontFamily:"'Space Grotesk', sans-serif",
    color:'rgba(240,244,255,0.3)',
    fontSize:'0.68rem',
    fontWeight:700,
    textTransform:'uppercase',
    letterSpacing:'0.12em',
    marginBottom:'20px',
    display:'block',
  },
  link:{
    fontFamily:"'Inter', sans-serif",
    fontWeight:400,
    fontSize:'0.88rem',
    display:'flex',
    alignItems:'center',
    gap:'8px',
    cursor:'pointer',
    color:'rgba(240,244,255,0.5)',
    padding:'7px 0',
    transition:'color 0.2s ease',
    lineHeight:1,
    '&:hover':{
      color:'rgba(240,244,255,0.9)',
    }
  },
  copyright:{
    color:'rgba(240,244,255,0.25)',
    fontSize:'0.78rem',
    fontFamily:"'Inter', sans-serif",
    textAlign:'center',
  },
  gwdLink:{
    color:'#4d8bff',
    textDecoration:'none',
    fontWeight:600,
    transition:'color 0.2s ease',
    '&:hover':{color:'#80aaff'}
  }
}));

const Footer = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <div className={classes.footer}>
      <Container>
        <Grid container spacing={5}>

          <Grid item xs={12} md={4}>
            <Box sx={{display:'flex',alignItems:'center',gap:1.5,mb:2.5}}>
              <i className="fab fa-playstation" style={{fontSize:'2.2rem',color:'#1a6aff',lineHeight:1}} />
              <Box sx={{lineHeight:1}}>
                <Typography sx={{
                  color:'#f0f4ff',
                  fontFamily:"'Space Grotesk',sans-serif",
                  fontWeight:700,
                  fontSize:'1rem',
                  lineHeight:1.2,
                }}>
                  PlayStation
                </Typography>
                <Typography sx={{
                  color:'rgba(240,244,255,0.35)',
                  fontFamily:"'Space Grotesk',sans-serif",
                  fontWeight:500,
                  fontSize:'0.6rem',
                  letterSpacing:'0.1em',
                  textTransform:'uppercase',
                  lineHeight:1,
                }}>
                  Store
                </Typography>
              </Box>
            </Box>
            <Typography sx={{
              color:'rgba(240,244,255,0.38)',
              fontSize:'0.84rem',
              lineHeight:1.8,
              maxWidth:'280px',
              fontFamily:"'Inter',sans-serif",
            }}>
              Your official destination for PlayStation games, hardware, and accessories. Discover the latest titles and gear.
            </Typography>
          </Grid>

          <Grid item xs={6} sm={4} md={2}>
            <span className={classes.colLabel}>Navigate</span>
            <p className={classes.link} onClick={()=>navigate('/')}>
              <HomeIcon sx={{fontSize:'0.95rem',opacity:0.7}} /> Home
            </p>
            <p className={classes.link} onClick={()=>navigate('/games')}>
              <SportsEsportsIcon sx={{fontSize:'0.95rem',opacity:0.7}} /> Games
            </p>
            <p className={classes.link} onClick={()=>navigate('/hardware')}>
              <StorageIcon sx={{fontSize:'0.95rem',opacity:0.7}} /> Hardware
            </p>
          </Grid>

          <Grid item xs={6} sm={4} md={2}>
            <span className={classes.colLabel}>Explore</span>
            <p className={classes.link} onClick={()=>navigate('/news')}>
              <AnnouncementIcon sx={{fontSize:'0.95rem',opacity:0.7}} /> News
            </p>
            <p className={classes.link} onClick={()=>navigate('/support')}>
              <HelpCenterIcon sx={{fontSize:'0.95rem',opacity:0.7}} /> Support
            </p>
            <p className={classes.link} onClick={()=>navigate('/services')}>
              <RssFeedIcon sx={{fontSize:'0.95rem',opacity:0.7}} /> Services
            </p>
          </Grid>

          <Grid item xs={12} sm={4} md={4}>
            <span className={classes.colLabel}>About</span>
            <Typography sx={{
              color:'rgba(240,244,255,0.38)',
              fontSize:'0.84rem',
              lineHeight:1.8,
              fontFamily:"'Inter',sans-serif",
            }}>
              A student e-commerce project built to explore modern UI design, React, and state management with a PlayStation gaming theme.
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{my:4,borderColor:'rgba(255,255,255,0.05)'}} />

        <Box sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
          <p className={classes.copyright}>
            © {new Date().getFullYear()} PlayStation Store &nbsp;·&nbsp; Built by{' '}
            <a href="https://galwebdev.com" target="_blank" rel="noreferrer" className={classes.gwdLink}>GWD</a>
          </p>
        </Box>
      </Container>
    </div>
  );
};

export default Footer;
