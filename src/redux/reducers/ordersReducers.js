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


        default: return state
    }
}