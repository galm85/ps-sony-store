import axios from 'axios';
// const url = process.env.REACT_APP_API_URL;
const url = process.env.REACT_APP_API_URL;




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
    try{
        await axios.post(`${url}/categories`,category);
        dispatch({
            type:'addNewCategory',
            payload:category
        })
        window.location = './admin-panel/categories';
    }catch(err){
        console.log(err);
    }
    }



export const deleteCategory =(categoryId)=>async(dispatch)=>{
    if(window.confirm('Delete Category?')){

        try{
            const res = await axios.delete(`${url}/categories/${categoryId}`);
            dispatch({
                type:'deleteCategory',
                payload:categoryId
            });
            alert(res.data);
        }catch(err){
            console.log(err)
        }
    }
}


export const updateCategory = (categoryId,category)=>async(dispatch)=>{
    if(window.confirm('Save Changes to this Category?')){

        try{
            const res = await axios.patch(`${url}/categories/update/${categoryId}`,category);
            alert(res.data);
            window.location = './admin-panel/categories'
        }catch(err){
            alert(err.response.data)
        }
    }
}
