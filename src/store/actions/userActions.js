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

export const updateProfileInfo = (name, phone) => async (dispatch) => {
  try {
    const res = await api.put(
      `${process.env.REACT_APP_URL}api/user/profile?name=${name}&phone_number=${phone}`,
      {}
    );
    return res;
  } catch (error) {
    throw error;
  }
};
export const updateAvatar = (formData) => async (dispatch) => {
  try {
    const res = await api.put(
      `${process.env.REACT_APP_URL}api/user/profile`,
      formData,
      {}
    );
    return res;
  } catch (error) {
    throw error;
  }
};

export const getCategories = () => async (dispatch) => {
  try {
    const res = await api.get(
      `${process.env.REACT_APP_URL}api/user/ShowCategories`
    );
    return res;
  } catch (error) {
    throw error;
  }
};

export const addPost = (body) => async (dispatch) => {
  try {
    const res = await api.post(
      `${process.env.REACT_APP_URL}api/user/posts`,
      body,
      {}
    );
    return res;
  } catch (error) {
    throw error;
  }
};

export const likePost = (body) => async (dispatch) => {
  try {
    const res = await api.post(
      `${process.env.REACT_APP_URL}api/user/likes`,
      body,
      {}
    );
    dispatch({
      type: "LIKE_SUCCESS",
      payload: res,
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export const getAllPosts = () => async (dispatch) => {
  try {
    const res = await api.get(
      `${process.env.REACT_APP_URL}api/user/ShowPosts`,
      {}
    );
    return res;
  } catch (error) {
    throw error;
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    const res = await api.delete(
      `${process.env.REACT_APP_URL}api/user/posts/${id}`,
      {}
    );
    return res;
  } catch (error) {
    throw error;
  }
};

export const updatePost = (body, id) => async (dispatch) => {
  try {
    const res = await api.put(
      `${process.env.REACT_APP_URL}api/user/posts/${id}`,
      body,
      {}
    );
    return res;
  } catch (error) {
    throw error;
  }
};
// CREATE THE PROJECT
export const CreateProject = (formData) => async (dispatch) => {
  try {
    const res = await api.post(
      `${process.env.REACT_APP_URL}api/user/projects`,
      formData,
      {}
    );
    console.log(res);
    if (res.status === 200) {
      dispatch({
        type: "CREATE_PROJECT",
        payload: res.data,
      });
    }
    return res;
  } catch (err) {
    console.log(err);
  }
};
export const getAllProjects = () => async (dispatch) => {
  try {
    const res = await api.get(
      `${process.env.REACT_APP_URL}api/user/ShowProjects`,
      {}
    );
    return res;
  } catch (error) {
    throw error;
  }
};
export const createEvent = (formData) => async (dispatch) => {
  try {
    const res = await api.post(
      `${process.env.REACT_APP_URL}api/admin/events`,
      formData
    );
    return res;
  } catch (error) {
    throw error;
  }
};

export const getAllNews = () => async (dispatch) => {
  try {
    const res = await api.get(`api/user/ShowNews`);

    return res;
  } catch (error) {
    throw error;
  }
};

export const createNews = (formData) => async (dispatch) => {
  try {
    const res = await api.post(
      `${process.env.REACT_APP_URL}api/admin/news`,
      formData
    );
    return res;
  } catch (error) {
    throw error;
  }
};
export const getAllEvents = () => async (dispatch) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_URL}api/user/showEvents`,
      {}
    );
    return res;
  } catch (error) {
    throw error;
  }
};

export const deleteEvent = (id) => async (dispatch) => {
  try {
    const res = await api.delete(
      `${process.env.REACT_APP_URL}api/admin/events/${id}`,
      {}
    );
    return res;
  } catch (error) {
    throw error;
  }
};

export const editEvent = (body, id) => async (dispatch) => {
  try {
    const res = await api.put(
      `${process.env.REACT_APP_URL}api/admin/events/${id}`,
      body,
      {}
    );
    return res;
  } catch (error) {
    throw error;
  }
};

export const editNews = (formData, id) => async (dispatch) => {
  // const { title, description, author, banner_image, images } = formValues;
  try {
    const res = await api.post(
      `${process.env.REACT_APP_URL}api/admin/updateNews/${id}`,
      formData
    );
    return res;
  } catch (error) {
    throw error;
  }
};

export const updateNewsImage = (formData, id) => async (dispatch) => {
  try {
    const res = await api.post(
      `${process.env.REACT_APP_URL}api/admin/updateNewsImage/${id}`,
      formData
    );
    return res;
  } catch (error) {
    throw error;
  }
};
export const deleteNews = (id) => async (dispatch) => {
  try {
    const res = await api.delete(
      `${process.env.REACT_APP_URL}api/admin/news/${id}`,
      {}
    );
    return res;
  } catch (error) {
    throw error;
  }
};

export const DeleteProject = (id) => async (dispatch) => {
  try {
    const res = await api.delete(
      `${process.env.REACT_APP_URL}api/admin/${id}`,
      {}
    );
    return res;
  } catch (error) {
    throw error;
  }
};
export const createBlocks = (formData) => async (dispatch) => {
  try {
    const res = await api.post(
      `${process.env.REACT_APP_URL}api/admin/block`,
      formData,
      {}
    );
    return res;
  } catch (error) {
    throw error;
  }
};

export const getAllBlocks = () => async (dispatch) => {
  try {
    const token = getToken();
    const res = await axios.get(`${process.env.REACT_APP_URL}api/admin/block`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (error) {
    throw error;
  }
};
export const deleteBlocks = (id) => async (dispatch) => {
  try {
    const res = await api.delete(
      `${process.env.REACT_APP_URL}api/admin/block/${id}`,
      {}
    );
    return res;
  } catch (error) {
    throw error;
  }
};

export const editBlocks = (body, id) => async (dispatch) => {
  const { title, description, tags, imgs, block_category_id } = body;
  try {
    const res = await api.put(
      `${process.env.REACT_APP_URL}api/admin/block/${id}?title=${title}&description=${description}&tags[]=${tags}&imgs[]=${imgs}&block_category_id=${block_category_id}`
    );
    return res;
  } catch (error) {
    throw error;
  }
};

export const BlockCategory = (formData) => async (dispatch) => {
  try {
    const res = await api.post(
      `${process.env.REACT_APP_URL}api/admin/blockCategory`,
      formData,
      {}
    );
    return res;
  } catch (error) {
    throw error;
  }
};
export const getCategory = () => async (dispatch) => {
  try {
    const token = getToken();
    const res = await axios.get(
      `${process.env.REACT_APP_URL}api/admin/blockCategory`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res;
  } catch (error) {
    throw error;
  }
};

export const deleteCategory = (id) => async (dispatch) => {
  try {
    const res = await api.delete(
      `${process.env.REACT_APP_URL}api/admin/block/${id}`,
      {}
    );
    return res;
  } catch (error) {
    throw error;
  }
};
