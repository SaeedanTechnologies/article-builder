const initialState = {
  tabValue: 0,
};

const tabChangeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "TAB_CHANGE": {
      return {
        ...state,
        ...action.payload,
        tabValue: action.payload,
      };
    }
    default:
      return state;
  }
};

export default tabChangeReducer;
