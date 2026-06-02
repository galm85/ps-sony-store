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
        mode:'light',
        primary:{main:'#003791',light:'#0058cc',contrastText:'#ffffff'},
        background:{default:'#f5f7fb',paper:'#ffffff'},
        text:{primary:'#0d1b3e',secondary:'#6b7a99'},
    },
    shape:{borderRadius:12},
    typography:{
        fontFamily:"'Inter', sans-serif",
        h5:{fontFamily:"'Space Grotesk', 'Inter', sans-serif",fontWeight:600,color:'#0d1b3e'},
        body2:{color:'#6b7a99'},
    },
    components:{
        MuiOutlinedInput:{
            styleOverrides:{
                root:{
                    backgroundColor:'#ffffff',
                    '& .MuiOutlinedInput-notchedOutline':{borderColor:'#d0d8ea'},
                    '&:hover .MuiOutlinedInput-notchedOutline':{borderColor:'#003791'},
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline':{borderColor:'#003791'},
                    '& .MuiInputBase-input':{color:'#0d1b3e'},
                },
            },
        },
        MuiInputLabel:{
            styleOverrides:{
                root:{color:'#6b7a99','&.Mui-focused':{color:'#003791'}},
            },
        },
        MuiFormControlLabel:{
            styleOverrides:{
                label:{color:'#2c3e6a',fontSize:'0.9rem'},
            },
        },
        MuiLink:{
            styleOverrides:{
                root:{color:'#003791','&:hover':{color:'#0058cc'}},
            },
        },
        MuiButton:{
            styleOverrides:{
                root:{fontFamily:"'Space Grotesk', 'Inter', sans-serif",fontWeight:600,textTransform:'none'},
                contained:{boxShadow:'none','&:hover':{boxShadow:'0 4px 16px rgba(0,55,145,0.25)'}},
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
            background:'#ffffff',
            padding:'40px 36px',
            borderRadius:'20px',
            border:'1px solid #e8edf5',
            boxShadow:'0 4px 24px rgba(13,27,62,0.08)',
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
