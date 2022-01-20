const initialState = {
    orders:[]
}


export const ordersReducer = (state=initialState,action)=>{
    switch(action.type){
        case 'getAllOrders':
            return{
                ...state,
                orders:action.payload
            }
        
        case 'getOrdersByUser':
            return{
                ...state,
                orders:action.payload
            }

        case 'searchByEmail':
            return{
                ...state,
                orders:action.payload
            }
            
        case 'searchById':
            return{
                ...state,
                orders:action.payload
            }
        
        case 'deleteOrder':
            return{
                ...state,
                orders:state.orders.filter(item=>item._id !== action.payload)
            }

        default: return state
    }
}