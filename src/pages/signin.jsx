import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {useDispatch} from 'react-redux';
import { signInUser } from '../redux/actions/usersActions';


export default function Signin() {
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const user = {email:data.get('email'), password:data.get('password')};
    dispatch(signInUser(user));
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{
        marginTop:{xs:6,md:10},
        marginBottom:6,
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        background:'#0e1829',
        padding:{xs:'32px 24px',md:'48px 44px'},
        borderRadius:'20px',
        border:'1px solid rgba(255,255,255,0.08)',
        boxShadow:'0 24px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)',
      }}>
        <Avatar sx={{
          m:1,
          bgcolor:'transparent',
          border:'2px solid rgba(0,63,207,0.5)',
          width:48,
          height:48,
          background:'linear-gradient(135deg, rgba(0,63,207,0.2), rgba(26,106,255,0.15))',
        }}>
          <LockOutlinedIcon sx={{color:'#1a6aff',fontSize:'1.3rem'}} />
        </Avatar>

        <Typography component="h1" sx={{
          fontFamily:"'Space Grotesk', sans-serif",
          fontWeight:700,
          fontSize:'1.6rem',
          color:'#f0f4ff',
          letterSpacing:'-0.02em',
          mt:1,
          mb:0.5,
        }}>
          Welcome back
        </Typography>
        <Typography sx={{
          color:'rgba(240,244,255,0.4)',
          fontSize:'0.85rem',
          fontFamily:"'Inter', sans-serif",
          mb:3,
        }}>
          Sign in to your PlayStation account
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{width:'100%'}}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            variant="outlined"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            variant="outlined"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
            sx={{mt:0.5}}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt:2.5,
              mb:2.5,
              borderRadius:'12px',
              py:1.5,
              fontWeight:700,
              fontSize:'1rem',
              letterSpacing:'0.01em',
            }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2" sx={{fontSize:'0.82rem'}}>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2" sx={{fontSize:'0.82rem'}}>
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Typography variant="body2" align="center" sx={{mt:2,mb:4,color:'rgba(240,244,255,0.2)',fontSize:'0.75rem'}}>
        © {new Date().getFullYear()}{' '}
        <Link color="inherit" href="https://galwebdev.com/" sx={{color:'rgba(77,139,255,0.6)'}}>
          GalWebDev.com
        </Link>
      </Typography>
    </Container>
  );
}
