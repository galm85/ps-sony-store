import * as React from 'react';
import { NavLink } from 'react-router-dom';
import {makeStyles} from '@mui/styles';
import {Box,Drawer,Button,List,Divider,ListItem,ListItemText,ListItemIcon,Typography} from '@mui/material';
import { useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import StorageIcon from '@mui/icons-material/Storage';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import HomeIcon from '@mui/icons-material/Home';

const useStyles = makeStyles(theme=>({
  container:{
    background:'#0b1422',
    minHeight:'100%',
    display:'flex',
    flexDirection:'column',
  },
  header:{
    padding:'20px 16px 16px',
    borderBottom:'1px solid rgba(255,255,255,0.06)',
    display:'flex',
    alignItems:'center',
    gap:'10px',
  },
  listItem:{
    cursor:'pointer',
    borderRadius:'10px',
    margin:'2px 8px',
    width:'calc(100% - 16px)',
    transition:'all 0.18s ease',
    '&:hover':{
      background:'rgba(0,63,207,0.1)',
    }
  },
  active:{
    textDecoration:'none',
    color:'#1a6aff',
    fontFamily:"'Inter', sans-serif",
    fontWeight:600,
    fontSize:'0.9rem',
  },
  nonActive:{
    textDecoration:'none',
    color:'rgba(240,244,255,0.65)',
    fontFamily:"'Inter', sans-serif",
    fontWeight:400,
    fontSize:'0.9rem',
    transition:'color 0.15s ease',
  },
  icon:{
    color:'rgba(240,244,255,0.35)',
    fontSize:'1.1rem !important',
  },
  sectionLabel:{
    fontFamily:"'Space Grotesk', sans-serif",
    fontSize:'0.64rem',
    fontWeight:700,
    textTransform:'uppercase',
    letterSpacing:'0.1em',
    color:'rgba(240,244,255,0.25)',
    padding:'16px 16px 6px',
    display:'block',
  }
}));


export default function Sidenav({children}) {
  const url = process.env.REACT_APP_API_URL;
  const classes = useStyles();
  const user = useSelector(state => state.users.user);
  const navigate = useNavigate();

  const [state, setState] = React.useState({ left: false });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) return;
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 256 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      className={classes.container}
    >
      <div className={classes.header}>
        <i className="fab fa-playstation" style={{fontSize:'1.6rem',color:'#1a6aff',lineHeight:1}} />
        <Box sx={{lineHeight:1}}>
          <Typography sx={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:'0.9rem',color:'#f0f4ff',lineHeight:1.2}}>PlayStation</Typography>
          <Typography sx={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:500,fontSize:'0.58rem',color:'rgba(240,244,255,0.3)',letterSpacing:'0.1em',textTransform:'uppercase',lineHeight:1}}>Store</Typography>
        </Box>
      </div>

      {user ?
        <List sx={{pt:1}}>
          <span className={classes.sectionLabel}>Account</span>
          <ListItem className={classes.listItem} onClick={()=>navigate('/profile')}>
            <ListItemIcon>
              <img src={`${url}/${user.image}`} alt="user" style={{width:'26px',height:'26px',borderRadius:'50%',border:'1.5px solid rgba(26,106,255,0.5)',objectFit:'cover'}} />
            </ListItemIcon>
            <ListItemText>
              <NavLink className={(n)=>n.isActive ? classes.active : classes.nonActive} to='/profile'>
                {user.firstName + ' ' + user.lastName}
              </NavLink>
            </ListItemText>
          </ListItem>
          <ListItem className={classes.listItem} onClick={()=>navigate('/cart')}>
            <ListItemIcon><ShoppingCartOutlinedIcon className={classes.icon}/></ListItemIcon>
            <ListItemText>
              <NavLink className={(n)=>n.isActive ? classes.active : classes.nonActive} to='/cart'>Cart</NavLink>
            </ListItemText>
          </ListItem>
          {user.role === 'admin' &&
            <ListItem className={classes.listItem} onClick={()=>navigate('/admin-panel')}>
              <ListItemIcon><AdminPanelSettingsIcon className={classes.icon}/></ListItemIcon>
              <ListItemText>
                <NavLink className={(n)=>n.isActive ? classes.active : classes.nonActive} to='/admin-panel'>Admin Panel</NavLink>
              </ListItemText>
            </ListItem>
          }
        </List>
        :
        <List sx={{pt:1}}>
          <span className={classes.sectionLabel}>Account</span>
          <ListItem className={classes.listItem} onClick={()=>navigate('/signin')}>
            <ListItemIcon><AccountCircleIcon className={classes.icon}/></ListItemIcon>
            <ListItemText>
              <NavLink className={(n)=>n.isActive ? classes.active : classes.nonActive} to='/signin'>Sign In</NavLink>
            </ListItemText>
          </ListItem>
        </List>
      }

      <Divider sx={{borderColor:'rgba(255,255,255,0.06)'}}/>

      <List sx={{pt:1}}>
        <span className={classes.sectionLabel}>Browse</span>
        <ListItem className={classes.listItem} onClick={()=>navigate('/')}>
          <ListItemIcon><HomeIcon className={classes.icon}/></ListItemIcon>
          <ListItemText>
            <NavLink className={(n)=>n.isActive ? classes.active : classes.nonActive} to='/'>Home</NavLink>
          </ListItemText>
        </ListItem>
        <ListItem className={classes.listItem} onClick={()=>navigate('/games')}>
          <ListItemIcon><SportsEsportsIcon className={classes.icon}/></ListItemIcon>
          <ListItemText>
            <NavLink className={(n)=>n.isActive ? classes.active : classes.nonActive} to='/games'>Games</NavLink>
          </ListItemText>
        </ListItem>
        <ListItem className={classes.listItem} onClick={()=>navigate('/hardware')}>
          <ListItemIcon><StorageIcon className={classes.icon}/></ListItemIcon>
          <ListItemText>
            <NavLink className={(n)=>n.isActive ? classes.active : classes.nonActive} to='/hardware'>Hardware</NavLink>
          </ListItemText>
        </ListItem>
        <ListItem className={classes.listItem} onClick={()=>navigate('/services')}>
          <ListItemIcon><RssFeedIcon className={classes.icon}/></ListItemIcon>
          <ListItemText>
            <NavLink className={(n)=>n.isActive ? classes.active : classes.nonActive} to='/services'>Services</NavLink>
          </ListItemText>
        </ListItem>
        <ListItem className={classes.listItem} onClick={()=>navigate('/news')}>
          <ListItemIcon><AnnouncementIcon className={classes.icon}/></ListItemIcon>
          <ListItemText>
            <NavLink className={(n)=>n.isActive ? classes.active : classes.nonActive} to='/news'>News</NavLink>
          </ListItemText>
        </ListItem>
        <ListItem className={classes.listItem} onClick={()=>navigate('/support')}>
          <ListItemIcon><HelpCenterIcon className={classes.icon}/></ListItemIcon>
          <ListItemText>
            <NavLink className={(n)=>n.isActive ? classes.active : classes.nonActive} to='/support'>Support</NavLink>
          </ListItemText>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      <React.Fragment key="left">
        <Button onClick={toggleDrawer("left", true)} sx={{minWidth:'auto',p:0}}>
          {children}
        </Button>
        <Drawer
          anchor="left"
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
        >
          {list("left")}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
