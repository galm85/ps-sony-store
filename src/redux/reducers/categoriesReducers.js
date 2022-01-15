const initialState = {
    categories:[]
}


export const categoriesReducers = (state=initialState,action)=>{
    switch(action.type){
        case 'getAllCategories':
            return{
                ...state,
                categories:action.payload
            }
        
        case 'getMainCategories':
            return{
                ...state,
                categories:action.payload
            }
        
        case 'getGamesCategories':
            return{
                ...state,
                categories:action.payload
            }

        case 'getHardwareCategories':
            return{
                ...state,
                categories:action.payload
            }

        case 'addNewCategory':
            return{
                ...state,
                categories:state.categories.push(action.payload)
            }

        case 'deleteCategory':
            return{
                ...state,
                categories:state.categories.filter(item=>item._id !== action.payload),
            }


        default: return state
    }
}