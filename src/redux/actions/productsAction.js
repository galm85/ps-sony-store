import axios from 'axios';
import { toast } from "react-toastify";
import {url} from '../../config';


export const getAllProducts = ()=>async(dispatch)=>{
    const res = await axios.get(`${url}/products`);
    dispatch({
        type:'getAllProducts',
        payload:res.data
    })
}


export const getProducts = (category)=>async(dispatch)=>{
    const res = await axios.get(`${url}/products/${category}`);
    dispatch({
        type:'getProducts',
        payload:res.data 
    })
}


export const addNewProducts = (product)=>async(dispatch)=>{
    try{

        await axios.post(`${url}/products`,product);
        console.log(product);
        dispatch({
            type:'addNewProduct',
            payload:product
        })
        toast.dark('New Peoduct Added',{progressClassName:'Toastify__progress-bar--success',})
        window.location ="/admin-panel/products";
    }catch(err){
        console.log(err);
    }
}


export const updateProduct = (productId,product)=>async(dispatch)=>{
    console.log('update');
        try{
            const res = await axios.patch(`${url}/products/update-product/${productId}`,product);
            toast.dark('Product Updated',{progressClassName:'Toastify__progress-bar--success',})
            window.location = '/admin-panel/products';

        }catch(error){
            toast.dark(error.response.data,{progressClassName:'Toastify__progress-bar--info',})

        }
    

}


export const deleteProduct = (productId)=>async(dispatch)=>{
  
        const res = await axios.delete(`${url}/products/delete/${productId}`);
        dispatch({
            type:"deleteProduct",
            payload:productId
        })
        toast.dark('Product Deleted',{progressClassName:'Toastify__progress-bar--error',})

   
}


export const updateSells = (productId,amount)=>async(dispatch)=>{
    const res = await axios.patch(`${url}/products/update-sells/${productId}`,{amount:amount});
}


export const getBestSells = ()=>async(dispatch)=>{
    const res = await axios.get(`${url}/products/best-sells/games`);
    
    dispatch({
        type:'getBestSells',
        payload:res.data
    })
}

export const getNewGames = ()=>async(dispatch)=>{
    const res = await axios.get(`${url}/products/new-games/games`);
    
    dispatch({
        type:'getNewGames',
        payload:res.data
    })
}

export const getComingSoon = ()=>async(dispatch)=>{
    const res = await axios.get(`${url}/products/coming-soon/games`);
    
    dispatch({
        type:'getComingSoon',
        payload:res.data
    })
}


export const getSearchProduct = (name)=>async(dispatch)=>{
    try{
        const res = await axios.get(`${url}/products/search/${name}`);
        console.log(res.data);
        dispatch({
            type:'getSearchProduct',
            payload:res.data
        })
    }catch(err){
        console.log(err.response.data);
    }
}