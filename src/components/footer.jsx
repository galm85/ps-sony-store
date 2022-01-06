import React from 'react'
import {makeStyles} from '@mui/styles';
import { height, lineHeight } from '@mui/system';


const useStyles = makeStyles(theme=>({

    footer:{
        background:theme.colors.light,
        height:'5vh',

    },
    para:{
        textAlign:'center',
        lineHeight:'3',
        fontFamily:theme.fonts.main,
        color:'white',
        fontWeight:theme.fontW.black
    }

}))

const Footer = () => {

    const classes = useStyles();

    return ( 
        <div className={classes.footer}>
            <p className={classes.para}>Gal Mizrahi</p>
        </div>
     );
}
 
export default Footer;