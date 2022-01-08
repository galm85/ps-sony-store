import axios from 'axios';
import {url} from '../../config';
import jwtDecode from "jwt-decode";
// import { toast } from "react-toastify";


export const getAllUsers = ()=>async(dispatch)=>{
    const users = await axios.get(`${url}/users`);
    dispatch({
        type:'getAllUsers',
        payload:users.data
    })
}


export const registerUser = (user)=>async(dispatch)=>{
    try{
        const res = await axios.post(`${url}/users`,user);
        dispatch({
            type:'registerUser',
            payload:user
        })
        // toast.info(res.data);
        window.location = '/';
    }catch(error){
        if(error.response && error.response.data){
            // toast.error(error.response.data);
        }
    }
}

export const signInUser = (user)=>async(dispatch)=>{
    try{
        const res = await axios.post(`${url}/users/sign-in`,user);
        const signUser = await jwtDecode(res.data);
        localStorage.setItem('sony',res.data);
        dispatch({
            type:'signInUser',
            payload:signUser
        });
        window.location = '/';
        // toast.info('welcome back ' + signUser.firstName);

    }catch(error){
        if(error.response && error.response.data){
        //  toast.error(error.response.data);
        }
    }
}

export const updateUser = (user,userId)=>async(dispatch)=>{
    try{
        const res = await axios.patch(`${url}/users/update-user/${userId}`,user);
        
    }catch(error){

    }
}


export const getUserData = (userId) =>async(dispatch)=>{
    try {
        const {data} = await axios.get(`${url}/users/profile/${userId}`);
        dispatch({
            type:'getUserData',
            payload:data
        })
    } catch (error) {
        console.log(error);
    }
}


export const deleteUser = (userId)=>async(dispatch)=>{
    console.log(userId);
    try {
        const {data} = await axios.delete(`${url}/users/delete-user/${userId}`);
        dispatch({
            type:"deleteUser",
            payload:userId
        })
        // toast.error(`${data.firstName} deleted`);
    } catch (error) {
        console.log(error)
    }
}


// Cart //////////////////////////

export const getCart = (userId)=>async(dispatch)=>{
    const res = await axios.get(`${url}/users/cart/${userId}`);
    
    const calculate = ()=>{
        let totalPrice=0;
        for(let item of res.data){
            totalPrice += (item.price*item.amount);
        }
        return totalPrice.toFixed(2);
    }
    let total = await calculate()
    dispatch({
        type:'getCart',
        payload:{cart:res.data,totalPrice:total}
    })
}


export const addToCart = (userId,product,amount) => async(dispatch)=>{
    
    try {
        const res = await axios.patch(`${url}/users/cart/add-to-cart/${userId}`,{productId:product._id,amount:amount});
        dispatch({
            type:'addNewItem',
            payload:res.data.cart
        })
        // toast.info(res.data.message);
    } catch (error) {
        
    }
}


export const removeItemFromCart = (userId,productId)=>async(dispatch)=>{
    try {
        const res = await axios.patch(`${url}/users/cart/remove-item/${userId}`,{productId});
        
        dispatch({
            type:'removeItemFromCart',
            payload:res.data.cart
        })
    } catch (error) {
        
    }
}


export const updateItemAmount = (userId,productId,op)=>async(dispatch)=>{
    try {
        const res = await axios.patch(`${url}/users/cart/update-amount/${userId}`,{op,productId});
        dispatch({
            type:'updateItemAmount',
            payload:res.data.cart
        })
    } catch (error) {
        
    }
}


export const clearCart = (userId)=>async(dispatch)=>{
    console.log('action');
    const res = await axios.patch(`${url}/users/cart/clear-cart/${userId}`);
    dispatch({
        type:'clearCart'
    })
}


// Wish List /////////////////////

export const getWishList = (userId)=>async(dispatch)=>{
    const res = await axios.get(`${url}/users/wish-list/${userId}`);
    dispatch({
        type:'getWishList',
        payload:res.data
    })

}


export const addToWishList = (userId,productId)=>async(dispatch)=>{
    const res = await axios.patch(`${url}/users/wish-list/add/${userId}`,{productId});
    dispatch({
        type:'addToWishList',
        payload:res.data.wishList
    })
    // toast.info(res.data.message);
    
}

export const removeFromWishList = (userId,productId)=>async(dispatch)=>{
    const res = await axios.patch(`${url}/users/wish-list/remove/${userId}`,{productId});
    dispatch({
        type:'removeFromWishList',
        payload:res.data.wishList
    })
    // toast.error(res.data.message);

}