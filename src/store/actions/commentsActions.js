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

export const addComment = (body)=> async(dispatch)=>{ 
    try{
     const res = await api.post(`${process.env.REACT_APP_URL}api/user/comments`,body)
     return res
     }catch(error){
     
     throw error
     }
       }

       export const getPostComments = (id)=> async(dispatch)=>{ 
        try{
         const res = await api.get(`${process.env.REACT_APP_URL}api/user/postComments/${id}`,{
         })
         return res
         }catch(error){
         
         throw error
         }
           }
  
           export const updateComments = (comment, id)=> async(dispatch)=>{ 
            try{
             const res = await api.put(`${process.env.REACT_APP_URL}api/user/comments/${id}?comment=${comment}`,{
             })
             return res
             }catch(error){
             
             throw error
             }
               }
                export const deleteComment = (id)=> async(dispatch)=>{ 
                  try{
                  const res = await api.delete(`${process.env.REACT_APP_URL}api/user/comments/${id}`,{
                  })
                  return res
                  }catch(error){
                  
                  throw error
                  }
                    }