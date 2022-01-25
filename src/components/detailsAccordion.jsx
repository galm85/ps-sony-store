import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Divider } from '@mui/material';


export default function DetailsAccordion({data}) {

    
    return (
    <div>
        {data && data.map(row=>(

    
      <Accordion>
        
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography variant="rowBlack" style={{fontSize:'1.1rem'}}>{row.title}</Typography>
        </AccordionSummary>
        
        <AccordionDetails style={{display:'flex',flexDirection:'column'}}>
            <div style={{display:'flex',justifyContent:'space-between'}}>
                <Typography variant='rowNormal'> {row.author} </Typography>
                {row.createdAt ? <Typography variant='rowLight'>{new Date(row.createdAt).toDateString()} </Typography>
                               : <Typography variant='rowLight'>Just Posted </Typography>
                }
            </div>
            <Divider style={{margin:'5px 0'}}/>
            <Typography variant="rowLight" style={{marginTop:"10px"}}>{row.body}</Typography>
        </AccordionDetails>

      </Accordion>
          ))}
    </div>
  );
}
