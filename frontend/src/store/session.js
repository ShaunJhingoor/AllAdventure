import csrfFetch from './csrf.js';
const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const removeUser = () => ({
  type: REMOVE_USER
});

export const storeCSRFToken = response => {
  const csrfToken = response.headers.get("X-CSRF-Token");
  if (csrfToken) sessionStorage.setItem("X-CSRF-Token", csrfToken);
};

export const restoreSession = () => async dispatch => {
  const response = await csrfFetch("/api/session");
  storeCSRFToken(response);
  const data = await response.json();
  dispatch(setUser(data.user));
  
  return response;
};

export const login = ({ credential, password }) => async dispatch => {
  const response = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({ credential, password })
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

export const signup = (user) => async (dispatch) => {
  const { username, email, password,lname,fname } = user;
  const response = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({user:{
      username,
      email,
      password,
      lname,
      fname
    }})
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

export const logout = () => async (dispatch) => {
  const response = await csrfFetch("/api/session", {
    method: "DELETE"
  });
  dispatch(removeUser());
  return response;
};

// export const fetchUser = (userId) => async(dispatch) => {
//   const response = await csrfFetch(`/api/users/${userId}`)
//   if(response.ok){
//     const data = await response.json()
//     dispatch(setUser(data))
//     return response
//   }
// }

export const updateUser = (userData, oldPassword) => async (dispatch) => {
  const updatedUserData = { ...userData, oldPassword }; 
  const response = await csrfFetch(`/api/users/${userData.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user: updatedUserData }), 
  });

  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

// store.dispatch(sessionActions.updateUser({ id: 12, username: "Shaun", fname: "Shaun", lname: "Jhingoor", password: "password" , email: "Jhingoor1945@gmail.com"}));

const initialState = { user: null };

function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case REMOVE_USER:
      return { ...state, user: null };
    default:']'
      return state;
  }
}

export default sessionReducer;