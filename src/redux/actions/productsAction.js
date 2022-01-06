import axios from 'axios';
// import {url} from '../../config.json'
//import { toast } from "react-toastify";
// let url = "https://gal-sony-store.herokuapp.com";
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
    await axios.post(`${url}/products`,product);
    dispatch({
        type:'addNewProduct',
        payload:product
    })
}


export const updateProduct = (productId,product)=>async(dispatch)=>{
    const res = await axios.patch(`${url}/products/update-product/${productId}`,product);
    //toast.info(res.data);
}


export const deleteProduct = (productId)=>async(dispatch)=>{
    const res = await axios.delete(`${url}/products/delete/${productId}`);
    dispatch({
        type:"deleteProduct",
        payload:productId
    })
    //toast.error(res.data);
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