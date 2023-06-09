import * as React from 'react';
import { NavLink } from 'react-router-dom';
import {makeStyles} from '@mui/styles'
import {Box,Drawer,Button,List,Divider,ListItem,ListItemText,ListItemIcon} from '@mui/material';
import {url} from '../config';
import { useDispatch,useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom';
//icons
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import StorageIcon from '@mui/icons-material/Storage';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import LogoutIcon from '@mui/icons-material/Logout';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import HomeIcon from '@mui/icons-material/Home';

const useStyles = makeStyles(theme=>({
  sidenavContainer:{
    background:theme.colors.main,
    
    minHeight:'100%',

  },
  listItem:{
    cursor:'pointer',
    "&:hover":{
      background:'rgba(255,255,255,0.3)',
      
    }
  },
  active:{
    textDecoration:'none',
    color:theme.colors.green,
    fontFamily:theme.fonts.main,
  },
  nonActive:{
    textDecoration:'none',
    color:'white',
    fontFamily:theme.fonts.main,
  },
  icon:{color:'white'}
  
 
  
  
  
}))




export default function Sidenav({children}) {

  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector(state => state.users.user);
  const navigate = useNavigate();


  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      className={classes.sidenavContainer}
    >
     

        {user ? 
    <List>
  
        <ListItem  className={classes.listItem} onClick={()=>navigate('/profile')}>
            <ListItemIcon><img src={`${url}/${user.image}`} alt="user image" style={{width:'30px',height:'30px',borderRadius:'50%'}} /></ListItemIcon>
            <ListItemText><NavLink className={(navData)=>navData.isActive ? classes.active : classes.nonActive} to='/profile'>{user.firstName + ' ' +user.lastName}</NavLink></ListItemText>
        </ListItem>
        
        <ListItem className={classes.listItem} onClick={()=>navigate('/cart')}>
            <ListItemIcon><ShoppingCartIcon className={classes.icon}/></ListItemIcon>
            <ListItemText><NavLink className={(navData)=>navData.isActive ? classes.active : classes.nonActive} to='/cart'>Cart</NavLink></ListItemText>
        </ListItem>
        {user.role === 'admin' &&
        <ListItem className={classes.listItem} onClick={()=>navigate('/admin-panel')}>
            <ListItemIcon><AdminPanelSettingsIcon className={classes.icon}/></ListItemIcon>
            <ListItemText><NavLink className={(navData)=>navData.isActive ? classes.active : classes.nonActive} to='/admin-panel'>Admin Panel</NavLink></ListItemText>
        </ListItem>
        }
    </List>
    :
    <List>
  
        <ListItem  className={classes.listItem} onClick={()=>navigate('/signin')}>
            <ListItemIcon><AccountCircleIcon className={classes.icon}/></ListItemIcon>
            <ListItemText><NavLink className={(navData)=>navData.isActive ? classes.active : classes.nonActive} to='/signin'>Sign in</NavLink></ListItemText>
        </ListItem>
        
        
    </List>

        }

    <Divider color="white"/>

    <List>
        <ListItem className={classes.listItem} onClick={()=>navigate('/')}>
            <ListItemIcon><HomeIcon className={classes.icon}/></ListItemIcon>
            <ListItemText><NavLink className={(navData)=>navData.isActive ? classes.active : classes.nonActive} to='/'>Home</NavLink></ListItemText>
        </ListItem>
        <ListItem className={classes.listItem} onClick={()=>navigate('/games')}>
            <ListItemIcon><SportsEsportsIcon className={classes.icon}/></ListItemIcon>
            <ListItemText><NavLink className={(navData)=>navData.isActive ? classes.active : classes.nonActive} to='/games'>Games</NavLink></ListItemText>
        </ListItem>
        <ListItem className={classes.listItem} onClick={()=>navigate('/hardware')}>
            <ListItemIcon><StorageIcon className={classes.icon}/></ListItemIcon>
            <ListItemText><NavLink className={(navData)=>navData.isActive ? classes.active : classes.nonActive} to='/hardware'>Hardware</NavLink></ListItemText>
        </ListItem>
        <ListItem className={classes.listItem} onClick={()=>navigate('/services')}>
            <ListItemIcon><RssFeedIcon className={classes.icon}/></ListItemIcon>
            <ListItemText><NavLink className={(navData)=>navData.isActive ? classes.active : classes.nonActive} to='/services'>Services</NavLink></ListItemText>
        </ListItem>
        <ListItem className={classes.listItem} onClick={()=>navigate('/news')}>
            <ListItemIcon><AnnouncementIcon className={classes.icon}/></ListItemIcon>
            <ListItemText><NavLink className={(navData)=>navData.isActive ? classes.active : classes.nonActive} to='/news'>News</NavLink></ListItemText>
        </ListItem>
        <ListItem className={classes.listItem} onClick={()=>navigate('/support')}>
            <ListItemIcon><HelpCenterIcon className={classes.icon}/></ListItemIcon>
            <ListItemText><NavLink className={(navData)=>navData.isActive ? classes.active : classes.nonActive}  to='/support'>Support</NavLink></ListItemText>
        </ListItem>
    </List>

    <Divider/>

    

    </Box>
  );

  return (
    <div>
      <React.Fragment key={"left"}>
          <Button onClick={toggleDrawer("left", true)}>{children}</Button>
          <Drawer
            anchor={"left"}
            open={state["left"]}
            onClose={toggleDrawer("left", false)}
          >
            {list("left")}
          </Drawer>
        </React.Fragment>
    </div>
  );
}
