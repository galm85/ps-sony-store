import axios from 'axios';
import {url} from '../../config.json'
import { toast } from "react-toastify";

export const getAllMessages = ()=>async(dispatch)=>{
    const res = await axios.get(`${url}/messages`);
    dispatch({
        type:'getAllMessages',
        payload:res.data
    })
}


export const addNewMessage = (message)=>async(dispatch)=>{
    const res = await axios.post(`${url}/messages`,message);
    dispatch({
        type:"addNewMessage",
        payload:message
    })
    toast.info(res.data);
    window.location = '/';
}


export const updateStatus = (messageId,status)=>async(dispatch)=>{
   
    const res = await axios.patch(`${url}/messages/update-status/${messageId}`,{status:status});
    dispatch({
        type:"updateStatus",
        payload:{messageId,status}
    })
    toast.info(res.data);
    window.location = '/admin/messages';
}