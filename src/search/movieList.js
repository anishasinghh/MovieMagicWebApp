import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as client from "./client";
import { NavLink } from "react-router-dom";

function MovieList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchTermFromURL = params.get("searchTerm");
    if (searchTermFromURL) {
      setSearchTerm(searchTermFromURL);
      fetchMovies(searchTermFromURL);
    }
  }, [location.search]);

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const fetchMovies = async (movieName) => {
    try {
      const response = await client.fullTextSearch(movieName);
      setMovies(response);
      navigate(`?searchTerm=${encodeURIComponent(movieName)}`);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const movieItems = movies.map((movie) => {
    return (
      <div key={movie.imdbID}>
        <h3 style={{ color: "white" }}>{movie.Title}</h3>
        <img src={movie.Poster} alt={movie.Title} />
        <NavLink to={`/details/${movie.imdbID}`}>
            <button className="btn btn-primary"> Details </button>
        </NavLink>
      </div>
    );
  });

  return (
    <div>
      <h3 style={{ color: "white" }}>Search</h3>
      <label htmlFor="movie" style={{ color: "white" }}>
        Movie Name
      </label>
      <input
        id="movie"
        type="text"
        onChange={handleSearchTermChange}
        value={searchTerm}
      />
      <button
        className="btn btn-success"
        onClick={() => fetchMovies(searchTerm)}
      >
        Submit
      </button>

      {movieItems}
    </div>
  );
}

export default MovieList;
