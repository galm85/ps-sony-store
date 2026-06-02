import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useDispatch} from 'react-redux';
import { signInUser } from '../redux/actions/usersActions';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://galwebdev.com/">
        GalWebDev.com
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme({
    palette:{
        mode:'dark',
        primary:{main:'#0067dd',light:'#3399ff'},
        background:{default:'#0e1117',paper:'#1a1f2e'},
        text:{primary:'#eef2ff',secondary:'#a8b8d8'},
    },
    shape:{borderRadius:12},
    typography:{
        fontFamily:"'Inter', sans-serif",
        h5:{fontFamily:"'Space Grotesk', 'Inter', sans-serif",fontWeight:600,color:'#eef2ff'},
        body2:{color:'#a8b8d8'},
    },
    components:{
        MuiOutlinedInput:{
            styleOverrides:{
                root:{
                    '& .MuiOutlinedInput-notchedOutline':{borderColor:'rgba(255,255,255,0.2)'},
                    '&:hover .MuiOutlinedInput-notchedOutline':{borderColor:'rgba(255,255,255,0.4)'},
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline':{borderColor:'#0067dd'},
                    '& .MuiInputBase-input':{color:'#eef2ff'},
                },
            },
        },
        MuiInputLabel:{
            styleOverrides:{
                root:{color:'#8090b8','&.Mui-focused':{color:'#3399ff'}},
            },
        },
        MuiFormControlLabel:{
            styleOverrides:{
                label:{color:'#a8b8d8',fontSize:'0.9rem'},
            },
        },
        MuiLink:{
            styleOverrides:{
                root:{color:'#3399ff','&:hover':{color:'#66b3ff'}},
            },
        },
        MuiButton:{
            styleOverrides:{
                root:{fontFamily:"'Space Grotesk', 'Inter', sans-serif",fontWeight:600},
            },
        },
    },
});


export default function Signin() {

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    // console.log({
    //   email: data.get('email'),
    //   password: data.get('password'),
    // });
    const user = {email:data.get('email'),password:data.get('password')}
    console.log(user);
    dispatch(signInUser(user));

  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            marginBottom: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background:'#1a1f2e',
            padding:'40px 32px',
            borderRadius:'16px',
            border:'1px solid rgba(255,255,255,0.06)',
            boxShadow:'0 8px 32px rgba(0,0,0,0.5)',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
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
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, borderRadius:'50px', padding:'12px', textTransform:'none', fontWeight:700, fontSize:'1rem' }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
