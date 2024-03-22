
const initialState = {
    isAuthenticatedAdmin: false,
    isAuthenticatedUser: false,
    token : localStorage.getItem('token'),
    user: null
}

const adminReducer = (state=initialState, action) => {
    switch(action.type) {
        case 'LOGIN_SUCCESS_ADMIN': {

            localStorage.setItem('token', action.payload.payload.token);
            console.log("ADMIN_LOGIN")
            return {
                ...state,
                ...action.payload.payload,
                token: action.payload.payload.token,
                user:action.payload.payload.user,
                isAuthenticatedAdmin: true
            };
        };
        case 'LOGIN_SUCCESS_USER': {
            localStorage.setItem('token', action.payload.payload.token);
            // console.log(action.payload.payload.user, "USERLOGIN")
            return {
                ...state,
                ...action.payload.payload,
                token: action.payload.payload.token,
                user:action.payload.payload.user,
                isAuthenticatedUser: true
            };
        };
        case 'LOGOUT_SUUCCESS' : {
            localStorage.removeItem('token')
            return {
                token: null,
                user:null,
                isAuthenticatedAdmin: false,
                isAuthenticatedAdmin:false
              };
        };
        default :  return state
        
    }
}

export default adminReducer