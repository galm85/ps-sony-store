import { Container, Divider, Grid, Select, Typography,MenuItem,FormControl,InputLabel,Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { readMessage, updateStatus } from '../../redux/actions/messagesActions';


const useStyles = makeStyles(theme=>({
    container:{margin:'30px 0'},
    data:{},
    message:{padding:'0 50px'}
}))


export default function SingleMessage(){

    const classes = useStyles();
    const location = useLocation();
    const [message,setMessage] = React.useState({...location.state});
    const dispatch = useDispatch();

    React.useEffect(()=>{
        dispatch(readMessage(message._id,1));
    },[])

    const handleChange = e=>{
        setMessage({...message,status:e.target.value});
    }


    return(

        <Container className={classes.container} >
            <Grid container >
                <Grid item sm={12} md={6} className={classes.data}>
                    <Typography variant='h6'>Name: {message.name}</Typography>
                    <Typography variant='h6'>Email: {message.email}</Typography>
                    <Typography variant='h6'>Phone: {message.phone}</Typography>
                </Grid>

                <Divider orientation='vertical'  />

                <Grid item sm={12} md={4} >
                    <Grid container style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                        <Grid item sm={8}>
                            <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Status</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={message.status}
                                    label="Age"
                                    onChange={handleChange}
                                    >
                                    <MenuItem value={'new'}>New</MenuItem>
                                    <MenuItem value={'In Procces'}>In Procces</MenuItem>
                                    <MenuItem value={'Done'}>Done</MenuItem>
                                    <MenuItem value={'Canceled'}>Canceled</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item sm={2}>
                            <Button  variant='contained' onClick={()=>dispatch(updateStatus(message._id,message.status))}>Update</Button>
                        </Grid>
                    </Grid>
                    
                </Grid>


            </Grid>

            <Divider style={{margin:'40px 0'}}/>

            <Grid container>
                <Grid item sm={12}>
                    <Typography variant="h6">{message.subject}</Typography>
                </Grid>
                <Grid item sm={12}>
                    <Typography variant="body1">{message.message}</Typography>
                </Grid>
            </Grid>
        </Container>
       
    )

}
