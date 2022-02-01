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
                <img className={classes.imageBanner}  src="./images/psplus.png" alt="ps plus banner" />
            </div>
            <Container>
                <Grid container style={{margin:'40px 0'}}>
                    <Typography variant="h3">Welcome to PlayStation Plus</Typography>
                    <Typography variant="h5">Enhance your PlayStation experience with online multiplayer, monthly games, exclusive discounts and more.</Typography>
                </Grid>
                <Grid container style={{display:'flex',justifyContent:'space-between',margin:'50px 0'}}>
                    <Grid item sm={12} md={3}>
                        <img width="100%" src="./images/pspluslogo.png" alt="ps plus logo" />
                        <div style={{textAlign:'center'}}>
                            <Typography variant="h3">12 MONTHS</Typography>
                            <Typography variant="h5">$244</Typography>
                        </div>
                    </Grid>
                    <Grid item sm={12} md={3} style={{textAlign:'center'}}>
                        <img width="100%" src="./images/pspluslogo.png" alt="ps plus logo" />
                        <div>
                            <Typography variant="h3">3 MONTHS</Typography>
                            <Typography variant="h5">$110</Typography>
                        </div>
                    </Grid>
                    <Grid item sm={12} md={3} style={{textAlign:'center'}}>
                        <img width="100%" src="./images/pspluslogo.png" alt="ps plus logo" />
                        <div>
                            <Typography variant="h3">1 MONTH</Typography>
                            <Typography variant="h5">$40</Typography>
                        </div>
                    </Grid>
                </Grid>

            </Container>

           
           <div className={classes.sectionContainer}>
                <img className={classes.sectionImage} src="./images/montlygames.png" alt=" ps plus free games" />
                <div className={classes.sectionData}>
                <h2>Montly Games </h2>
                <MyModal 
                    title="PS Plus - Montly Games" 
                    text="Choose a one, three or 12-month recurring payment plan1 and take your PlayStation experience to the next level. Choose to pay annually and you'll save 40% compared to paying monthly, and 37% compared to the three-month membership plan2.
                    Subscription continues until cancelled. See PS Plus Terms for details on price changes and how to cancel.
                    Expand your game collection with new PS4 games each month, as well as regularly added PS5 titles. All PlayStation Plus monthly games are playable on PS5 and yours to keep as long as you're a member. Build your collection with blockbuster hits, indie gems and multiplayer party games to play online or at home with family and friends.
                    " 
                    
                    btn="Read More"/>

                </div>
           </div>
           
           <div className={classes.sectionContainer} style={{marginTop:'100px'}}>
                <img className={classes.sectionImage} src="./images/psnowbanner.png" alt=" ps plus free games" />
                <div style={{position:'absolute',bottom:'20%',left:'40px'}}>
                    <MyModal 
                        title="PS NOW" 
                        text="Hundreds of incredible games on demand - 
                        Get instant access to a huge collection of PS4, PS3 and PS2 games on PS5, PS4 or Windows PC, with new games added every month.Join PS Now to dive straight into blockbuster hits, PlayStation exclusives, quirky indies and family-friendly adventures from an on-demand library that’s updated every month, bringing you a fresh batch of games to enjoy.Stream hundreds of PS4, PS3 and PS2 titles from a wide range of genres to your PS5, PS4 or Windows PC. Play as much as you like, save your progress, and continue playing on either device. Or pick from over 300 PS4 games to download to your console and they’ll be ready to play, in up to 4K resolution if you’re playing on PS5 or PS4 Pro.

                        Whether you stream or download, your PS Now subscription includes full access to all available online multiplayer modes.
                        " 
                        btn="Read More"/>
                </div>
           </div>
           
         
            
            </>
            


     );
}
 
export default Services;