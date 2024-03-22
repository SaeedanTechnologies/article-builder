import axios from "axios";


const api = axios.create({
  baseURL: process.env.REACT_APP_URL,
});

const getToken = () => {
  return localStorage.getItem('token');
};

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export const UserLogin = ({email, password}) => async(dispatch)=>{
    const body = {
        email,
        password,
    }

try {
 
    const res = await axios.post(`${process.env.REACT_APP_URL}api/auth/login`, body, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if(res.data.payload.user.is_admin == 1){
        dispatch({
            type: 'LOGIN_SUCCESS_ADMIN',
            payload: res.data
        });
        return res
      }
      else {
        dispatch({
          type: 'LOGIN_SUCCESS_USER',
          payload: res.data
      });
      return res
      }
}catch(error){
    throw error
}
}

export const logOut = () => (dispatch) => {
  dispatch({
      type: 'LOGOUT_SUUCCESS'
    });
}

export const UserSignUp = ({ name, email, password}) => async (dispatch) => {
    const body = {
      name,
      email,
      password
    };
    try {
      const res = await axios.post(`${process.env.REACT_APP_URL}api/auth/register`, body, {

        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(res)
      
      if (res.status === 200) {
        dispatch({
          type: 'SIGNUP_SUCCESS',
          payload: res.data
        });
      }
  
      
      return res;
  
    } catch (error) {
      throw error
    }
  };

  export const verificationOTPCode = (otp, user_id)=> async(dispatch)=>{
    console.log(otp, user_id, "++++++++++++++")
    const body = {
        otp,
        user_id
    };
    try{
    const res = await axios.post(`${process.env.REACT_APP_URL}api/auth/otp/verify`, body,{
    headers: {'Content-Type': 'application/json'}
    })
    if(res.status === 200){
        dispatch({type: "VERIFIED",
        payload: res.data,})
    }
    return res
    }catch(error){
    
    throw error
    }
      }

      export const getAdminDashboardStats = ()=> async(dispatch)=>{ 
       try{
        const res = await api.get(`${process.env.REACT_APP_URL}api/admin/getAdminDashboardCounts`,{
        headers: {'Content-Type': 'application/json'}
        })
        return res
        }catch(error){
        
        throw error
        }
          }
