import jwtDecode from "jwt-decode";

const initialState = {
    users:[],
    user:localStorage.getItem('sony')?jwtDecode(localStorage.getItem('sony')): null,
    wishList:[],
    cart:[],
    totalPrice:0
}


export const usersReducers = (state=initialState,action)=>{
    switch(action.type){
        case 'getAllUsers':
            return{
                ...state,
                users:action.payload
            }
        
        case 'registerUser':
            return{
                ...state,
                users:state.users.push(action.payload)
            }
        
        case 'getUserData':
            return{
                ...state,
                user:action.payload
            }

        case 'deleteUser':
            return{
                ...state,
                users:state.users.filter(user=>user._id !== action.payload)
            }

            //CART

        case 'getCart':
            
            return{
                ...state,
                cart:action.payload.cart,
                totalPrice:action.payload.totalPrice
            }
        
        case 'addNewItem':
            return{
                ...state,
                user:{...state.user,cart:action.payload},
                cart:action.payload
            }

        case 'updateItemAmount':
            return{
                ...state,
                user:{...state.user,cart:action.payload}
            }
        
        case 'removeItemFromCart':
            return{
                ...state,
                user:{...state.user},
                cart:state.cart.filter(item => item._id !== action.payload)
            }


        case 'clearCart':
            return{
                ...state,
                cart:[],
                totalPrice:0
            }


            // Wish List

            case "getWishList":
                return{
                    ...state,
                    wishList:action.payload
                }

            case 'addToWishList':
                return{
                    ...state,
                    wishList:action.payload
                }
        
        
        case 'removeFromWishList':
            return{
                ...state,
                wishList:state.wishList.filter(item=>item._id !== action.payload)
            }

        default: return state
    }
}