import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_URL,
});

const getToken = () => {
  return localStorage.getItem("token");
};

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const addArchData = (formData) => async (dispatch) => {
  try {
    const res = await api.post(
      `${process.env.REACT_APP_URL}api/admin/archData`,
      formData
    );
    return res;
  } catch (error) {
    throw error;
  }
};

export const getArchData = () => async (dispatch) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_URL}api/user/showAllArchData`
    );
    return res;
  } catch (error) {
    throw error;
  }
};

export const getArchDataAdmin = () => async (dispatch) => {
  try {
    const res = await api.get(`${process.env.REACT_APP_URL}api/admin/archData`);
    return res;
  } catch (error) {
    throw error;
  }
};

export const updateSpecsDetailsAction = (data, id) => async (dispatch) => {
  try {
    const res = await api.put(
      `${process.env.REACT_APP_URL}api/admin/ArchSpecs/${id}?specs_title=${data.specs_title}&description=${data.description}&detail1=${data.detail1}&detail2=${data.detail2}&specs_more_file=${data.specs_more_file}`
    );
    return res;
  } catch (error) {
    throw error;
  }
};

export const getArchSpecs = (id) => async (dispatch) => {
  try {
    const res = await api.get(
      `${process.env.REACT_APP_URL}api/user/showArchSpecs/${id}`
    );
    return res;
  } catch (error) {
    throw error;
  }
};
