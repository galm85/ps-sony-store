import axios from 'axios';
import {url} from '../../config.json';
import { toast } from "react-toastify";


export const getAllOrders = ()=>async(dispatch)=>{
    const res = await axios.get(`${url}/orders`);
    dispatch({
        type:'getAllOrders',
        payload:res.data
    })
}

export const addNewOrder = (order)=>async(dispatch)=>{
    const res = await axios.post(`${url}/orders`,order);
    toast.info(res.data);

}

export const getOrdersByUser = (userId)=>async(dispatch)=>{
    const res = await axios.get(`${url}/orders/profile/${userId}`);
    dispatch({
        type:'getOrdersByUser',
        payload:res.data
    })
}


export const updateOrderStatus = (orderId,status)=>async(dispatch)=>{
    const res = await axios.patch(`${url}/orders/update-status/${orderId}`,{status:status});
    toast.info(res.data);
    window.location="/admin/orders";
}