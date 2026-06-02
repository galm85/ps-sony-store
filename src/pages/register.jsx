import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {Input} from '@mui/material';
import {useDispatch,useSelector} from 'react-redux';
import { registerUser } from '../redux/actions/usersActions';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';


export default function Register() {
  const dispatch = useDispatch();
  const [image, setImage] = React.useState(null);
  const user = useSelector(state => state.users.user);

  React.useEffect(()=>{
    if(user){ window.location = '/'; }
  },[user]);

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
    reader.onload = (e)=>{ setImage(e.target.result); };
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{
        marginTop:{xs:5,md:8},
        marginBottom:6,
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        background:'#0e1829',
        padding:{xs:'32px 24px',md:'44px 40px'},
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
          <AccountCircleOutlinedIcon sx={{color:'#1a6aff',fontSize:'1.35rem'}} />
        </Avatar>

        <Typography sx={{
          fontFamily:"'Space Grotesk',sans-serif",
          fontWeight:700,
          fontSize:'1.55rem',
          color:'#f0f4ff',
          letterSpacing:'-0.02em',
          mt:1,
          mb:0.5,
        }}>
          Create account
        </Typography>
        <Typography sx={{color:'rgba(240,244,255,0.4)',fontSize:'0.85rem',fontFamily:"'Inter',sans-serif",mb:3}}>
          Join the PlayStation community
        </Typography>

        <Box component="form" noValidate onSubmit={handleSubmit} sx={{width:'100%'}}>
          <Grid container spacing={1.5}>
            <Grid item xs={12} sm={6}>
              <TextField autoComplete="firstName" name="firstName" required fullWidth id="firstName" label="First Name" autoFocus />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField required fullWidth id="lastName" label="Last Name" name="lastName" autoComplete="family-name" />
            </Grid>
            <Grid item xs={12}>
              <TextField required fullWidth id="email" label="Email Address" name="email" autoComplete="email" />
            </Grid>
            <Grid item xs={12}>
              <TextField required fullWidth name="password" label="Password" type="password" id="password" autoComplete="new-password" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField required fullWidth id="phone" label="Phone" name="phone" autoComplete="phone" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField required fullWidth id="state" label="State" name="state" autoComplete="state" />
            </Grid>
            <Grid item xs={12}>
              <TextField required fullWidth id="address" label="Address" name="address" autoComplete="address" />
            </Grid>

            <Grid item xs={12} sx={{textAlign:'center',mt:0.5}}>
              <label htmlFor="contained-button-file">
                <Input
                  accept="image/*"
                  id="contained-button-file"
                  name="image"
                  multiple
                  type="file"
                  sx={{display:'none'}}
                  onChange={handleImage}
                />
                <Button
                  variant="outlined"
                  component="span"
                  sx={{borderRadius:'10px',fontSize:'0.85rem',borderColor:'rgba(0,63,207,0.4)',color:'#1a6aff','&:hover':{borderColor:'#1a6aff',background:'rgba(0,63,207,0.08)'}}}
                >
                  {image ? 'Change Photo' : 'Upload Profile Photo'}
                </Button>
              </label>
            </Grid>

            {image &&
              <Grid item xs={12} sx={{textAlign:'center'}}>
                <img
                  src={image}
                  alt="preview"
                  width="80px"
                  height="80px"
                  style={{borderRadius:'50%',objectFit:'cover',border:'2px solid rgba(26,106,255,0.5)'}}
                />
              </Grid>
            }

            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive promotions and updates via email."
                sx={{'& .MuiFormControlLabel-label':{fontSize:'0.8rem'}}}
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{mt:3,mb:2,borderRadius:'12px',py:1.5,fontWeight:700,fontSize:'1rem'}}
          >
            Create Account
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              <Link href="/signin" variant="body2" sx={{fontSize:'0.83rem'}}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Typography variant="body2" align="center" sx={{mt:2,mb:4,color:'rgba(240,244,255,0.2)',fontSize:'0.75rem'}}>
        © {new Date().getFullYear()}{' '}
        <Link color="inherit" href="https://galwebdev.com/" sx={{color:'rgba(77,139,255,0.6)'}}>
          GWD
        </Link>
      </Typography>
    </Container>
  );
}
