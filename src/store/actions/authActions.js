export const setId = (user_id) => (dispatch) => {
    dispatch({
        type: 'SIGN_UP',
        payload: user_id
      });
}