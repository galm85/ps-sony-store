import React from 'react'
import { makeStyles } from '@mui/styles';
import { NavLink, Route, Routes } from 'react-router-dom';
import { Divider } from '@mui/material';
import {AdminCategories,AdminProducts, AdminUsers, EditCategory, EditProduct, NewCategory, NewProduct,NewAdmin,EditUser} from './index';



const useStyles = makeStyles(theme=>({
    adminContainer:{
        minHeight:'90vh',
        display:'flex'
    },
    adminNav:{
        display:"flex",
        flexDirection:'column',
        minHeight:'90vh',
        width:'15%',
        borderRight:'1px solid black',
        background:theme.colors.main
    },
    adminPage:{
        flex:1
    },
    active:{
        display:'block',
        textDecoration:'none',
        fontFamily:theme.fonts.main,
        fontSize:'1.2rem',
        fontWeight:theme.fontW.bold,
        height:'50px',
        alignItems:'center',
        padding:'10px 20px',
        color:theme.colors.green,
        transition:'all ease 0.2s',
        '&:hover':{
            background:'white',
            color:theme.colors.green
        }
    },
    nonActive:{
        display:'block',
        textDecoration:'none',
        fontFamily:theme.fonts.main,
        fontSize:'1.2rem',
        fontWeight:theme.fontW.bold,
        height:'50px',
        alignItems:'center',
        padding:'10px 20px',
        color:'white',
        transition:'all ease 0.2s',
        '&:hover':{
            background:'white',
            color:theme.colors.main
        }

        },

}));

const Dashboard = () => {

    const classes = useStyles();


    return ( 
       <div className={classes.adminContainer}>
           <div className={classes.adminNav}>
               <NavLink className={(navData)=>navData.isActive ? classes.active : classes.nonActive} to='/admin-panel/categories'>Categories</NavLink>
               <Divider/>
               <NavLink className={(navData)=>navData.isActive ? classes.active : classes.nonActive} to='/admin-panel/products'>Products</NavLink>
               <Divider/>
               <NavLink className={(navData)=>navData.isActive ? classes.active : classes.nonActive} to='/admin-panel/users'>Users</NavLink>
               <Divider/>
               <NavLink className={(navData)=>navData.isActive ? classes.active : classes.nonActive} to='/admin-panel/orders'>Orders</NavLink>
               <Divider/>
               <NavLink className={(navData)=>navData.isActive ? classes.active : classes.nonActive} to='/admin-panel/messages'>Messages</NavLink>
               <Divider/>
           </div>
            <div className={classes.adminPage}>
                <Routes>
                    <Route path="/admin-panel" element={<Dashboard/>}/>
                    <Route path="categories" element={<AdminCategories/>}/>
                    <Route path="categories/add-new-category" element={<NewCategory/>}/>
                    <Route path="categories/edit-category/:category" element={<EditCategory/>}/>
                    <Route path="products" element={<AdminProducts/>}/>
                    <Route path="products/add-new-products" element={<NewProduct/>}/>
                    <Route path="products/edit-product/:product" element={<EditProduct/>}/>
                    <Route path="users" element={<AdminUsers/>}/>
                    <Route path="users/new-admin" element={<NewAdmin/>}/>
                    <Route path="users/edit-user" element={<EditUser/>}/>
                </Routes>
            </div>

       </div>
     );
}
 
export default Dashboard;