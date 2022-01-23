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