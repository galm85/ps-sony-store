const initialState = {
    products:[],
    bestSells:[],
    newGames:[],
    comingSoon:[]
}


export const productsReducers = (state=initialState,action)=>{
    switch(action.type){

        case 'getAllProducts':
            return{
                ...state,
                products:action.payload
            }

        case 'getProducts':
            return{
                ...state,
                products:action.payload
            }

        case 'addNewProduct':
            return{
                ...state,
                products:state.products.push(action.payload)
            }

        case 'deleteProduct':
            return{
                ...state,
                products:state.products.filter(product=>product._id !== action.payload)
            }

        case 'getBestSells':
            return{
                ...state,
                bestSells:action.payload
            }

        case 'getNewGames':
            return{
                ...state,
                newGames:action.payload
            }

        case 'getComingSoon':
            return{
                ...state,
                comingSoon:action.payload
            }



        default: return state
    }
}