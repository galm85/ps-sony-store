const initialState = {
    articles:[]
}



export const articleReducer = (state=initialState,action)=>{

    switch(action.type){

        case 'getAllArticles':
            return {
                ...state,
                articles:action.payload
            }
            

        case 'getPostedArticles':
            return{
                ...state,
                articles:action.payload
            }

        case 'deleteArticle':
            return{
                ...state,
                articles:state.articles.filter(item=>item._id !== action.payload )
            }

        default: return state;
    }
}