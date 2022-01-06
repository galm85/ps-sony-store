const initialState = {
    messages:[]
}


export const messagesReducer = (state=initialState,action)=>{
    switch(action.type){

        case 'getAllMessages':
            return{
                ...state,
                messages:action.payload
            }

        case 'addNewMessage':
            return{
                ...state,
                messages:state.messages.push(action.payload)
            }

        case 'updateStatus':
            let updateMessages = [...state.messages];
            for(let message of updateMessages){
                if(message._id === action.payload.messageId){
                    message.status = action.payload.status;
                }
            }
            return{
                ...state,
                messages:updateMessages
            }


        default: return state;
    }
}