import { Container, FormGroup, Grid, Typography,TextField, InputLabel,Select,MenuItem, Button, Divider } from '@mui/material';
import * as React from 'react';
import PageHeader from '../components/pageHeader';
import { makeStyles } from '@mui/styles';
import {useDispatch} from 'react-redux';
import { addNewMessage } from '../redux/actions/messagesActions';


const useStyles = makeStyles(theme=>({
    container:{margin:'20px auto'},
    formRow:{margin:'10px 0'}
}))


const Support = () => {

    const [message,setMessage] = React.useState({});
    const classes = useStyles();
    const dispatch = useDispatch();

    const handleChange = (e)=>{
        setMessage({...message,[e.target.name]:e.target.value});
    }

    const handleSubmit = (e)=>{
        e.preventDefault();

        const data = {};
        data.name = message.name;
        data.email = message.email;
        data.phone = message.phone;
        if(message.subject === 'Other'){
            data.subject = message.customeSubject;
        }else{
            data.subject = message.subject;
        }
        data.message = message.message;

       dispatch(addNewMessage(data));
    }

    return ( 

        <>
        <PageHeader title='SUPPORT' image="supportBanner.png"/>
        <Container className={classes.container} >
            <Typography align='center' variant='h3'>What Can We Do For You?</Typography>
            <Grid container>
                <Grid item sm={12} md={6} style={{margin:'0 auto'}}>
                    <form onSubmit={handleSubmit}>
                        
                        <FormGroup className={classes.formRow}>
                            <TextField id="outlined-basic" label="Full Name" variant="standard" name="name" onChange={handleChange} />
                        </FormGroup>
                        
                        <FormGroup className={classes.formRow}>
                            <TextField id="outlined-basic" label="Email" variant="standard" name="email" onChange={handleChange} />
                        </FormGroup>
                        
                        <FormGroup className={classes.formRow}>
                            <TextField id="outlined-basic" label="Phone" variant="standard" name="phone" onChange={handleChange} />
                        </FormGroup>

                        <Divider style={{margin:'40px 0'}}/>
                        
                        <FormGroup className={classes.formRow}>
                            <InputLabel id="demo-simple-select-label">Subject</InputLabel>
                            <Grid container style={{display:'flex',justifyContent:'space-between'}}>
                                <Grid item sm={5}>
                                    <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={message.subject}
                                    label="Subject"
                                    onChange={handleChange}
                                    name='subject'
                                    fullWidth
                                >
                                    <MenuItem value={'Account'}>Account</MenuItem>
                                    <MenuItem value={'Store & refound'}>Store & refound</MenuItem>
                                    <MenuItem value={'Hardware & Repair'}>Hardware & Repair</MenuItem>
                                    <MenuItem value={'Other'}>Other</MenuItem>
                                    </Select>
                                </Grid>

                                {message.subject === 'Other' &&
                                <Grid item sm={6}>
                                    <TextField fullWidth id="outlined-basic" label="Subject" variant="filled" name="customeSubject" onChange={handleChange} />   
                                </Grid>
                                }
                            </Grid> 
                        </FormGroup>

                        

                        <FormGroup className={classes.formRow}>
                            <TextField  multiline rows={5} id="outlined-basic" label="Message" variant="outlined" name="message" onChange={handleChange} />
                        </FormGroup>

                       <div style={{margin:"20px 0",textAlign:'center'}}>

                        <Button type="submit" variant="contained" >SEND</Button>
                       </div>

                       

                    </form>
                </Grid>
            </Grid>
        </Container>

        </>
     );
}
 
export default Support ;