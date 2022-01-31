import { Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';



const useState = makeStyles(theme=>({

    container:{width:'100%',height:'100vh',display:'flex',flexDirection:'column',alignItems:'center',paddingTop:'15vh',fontFamily:theme.fonts.main,
        "& h1":{fontSize:'3rem',fontWeight:theme.fontW.black,marginBottom:'20px',color:theme.colors.main},
        "& h3":{fontSize:'1.5rem',fontWeight:theme.fontW.thin,marginBottom:'20px',color:theme.colors.naval},
    },
    profile:{
        fontWeight:theme.fontW.bold,
        color:theme.colors.secondary
    },
    logo:{
        fontSize:'6rem',
        marginBottom:'50px',
        color:theme.colors.main
    }


}))

const OrderAccepted = () => {

    const classes = useState();

    return ( 
       <div className={classes.container}>

            <i className={`fab fa-playstation ` + classes.logo}></i>
            <h1>THANK YOU For Your Order</h1>
            <h3>We have Just got it and we are working to deliver it to you as soon as possible</h3>
            <h3>You can See All Your orders And their stauts in Your <Link className={classes.profile} to={'/profile'}>account page</Link> </h3>
            
            <Link style={{textDecoration:'none',marginTop:'20px'}} to="/"><Button variant='contained'>Back To Site</Button></Link>

       </div>
     );
}
 
export default OrderAccepted;