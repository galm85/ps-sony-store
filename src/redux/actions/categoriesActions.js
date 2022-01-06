import axios from 'axios';
import {url} from '../../config'




export const getAllCategories = ()=>async(dispatch)=>{
    const res = await axios.get(`${url}/categories`);
    dispatch({
        type:'getAllCategories',
        payload:res.data
    })
}

export const getMainCategories = ()=>async(dispatch)=>{
    const res = await axios.get(`${url}/categories`);
    const mainCategories = res.data.filter(category=> !category.parentCategorieTitle);
    dispatch({
        type:'getMainCategories',
        payload:mainCategories
    })
}

export const getGamesCategories = ()=>async(dispatch)=>{
    const res = await axios.get(`${url}/categories/games`);
    dispatch({
        type:'getGamesCategories',
        payload:res.data
    })
}

export const getHardwareCategories = ()=>async(dispatch)=>{
    const res = await axios.get(`${url}/categories/hardware`);
    
    dispatch({
        type:'getHardwareCategories',
        payload:res.data
    })
}


export const addNewCategory = (category)=>async(dispatch)=>{
    await axios.post(`${url}/categories`,category);
    dispatch({
        type:'addNewCategory',
        payload:category
    })
}


