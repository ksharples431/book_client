export const LOAD_USER = "LOAD_USER"

export const loadUser = (userData) => (dispatch) => {
  dispatch({ type: 'LOAD_USER', payload: userData });
};
