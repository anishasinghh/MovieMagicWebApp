import axios from "axios";

const KEY = process.env.OMDB_API_KEY;
const OMDB_API = "https://www.omdbapi.com";
// const NAPSTER_IMAGE_URL = "https://api.napster.com/imageserver/v2";

// export const albumImageUrl = (album) =>
//   `${NAPSTER_IMAGE_URL}/albums/${album.id}
// /images/300x300.jpg`;

export const fullTextSearch = async (movieName) => {
  const response = await axios.get(
    `${OMDB_API}/?s=${movieName}&apikey=f11c3343`
  );
  return response.data.Search;
};

export const fetchMovieById = async (imdbId) => {
  const response = await axios.get(
    `${OMDB_API}/?i=${imdbId}&apikey=f11c3343`
  );
  return response.data;
};

// export const fetchTracksByAlbumId = async (albumId) => {
//   const response = await axios.get(
//     `${NAPSTER_API}/albums/${albumId}/tracks?apikey=${KEY}`
//   );
//   return response.data;
// };