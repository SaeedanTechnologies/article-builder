export const tabChangeAction = (value) => (dispatch) => {
  dispatch({
    type: "TAB_CHANGE",
    payload: value,
  });
};
