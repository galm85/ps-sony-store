import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import ShopIcon from '@mui/icons-material/Shop';
import { Container, Button, Table, TableBody, TableCell, TableHead, TableRow, TextField, Grid } from '@mui/material';
import { url } from '../config';
import ProductCard from './productCard';

export default function ProfileTab({orders,wishList}) {
  const [value, setValue] = React.useState(0);
  const [oldPassword, setOldPassword] = React.useState(null);

  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const checkPassword = ()=>{
      alert(oldPassword)
  }


  return (
      <Container >  
        <Tabs value={value} onChange={handleChange} aria-label="icon label tabs example"  >
            <Tab icon={<ShopIcon />} label="ORDERS" />
            <Tab icon={<FavoriteIcon />} label="FAVORITES" />
            <Tab icon={<PersonPinIcon />} label="Edit USer" />
        </Tabs>
        
        {/* ORDERS TAB */}
            {value === 0 &&
            <div style={{marginTop:"40px"}}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell width="20%">Date</TableCell>
                            <TableCell width="50%">Items</TableCell>
                            <TableCell width="15%">status</TableCell>
                            <TableCell width="15%">Total</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {orders && orders.map(row=>(
                        <TableRow key={row._id}>
                            <TableCell>{new Date(row.createdAt).toDateString()}</TableCell>
                            <TableCell>
                                {row.orderDetails && row.orderDetails.map(item=>(
                                    <div style={{display:'flex',marginBottom:'10px'}}>
                                        <img src={url+"/"+item.image} width="40px" alt="product image" />
                                        <div style={{marginLeft:'20px'}}>
                                            <p>{item.title}</p>
                                            <p>$ {item.price} X {item.amount} = $ {item.price*item.amount}</p>
                                        </div>
                                    </div>
                                ))}
                            </TableCell>
                            <TableCell>{row.status}</TableCell>
                            <TableCell>$ {row.totalPrice}</TableCell>
                        </TableRow>   
                    ))}
                    </TableBody>
                </Table>
            </div>
            }
        {/* END ORDERS TAB */}

        {/* WISH LIST TAB */}
            {value === 1 &&
            <div style={{marginTop:"40px"}}>
                <Grid container>
                    {wishList && wishList.map((item,index)=>(
                    <ProductCard key={index} product={item} fromWishList={true}/>
                    ))}
                    {(wishList && wishList.length === 0 ) && <h2><i>No Favorite products</i></h2>}
                </Grid>
            </div>
            }
        {/* END WISH LIST TAB */}



            {value === 2 &&
            <div style={{marginTop:"40px",width:'100%'}}>
                <TextField style={{width:'50%',margin:'auto'}} id="outlined-basic" label="Old Password" type="password"  variant="standard" onChange={(e)=>setOldPassword(e.target.value)} />
                <Button variant='contained'onClick={()=>checkPassword()}>Change</Button>
            </div>
            }
        </Container>
  );
}
