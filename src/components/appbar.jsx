import * as React from 'react';
import { styled } from '@mui/material/styles';
import {AppBar,Box,Toolbar,IconButton,InputBase,Badge,MenuItem,Menu,Button,Typography} from '@mui/material';
import {makeStyles} from '@mui/styles';
import { Link, NavLink } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {getCart, getWishList} from '../redux/actions/usersActions';

import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Sidenav from './sidenav';
import ConfirmMenu from './confirm';


const useStyles = makeStyles(theme=>({
  navLink:{
    color:'rgba(240,244,255,0.65)',
    textDecoration:'none',
    fontFamily:"'Space Grotesk', sans-serif",
    fontWeight:500,
    fontSize:'0.9rem',
    padding:'6px 14px',
    borderRadius:'8px',
    transition:'all 0.2s ease',
    letterSpacing:'0.01em',
    '&:hover':{
      color:'#ffffff',
      background:'rgba(255,255,255,0.07)',
    },
  },
  mobileIconLink:{
    color:'#f0f4ff',
    display:'flex',
    alignItems:'center',
  }
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '50px',
  backgroundColor: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.09)',
  '&:hover': {
    backgroundColor: 'rgba(255,255,255,0.09)',
    border: '1px solid rgba(255,255,255,0.14)',
  },
  '&:focus-within': {
    backgroundColor: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(0,63,207,0.65)',
    boxShadow: '0 0 0 3px rgba(0,63,207,0.12)',
  },
  marginLeft: 0,
  width: '100%',
  transition: 'all 0.2s ease',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 1.5),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'rgba(240,244,255,0.35)',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: '#f0f4ff',
  fontSize: '0.88rem',
  '& .MuiInputBase-input': {
    padding: theme.spacing(0.9, 1, 0.9, 0),
    paddingLeft: `calc(0.75em + ${theme.spacing(3)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    '&::placeholder': {
      color: 'rgba(240,244,255,0.3)',
      opacity: 1,
    },
    [theme.breakpoints.up('md')]: {
      width: '16ch',
      '&:focus': { width: '24ch' },
    },
  },
}));

const menuPaperProps = {
  sx:{
    background:'#0e1829',
    border:'1px solid rgba(255,255,255,0.09)',
    boxShadow:'0 16px 48px rgba(0,0,0,0.6)',
    borderRadius:'12px',
    mt:1,
    minWidth:168,
    '& .MuiMenuItem-root':{
      borderRadius:'8px',
      mx:0.5,
      my:0.25,
      fontSize:'0.9rem',
    }
  }
};


export default function Appbar() {
  const url = process.env.REACT_APP_API_URL;
  const dispatch = useDispatch();
  const classes = useStyles();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const user = useSelector(state => state.users.user);
  const itemsInCart = useSelector(state => state.users.cart.length);
  const itemInWishList = useSelector(state => state.users.wishList.length);

  const [search, setSearch] = React.useState(null);
  const [confirmObject, setConfirmObject] = React.useState({isOpen:false});

  React.useEffect(()=>{
    if(user){
      dispatch(getCart(user._id));
      dispatch(getWishList(user._id));
    }
  },[]);

  const handleSearch = (e)=>{
    if(search !== null && search !== ''){
      if(e.key === 'Enter'){
        navigate(`/search/${search}`,{state:search});
      }
    }
  };

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMobileMenuClose = () => setMobileMoreAnchorEl(null);
  const handleMenuClose = () => { setAnchorEl(null); handleMobileMenuClose(); };
  const handleMobileMenuOpen = (event) => setMobileMoreAnchorEl(event.currentTarget);

  const logout = ()=>{
    localStorage.removeItem('sony');
    window.location = "./";
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical:'bottom', horizontal:'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical:'top', horizontal:'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      PaperProps={menuPaperProps}
    >
      {user ?
        <>
          <MenuItem onClick={()=>{ handleMenuClose(); navigate('/profile'); }}>
            My Account
          </MenuItem>
          <MenuItem
            onClick={handleMenuClose}
            onClickCapture={()=>setConfirmObject({...confirmObject,isOpen:true,title:"Logout",subtitle:'Are You Sure?',noBtn:"Cancel",yesBtn:'Logout',onConfirm:()=>logout()})}
            sx={{color:'rgba(255,90,90,0.85) !important'}}
          >
            Logout
          </MenuItem>
        </>
        :
        <MenuItem onClick={()=>{ handleMenuClose(); navigate('/signin'); }}>
          Sign In
        </MenuItem>
      }
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical:'top', horizontal:'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical:'top', horizontal:'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      PaperProps={menuPaperProps}
    >
      {user ?
        <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton size="large" color="inherit">
            <img src={url+"/"+user.image} style={{borderRadius:'50%',height:'28px',width:'28px',border:'2px solid rgba(26,106,255,0.5)'}} alt="profile" />
          </IconButton>
        </MenuItem>
        :
        <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton size="large" color="inherit"><AccountCircle /></IconButton>
        </MenuItem>
      }
      <MenuItem>
        <IconButton size="large" color="inherit">
          <Badge badgeContent={itemsInCart} color="error">
            <Link to="/cart" className={classes.mobileIconLink}>
              <ShoppingCartOutlinedIcon />
            </Link>
          </Badge>
        </IconButton>
      </MenuItem>
      <MenuItem>
        <IconButton size="large" color="inherit">
          <Badge badgeContent={itemInWishList} color="error">
            <Link to="/wish-list" className={classes.mobileIconLink}>
              <FavoriteBorderIcon />
            </Link>
          </Badge>
        </IconButton>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow:1 }}>
      <AppBar position="sticky" elevation={0}>
        <Toolbar sx={{minHeight:{xs:60,md:66},px:{xs:1.5,md:3},gap:1}}>

          <Box sx={{display:{xs:'flex',md:'none'}}}>
            <Sidenav>
              <IconButton size="small">
                <MenuIcon sx={{fontSize:'1.4rem'}} />
              </IconButton>
            </Sidenav>
          </Box>

          <Box
            onClick={()=>navigate('/')}
            sx={{cursor:'pointer',display:'flex',alignItems:'center',gap:1.25,flexShrink:0,mr:{xs:1,md:2}}}
          >
            <i className="fab fa-playstation" style={{fontSize:'1.75rem',color:'#1a6aff',lineHeight:1}} />
            <Box sx={{display:{xs:'none',sm:'block'},lineHeight:1}}>
              <Typography sx={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:'0.95rem',color:'#f0f4ff',letterSpacing:'-0.01em',lineHeight:1.15}}>
                PlayStation
              </Typography>
              <Typography sx={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:500,fontSize:'0.6rem',color:'rgba(240,244,255,0.4)',letterSpacing:'0.12em',textTransform:'uppercase',lineHeight:1}}>
                Store
              </Typography>
            </Box>
          </Box>

          <Box sx={{display:{xs:'none',md:'flex'},gap:0.25,alignItems:'center'}}>
            <NavLink to="/games" className={classes.navLink}>Games</NavLink>
            <NavLink to="/hardware" className={classes.navLink}>Hardware</NavLink>
            <NavLink to="/news" className={classes.navLink}>News</NavLink>
            <NavLink to="/services" className={classes.navLink}>Services</NavLink>
          </Box>

          <Box sx={{flexGrow:1}} />

          <Search>
            <SearchIconWrapper>
              <SearchIcon sx={{fontSize:'1.05rem'}} />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search games…"
              inputProps={{ 'aria-label':'search' }}
              onChange={(e)=>setSearch(e.target.value)}
              onKeyPress={handleSearch}
              autoComplete="off"
            />
          </Search>

          <Box sx={{display:{xs:'none',md:'flex'},alignItems:'center',gap:0.5,ml:0.5}}>
            <IconButton size="medium" sx={{color:'rgba(240,244,255,0.6)','&:hover':{color:'#f0f4ff'}}}>
              <Badge badgeContent={itemsInCart || 0} color="error">
                <Link to="/cart" style={{color:'inherit',display:'flex'}}>
                  <ShoppingCartOutlinedIcon sx={{fontSize:'1.3rem'}} />
                </Link>
              </Badge>
            </IconButton>

            <IconButton size="medium" sx={{color:'rgba(240,244,255,0.6)','&:hover':{color:'#f0f4ff'}}}>
              <Badge badgeContent={itemInWishList || 0} color="error">
                <Link to="/wish-list" style={{color:'inherit',display:'flex'}}>
                  <FavoriteBorderIcon sx={{fontSize:'1.3rem'}} />
                </Link>
              </Badge>
            </IconButton>

            {user ?
              <IconButton
                size="medium"
                edge="end"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                sx={{ml:0.25}}
              >
                <img
                  src={`${url}/${user.image}`}
                  alt="profile"
                  width="28px"
                  height="28px"
                  style={{borderRadius:'50%',border:'2px solid rgba(26,106,255,0.55)',objectFit:'cover'}}
                />
              </IconButton>
              :
              <Button
                variant="contained"
                size="small"
                onClick={()=>navigate('/signin')}
                sx={{ml:0.5,borderRadius:'8px',fontSize:'0.82rem',fontWeight:600,px:2,py:0.7,minWidth:'auto'}}
              >
                Sign In
              </Button>
            }
          </Box>

          <Box sx={{display:{xs:'flex',md:'none'}}}>
            <IconButton
              size="large"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              sx={{color:'rgba(240,244,255,0.65)'}}
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
