const initialState ={
    user_id : '',
}

const authReducer = (state=initialState, action) => {
    switch(action.type) {
        case 'SIGN_UP': {
            // console.log(action)
            return {
                ...state,
                ...action.payload.payload,
                user_id:action.payload
            };
        };
        default :  return state
        
    }
}

export default authReducer