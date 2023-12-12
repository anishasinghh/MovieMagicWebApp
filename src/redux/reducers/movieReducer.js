const initialState = {
    movies: [],
    movie: {
      title: 'New Movie',
      likes: 'New Number',
      posterUrl: 'New URL',
      id: 0,
      imdbID: '',
    },
  };
  
  const movieReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_MOVIES':
        return {
          ...state,
          movies: action.payload,
        };
      case 'SET_MOVIE':
        return {
          ...state,
          movie: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default movieReducer;
  