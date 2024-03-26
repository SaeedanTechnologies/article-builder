const initialState = {
  likes_id: "",
  liked: false,
  adminNavItemIndex: -1,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LIKE_SUCCESS": {
      console.log(action.payload.data.payload);
      return {
        ...state,
        ...action.payload.payload,
        likes_id: action.payload.data.payload,
        liked: true,
      };
    }
    case "SET_ADMIN_NAV_ITEM": {
      return {
        ...state,
        adminNavItemIndex: action.payload,
      };
    }
    default:
      return state;
  }
};

export default userReducer;
