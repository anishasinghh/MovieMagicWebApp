import axios from "axios";

const KEY = process.env.OMDB_API_KEY;
const OMDB_API = "https://www.omdbapi.com";
const LOCAL_MOVIE_API = "http://localhost:4000/api/movies";
const LOCAL_USERS_API = "http://localhost:4000/api/users/likes";

export const fullTextSearch = async (movieName) => {
  const response = await axios.get(
    `${OMDB_API}/?s=${movieName}&apikey=f11c3343`
  );
  return response.data;
};

// for remote api 
export const fetchMovieById = async (imdbId) => {
  const response = await axios.get(
    `${OMDB_API}/?i=${imdbId}&apikey=f11c3343`
  );
  return response.data;
};

// for local api 
export const fetchMovieByIMDB = async (imdbID) => {
  console.log("in findMovieByIMDB in client")
  const response = await axios.get(`${LOCAL_MOVIE_API}/id/${imdbID}`);
  return response.data;
}

export const increaseLikes = async (imdbID) => {
  const response = await axios.put(`${LOCAL_MOVIE_API}/id/${imdbID}`);
  console.log(response.data)
  return response.data;
}

export const decreaseLikes = async (imdbID) => {
  const response = await axios.put(`${LOCAL_MOVIE_API}/id/${imdbID}/decrease`);
  console.log(response.data);
  return response.data;
};
export const updateUserLikes = async (userID, movieID) => {
  console.log(userID)
  const response = await axios.put(`${LOCAL_USERS_API}/${userID}`, { movieId: movieID });
  console.log(response.data);
  return response.data;
};


// export const fetchTracksByAlbumId = async (albumId) => {
//   const response = await axios.get(
//     `${NAPSTER_API}/albums/${albumId}/tracks?apikey=${KEY}`
//   );
//   return response.data;
// };