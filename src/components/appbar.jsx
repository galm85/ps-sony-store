import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import {AppBar,Box,Toolbar,IconButton,Typography,InputBase,Badge,MenuItem,Menu, Button} from '@mui/material';
import {makeStyles} from '@mui/styles';
import { Link } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import {url} from '../config';
import { useNavigate } from 'react-router-dom';
import {getCart, getWishList} from '../redux/actions/usersActions'

// icons
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Sidenav from './sidenav';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ConfirmMenu from './confirm';


const useStyles = makeStyles(theme=>({
  appnav:{
    background:theme.colors.main, 
  },
  mobileLink:{
    color:theme.colors.main
  }
}))

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));



export default function Appbar() {

  const dispatch = useDispatch();
  const classes = useStyles();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const user = useSelector(state => state.users.user);
  const itemsInCart = useSelector(state => state.users.cart.length);
  const itemInWishList = useSelector(state=>state.users.wishList.length);
  
  const [search, setSearch] = React.useState(null);
  const [confirmObject,setConfirmObject] = React.useState({isOpen:false});
  

  React.useEffect(()=>{
    if(user){
      dispatch(getCart(user._id));
      dispatch(getWishList(user._id));
    }
  },[])


  const handleSearch = (e)=>{
    if(search !== null && search !== ''){
      if(e.key === 'Enter'){
        navigate(`/search/${search}`,{state:search});
      }
    }
  }
  
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const logout = ()=>{
      localStorage.removeItem('sony');
      window.location = "/";
  }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {user ? 
        <>
        <MenuItem onClick={handleMenuClose}><span onClick={()=>navigate('/profile')}>My account</span></MenuItem>
        <MenuItem onClick={handleMenuClose} onClickCapture={()=>setConfirmObject({...confirmObject,isOpen:true,title:"Logout",subtitle:'Are You Sure?',noBtn:"Cancel",yesBtn:'Logout',onConfirm:()=>logout()})} >Logout</MenuItem>
        </> 
        : 
        <MenuItem onClick={handleMenuClose}><span onClick={()=>navigate('/signin')}>Sign In</span></MenuItem>
    }
      
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {user ? 
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
          >
            
              <img src={url+"/"+user.image} style={{borderRadius:'50%',height:'30px'}} width="30px" alt="profile" />
            
        </IconButton>
       
      </MenuItem>
      :
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
          >
          <AccountCircle />
        </IconButton>
        
      </MenuItem>

      }
       
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={itemsInCart} color="error">
            <Link to="/cart" className={classes.mobileLink}>
              <ShoppingCartIcon />
            </Link>
          </Badge>
        </IconButton>
        
      </MenuItem>
           
      <MenuItem>
          <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
                <Badge badgeContent={itemInWishList} color="error">
                  <Link to="/wish-list" className={classes.mobileLink}> 
                    <FavoriteIcon />
                  </Link>
                </Badge>
              </IconButton>
        
      </MenuItem>

      
    </Menu>
  );


  

  return (
    <Box sx={{ flexGrow: 1 }} >
      <AppBar position="static" >
        <Toolbar className={classes.appnav}>
        <Sidenav>
            <IconButton>
              <MenuIcon  style={{color:'white'}} />
            </IconButton>
          </Sidenav>

           
          
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
            onClick={()=>navigate('/')}
            style={{cursor:'pointer'}}
          >
           <i className="fab fa-playstation" style={{fontSize:'2rem'}} ></i>
          </Typography>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e)=>setSearch(e.target.value)}
              onKeyPress={handleSearch}
              autoComplete='e.e'
            />
            
          </Search>

          <Box sx={{ flexGrow: 1 }} />
          
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>

              {itemsInCart && itemsInCart > 0 ? 
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                  <Badge badgeContent={itemsInCart} color="error">
                    <Link to="/cart" style={{color:"white"}}>
                      <ShoppingCartIcon />
                    </Link>
                  </Badge>
              </IconButton>
              :
              <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                  
                    <Link to="/cart" style={{color:"white"}}>
                      <ShoppingCartIcon />
                    </Link>
                  
              </IconButton>
              }

              
            
              <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
                <Badge badgeContent={itemInWishList} color="error">
                  <Link to="/wish-list" style={{color:'white'}}> 
                    <FavoriteIcon />
                  </Link>
                </Badge>
              </IconButton>
              {user ? 
              
              <IconButton size="large" edge="end" aria-label="account of current user" aria-controls={menuId} aria-haspopup="true" onClick={handleProfileMenuOpen} color="inherit">
                <img src={`${url}/${user.image}`} alt="" width="30px" height="30px" style={{borderRadius:'50%'}}/>
              </IconButton>
              :

              <IconButton size="large" edge="end" aria-label="account of current user" aria-controls={menuId} aria-haspopup="true" onClick={handleProfileMenuOpen} color="inherit">
                <AccountCircle />
              </IconButton>
            }
            
          </Box>
          
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      <ConfirmMenu confirmObject={confirmObject} setConfirmObject={setConfirmObject} />
    </Box>
  );
}
