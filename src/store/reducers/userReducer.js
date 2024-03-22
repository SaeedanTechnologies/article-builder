const initialState ={
    likes_id:'',
    liked:false
}

const userReducer = (state=initialState, action) => {
    switch(action.type) {
        case 'LIKE_SUCCESS': {
            console.log(action.payload.data.payload)
            return {
                ...state,
                ...action.payload.payload,
                likes_id:action.payload.data.payload,
                liked:true
            };
        };
        default :  return state
        
    }
}

export default userReducer