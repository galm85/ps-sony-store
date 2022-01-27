import {createTheme} from '@mui/material/styles';

const mainColor = "#192a56"
const secondFont = 'Quicksand ,sans-serif';
const mainFont = 'Lato, sans-serif';

export const theme = createTheme({
    colors:{
        main:'#192a56',
        light:'#273c75',
        gray:'#dcdde1',
        green:'#4cd137',
        naval:'#40739e',
        cyan:'#00a8ff'
    },
    fonts:{
        main:mainFont
    },
    fontW:{
        thin:'300',
        normal:'400',
        bold:'600',
        black:'700'
    },
    typography:{
        h1:{
            color:'#273c75',
            fontFamily:mainFont,
            fontWeight:'700'
        },
        h3:{
            color:'#273c75',
            fontFamily:mainFont,
            fontWeight:'700',
            fontSize:'40px',
           
           
        },
        h5:{
            color:'#273c75',
            fontFamily:mainFont,
            fontWeight:'300',
            fontSize:'20px',
           
           
        },
        productTitle:{
            color:'white',
            fontFamily:mainFont,
            fontWeight:'700',
            textAlign:'center'
        },
        rowLight:{
            fontFamily:mainFont,
            fontWeight:'300',
            fontSize:'1.1rem'
        },
        rowNormal:{
            fontFamily:mainFont,
            fontWeight:'400',
            fontSize:'1.1rem'

        },
        rowBold:{
            fontFamily:mainFont,
            fontWeight:'600',
            fontSize:'1.1rem'
 
        },
        rowBlack:{
            fontFamily:mainFont,
            fontWeight:'700',
            fontSize:'1.1rem',
            
            
        },
    },
    TableCell:{
        headCell:{
            fontFamily:mainFont,
           
            
        }
    },
    
})