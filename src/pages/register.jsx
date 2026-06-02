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
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {Input} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useDispatch,useSelector} from 'react-redux';
import { registerUser } from '../redux/actions/usersActions';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://www.galwd.com/" >
        GWD
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

export default function Register() {
    
    const dispatch = useDispatch();
    const [image,setImage] = React.useState(null);
    const user = useSelector(state=>state.users.user);
    

    React.useEffect(()=>{
      if(user){
        window.location = '/';
      }
    },[])

    
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        data.append('role','user');
        
        dispatch(registerUser(data));
    };


    const handleImage = (e)=>{
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (e)=>{
        
        setImage(e.target.result);
    }
    }

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
            <AccountCircleIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="firstName"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phone"
                  label="Phone"
                  name="phone"
                  autoComplete="phone"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="address"
                  label="Address"
                  name="address"
                  autoComplete="address"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="state"
                  label="State"
                  name="state"
                  autoComplete="state"
                />
              </Grid>
            <Grid item xs={12} style={{textAlign:'center'}}>
                <label htmlFor="contained-button-file">
                    <Input accept="image/*" id="contained-button-file" name="image" multiple type="file" style={{display:'none'}} onChange={handleImage} />
                    <Button variant="contained" component="span">
                        Upload Image
                    </Button>
                </label>
            </Grid>

            {image && 
            <Grid item xs={12} style={{textAlign:'center'}}>
                <img src={image} alt="user"  width="200px"/>
            </Grid>

            }
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>

            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, borderRadius:'50px', padding:'12px', textTransform:'none', fontWeight:700, fontSize:'1rem' }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
