const initialState = {
    comments:[],
}



export const commentsReducer = (state=initialState,action)=>{

    switch(action.type){

        case 'getAllComments':
            return {
                ...state,
                comments:action.payload
            }
            

        case 'getCommentsByArticleId':
            return{
                ...state,
                comments:action.payload
            }

        case 'getCommentsByUserId':
            return{
                ...state,
                comments:action.payload
            }

        case 'deleteComment':
            return{
                ...state,
                comments:state.comments.filter(item=>item._id !== action.payload )
            }

        case 'postNewComment':
            let newComments = [...state.comments];
            newComments.push(action.payload);
           
            return{
                ...state,
                comments:[...newComments]
            }

        

        default: return state;
    }
}