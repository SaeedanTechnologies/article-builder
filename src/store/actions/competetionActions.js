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

export const addCompetition = (body)=> async(dispatch)=>{ 
    try{
     const res = await api.post(`${process.env.REACT_APP_URL}api/admin/competitions`,body,{
     })
     return res
     }catch(error){
     
     throw error
     }
       }
       
       export const getAllCompetitions = ()=> async(dispatch)=>{ 
        try{
         const res = await api.get(`${process.env.REACT_APP_URL}api/admin/competitions`,{
         })
         return res
         }catch(error){
         
         throw error
         }
           }
           export const deleteCompetition = (id)=> async(dispatch)=>{ 
            try{
            const res = await api.delete(`${process.env.REACT_APP_URL}api/admin/competitions/${id}`,{
            })
            return res
            }catch(error){
            
            throw error
            }
              }
    
              export const updateCompetition = (id, m_id,m_name, title, desc)=> async(dispatch)=>{ 
                try{
                 const res = await 
                 api.put(`${process.env.REACT_APP_URL}api/admin/competitions/${id}?update_type=jury_member&member_id=${m_id}&member_name=${m_name}&title=${title}&description=${desc}`,{
                 })
                 return res
                 }catch(error){
                 
                 throw error
                 }
                   }