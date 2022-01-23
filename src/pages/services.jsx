import * as React from 'react';
import {Button, Container, Grid, Modal, Typography} from '@mui/material';
import { makeStyles } from '@mui/styles';
import MyModal from '../components/myModal';


const useStyles = makeStyles(theme=>({
    containerBanner:{width:'100%',position:'relative'},
    imageBanner:{width:'100%'},
    sectionContainer:{ width:'100%', position:'relative'},
    sectionImage:{ width:'100%'},
    sectionData:{ 
        position:'absolute',
        zIndex:2,top:'100px',
        left:'10%',
        fontFamily:theme.fonts.main,
        fontW:'black',
        fontSize:'3rem'
        ,color:theme.colors.main,
    },
}))

const Services = () => {


    const montlyGames = {title:"montlyGames",article:"Choose a one, three or 12-month recurring payment plan1 and take your PlayStation experience to the next level Choose to pay annually and you'll save 40% compared to paying monthly, and 37% compared to the three-month membership plan2."
}

    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return ( 
            <>
            <div className={classes.containerBanner}>
                <img className={classes.imageBanner}  src="/images/psplus.png" alt="ps plus banner" />
            </div>
            <Container>
                <Grid container style={{margin:'40px 0'}}>
                    <Typography variant="h3">Welcome to PlayStation Plus</Typography>
                    <Typography variant="h5">Enhance your PlayStation experience with online multiplayer, monthly games, exclusive discounts and more.</Typography>
                </Grid>
                <Grid container style={{display:'flex',justifyContent:'space-between',margin:'50px 0'}}>
                    <Grid item sm={12} md={3}>
                        <img width="100%" src="/images/pspluslogo.png" alt="ps plus logo" />
                        <div style={{textAlign:'center'}}>
                            <Typography variant="h3">12 MONTHS</Typography>
                            <Typography variant="h5">$244</Typography>
                        </div>
                    </Grid>
                    <Grid item sm={12} md={3} style={{textAlign:'center'}}>
                        <img width="100%" src="/images/pspluslogo.png" alt="ps plus logo" />
                        <div>
                            <Typography variant="h3">3 MONTHS</Typography>
                            <Typography variant="h5">$110</Typography>
                        </div>
                    </Grid>
                    <Grid item sm={12} md={3} style={{textAlign:'center'}}>
                        <img width="100%" src="/images/pspluslogo.png" alt="ps plus logo" />
                        <div>
                            <Typography variant="h3">1 MONTH</Typography>
                            <Typography variant="h5">$40</Typography>
                        </div>
                    </Grid>
                </Grid>

            </Container>

           
           <div className={classes.sectionContainer}>
                <img className={classes.sectionImage} src="/images/montlygames.png" alt=" ps plus free games" />
                <div className={classes.sectionData}>
                <h2>Montly Games </h2>
                <MyModal title={montlyGames.title} text={montlyGames.article} btn="Read More"/>

                </div>
           </div>
           
           <div className={classes.sectionContainer} style={{marginTop:'100px'}}>
                <img className={classes.sectionImage} src="/images/psnowbanner.png" alt=" ps plus free games" />
                <div style={{position:'absolute',bottom:'20%',left:'40px'}}>
                    <MyModal title="PS NOW" text="lshdljasd asdlas dlnas ldnasln das d" btn="Read More"/>
                </div>
           </div>
           
         
            
            </>
            


     );
}
 
export default Services;