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
            




        default: return state;
    }
}