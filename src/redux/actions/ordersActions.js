import axios from 'axios';
import {url} from '../../config';
// import { toast } from "react-toastify";


export const getAllOrders = ()=>async(dispatch)=>{
    const res = await axios.get(`${url}/orders`);
    dispatch({
        type:'getAllOrders',
        payload:res.data
    })
}

export const addNewOrder = (order)=>async(dispatch)=>{
    try{

        const res = await axios.post(`${url}/orders`,order);
        // toast.info(res.data);
        alert(res.data);
    }catch(err){
        console.log(err.response.data);
    }
    
     window.location = '/';

}

export const getOrdersByUser = (userId)=>async(dispatch)=>{
    const res = await axios.get(`${url}/orders/profile/${userId}`);
    dispatch({
        type:'getOrdersByUser',
        payload:res.data
    })
}


export const updateOrderStatus = (orderId,status)=>async(dispatch)=>{
    try{
        const res = await axios.patch(`${url}/orders/update-status/${orderId}`,{status:status});
        alert(res.data);
    }catch(err){
        alert(err.response.data);
    }
    
}



export const getOrderByEmailSearch = (email)=>async(dispatch)=>{
    try{
        const res = await axios.get(`${url}/orders/search/${email}`);
        dispatch({
            type:'searchByEmail',
            payload:res.data
        })
    }catch(err){
        console.log(err)
    }
}

export const getOrderById = (orderId)=>async(dispatch)=>{
    try{
        const res = await axios.get(`${url}/orders/search-by-id/${orderId}`);
        dispatch({
            type:'searchById',
            payload:res.data
        })
    }catch(err){
        console.log(err)
    }
}


export const deleteOrder = (orderId)=>async(dispatch)=>{
    if(window.confirm('Delete this Order?')){

        try{
            const res = await axios.delete(`${url}/orders/delete-order/${orderId}`);
            dispatch({
                type:'deleteOrder',
                payload:orderId
            })
            alert('Order Deleted')
        }catch(err){
            console.log(err.response.data);
        }
    }
}