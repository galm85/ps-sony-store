import axios from 'axios';
// import {url} from '../../config'
import { toast } from "react-toastify";
const url = process.env.REACT_APP_API_URL;




export const getAllMessages = ()=>async(dispatch)=>{
    const res = await axios.get(`${url}/messages`);
    dispatch({
        type:'getAllMessages',
        payload:res.data
    })
}


export const addNewMessage = (message)=>async(dispatch)=>{
    try{
        const res = await axios.post(`${url}/messages`,message); 
        toast.dark(res.data,{progressClassName:'Toastify__progress-bar--info',})
        window.location = './';
    }catch(err){
        console.log(err.response.data);
    }
}

export const deleteMessage = (messageId)=>async(dispatch)=>{
    if(window.confirm('Delete This Message?')){

        try {
            const res = await axios.delete(`${url}/messages/delete-message/${messageId}`);
            dispatch({
                type:'deleteMessage',
                payload:messageId,
            })
            toast.dark(res.data,{progressClassName:'Toastify__progress-bar--info',})
        } catch (error) {
            console.log(error.response.data);
        }
    }
}


export const updateStatus = (messageId,status)=>async(dispatch)=>{
    const res = await axios.patch(`${url}/messages/update-status/${messageId}/${status}`);
    dispatch({
        type:"updateStatus",
        payload:{messageId,status}
    })
    
    window.location = './admin-panel/messages';
    toast.dark(res.data,{progressClassName:'Toastify__progress-bar--info',})

}



export const readMessage = (messageId,read)=>async(dispatch)=>{
    console.log('read')
    const res = await axios.patch(`${url}/messages/read-message/${messageId}/${read}`);
}



export const getMessagesByEmail = (email)=>async(dispatch)=>{
    try{
        const res = await axios.get(`${url}/messages/search/${email}`);
        dispatch({
            type:'getMessagesByEmail',
            payload:res.data
        })
    }catch(error){
        console.log(error.response.data);
    }
}