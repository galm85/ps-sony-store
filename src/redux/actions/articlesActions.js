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

//delete article