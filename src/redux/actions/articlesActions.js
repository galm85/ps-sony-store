import axios from 'axios';
import {url} from '../../config';




export const getAllArticles = ()=>async(dispatch)=>{
    try{

        const res = await axios.get(`${url}/articles`);
        dispatch({
            type:'getAllArticles',
            payload:res.data,
        })

    }catch(err){
        console.log(err.response.data);
    }
}



// get only posted articles
export const getPostedArticles = ()=>async(dispatch)=>{
    try{

        const res = await axios.get(`${url}/articles/posted`);
        dispatch({
            type:'getPostedArticles',
            payload:res.data,
        })

    }catch(err){
        console.log(err.response.data);
    }
}

// add article
export const postNewArticle = (article)=>async(dispatch)=>{
    try{
        const res = await axios.post(`${url}/articles`,article)
        alert(res.data);
        window.location = '/admin-panel/news';
    }catch(err){
        console.log(err.response.data);
    }
}



//edit article
export const updateArticle = (article,articleId)=>async(dispatch)=>{
    try{

        const res  = await axios.patch(`${url}/articles/update-article/${articleId}`,article);
        alert(res.data);
        window.location = '/admin-panel/news';

    }catch(err){
        console.log(err.response.data);
    }
}

//delete article
export const deleteArticle = (articleId)=>async(dispatch)=>{
    if(window.confirm('Delete This Article?')){

        try{
            
            const res = await axios.delete(`${url}/articles/${articleId}`);
            alert(res.data);
            dispatch({
                type:'deleteArticle',
                payload:articleId
            })
            
        }catch(err){
            console.log(err.response.data);
        }
    }
}


//get single article
export const getSingleArticle = (articleId)=>async(dispatch)=>{
    try{
        const res = await axios.get(`${url}/articles/single-article/${articleId}`);
        dispatch({
            type:'getSingleArticle',
            payload:res.data,
        })

    }catch(err){
        console.log(err.response.data)
    }
}


//like/no like to article
export const likeArticle = (articleId,op)=>async(dispatch)=>{
    try{

        const res = await axios.patch(`${url}/articles/likes/${articleId}/${op}`);
      
    }catch(err){
        console.log(err.response.data)
    }
}
