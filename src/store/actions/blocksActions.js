import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_URL,
});

export const getAllUsersBlocks = () => async (dispatch) => {
  try {
    const res = await api.get(`${process.env.REACT_APP_URL}api/user/showBlock`);

    return res;
  } catch (error) {
    throw error;
  }
};
