import axios from 'axios';
import {url} from '../../config';
import { toast } from "react-toastify";




export const getAllComments = ()=>async(dispatch)=>{
    try{

        const res = await axios.get(`${url}/comments`);
        dispatch({
            type:'getAllComments',
            payload:res.data,
        })

    }catch(err){
        console.log(err.response.data);
    }
}



export const getCommentsByArticleId = (articleId)=>async(dispatch)=>{
    try{

        const res = await axios.get(`${url}/comments/get-by-article/${articleId}`);
        dispatch({
            type:'getCommentsByArticleId',
            payload:res.data,
        })

    }catch(err){
        console.log(err.response.data);
    }
}



export const getCommentsByUserId = (userId)=>async(dispatch)=>{
    try{
        const res = await axios.get(`${url}/comments/get-by-user/${userId}`);
        dispatch({
            type:'getCommentsByUserId',
            payload:res.data,
        })

    }catch(err){
        console.log(err.response.data);
    }
}



export const postNewComment = (comment)=>async(dispatch)=>{
    
    try{
        const res = await axios.post(`${url}/comments`,comment)
        alert(res.data);
        dispatch({
            type:'postNewComment',
            payload:comment,
        })
        toast.dark('Ypur comment recived',{progressClassName:'Toastify__progress-bar--info'})

    }catch(err){
        console.log(err.response.data);
    }
}




export const deleteComment = (commentId)=>async(dispatch)=>{
    if(window.confirm('Delete This Comment?')){
        try{
            const res = await axios.delete(`${url}/comments/delete-comment/${commentId}`);
            alert(res.data);
            dispatch({
                type:'deleteComment',
                payload:commentId
            })
            
        }catch(err){
            console.log(err.response.data);
        }
    }
}



