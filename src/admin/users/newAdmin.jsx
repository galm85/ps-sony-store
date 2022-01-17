import * as React from 'react';
import {Avatar,Button,Divider,CssBaseline,TextField,FormControlLabel,Checkbox,Link,Grid,Box,Typography,Container,Input} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CancelIcon from '@mui/icons-material/Cancel';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useDispatch} from 'react-redux';
import {registerUser} from '../../redux/actions/usersActions'

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function NewAdmin() {
    
    const dispatch = useDispatch();
    const [image,setImage] = React.useState(null);
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        data.append('role','admin');
        console.log({
        email: data.get('email'),
        password: data.get('password'),
        image:data.get('image'),
        role:data.get('role'),
        });

        dispatch(registerUser(data,true));

        
    };

    const goBack = ()=>{
      if(window.confirm("Leave This Page? Changes will NOT save")){
        window.location = '/admin-panel/users'
      }
    }


    const handleImage = (e)=>{
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (e)=>{
        
        setImage(e.target.result);
    }
    }

  return (
    <ThemeProvider theme={theme} >
      <Button onClick={()=>goBack()} color='error' variant="contained" style={{margin:'10px 10px',position:'absolute',right:'20px'}}><CancelIcon/></Button>
      <Container component="main" maxWidth="xs" >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            

          }}
          
        >
          
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            New Admin
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
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
                <img src={image} alt="user image"  width="200px"/>
            </Grid>

            }
              
            </Grid>

            
            <div style={{minHeight:'1px',background:'light-gray',marginTop:'20px'}}></div>
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add Admin
            </Button>
            
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
