const initialState = {
    currentUser: {
      username: 'username',
      firstname: 'first',
      followers: [],
      following: [],
      role: '',
    },
    allUser: {
      username: 'New Username',
      firstName: 'New First Name',
      followers: 0,
      role: 'New Role',
      liked_movies: [],
    },
    isLoggedIn: false,
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_CURRENT_USER':
        return {
          ...state,
          currentUser: action.payload,
          isLoggedIn: true,
        };
      case 'SET_ALL_USER':
        return {
          ...state,
          allUser: action.payload,
        };
      case 'LOG_OUT':
        return {
          ...state,
          currentUser: initialState.currentUser,
          isLoggedIn: false,
        };
      default:
        return state;
    }
  };
  
  export default userReducer;