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

export const addShopDrawing = (formData)=> async(dispatch)=>{ 
    try{
     const res = await api.post(`${process.env.REACT_APP_URL}api/admin/shopDrwing`, formData)
     return res
     }catch(error){
     
     throw error
     }
       }

       export const getShopDrawings = ()=> async(dispatch)=>{ 
        try{
         const res = await axios.get(`${process.env.REACT_APP_URL}api/user/showAllShopDrawings`)
         return res
         }catch(error){
         
         throw error
         }
           }