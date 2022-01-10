import {createTheme} from '@mui/material/styles';

const mainColor = "#192a56"
const mainFont = 'Quicksand ,sans-serif';

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
        main:'Quicksand'
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
        productTitle:{
            color:'white',
            fontFamily:mainFont,
            fontWeight:'700',
            textAlign:'center'
        }
    },
    TableCell:{
        headCell:{
            fontFamily:mainFont,
            
        }
    }
})