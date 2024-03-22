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

export const sendMessageAction = (formData)=> async(dispatch)=>{ 
    try{
     const res = await api.post(`${process.env.REACT_APP_URL}api/chat/messages`, formData)
     return res
     }catch(error){
     
     throw error
     }
       }
  

       export const getSingleChat = (userId)=> async(dispatch)=>{ 
        try{
         const res = await api.get(`${process.env.REACT_APP_URL}api/chat/conversations/${userId}`)
         return res
         }catch(error){
         
         throw error
         }
           }

           export const getAllChatUsers = ()=> async(dispatch)=>{ 
            try{
             const res = await api.get(`${process.env.REACT_APP_URL}api/user/allUsers`)
             return res
             }catch(error){
             
             throw error
             }
               }