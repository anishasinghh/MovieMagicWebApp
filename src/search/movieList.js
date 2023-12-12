import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as client from "./client";
import { NavLink } from "react-router-dom";
import MissingMovieImage from "../search/MissingMovie.jpg";

function MovieList() {
    const [searchTerm, setSearchTerm] = useState("");
    const [movies, setMovies] = useState([]);
    const [noMoviesFound, setNoMoviesFound] = useState(false);

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
        const response = await client.fullTextSearch(movieName);
        if (response.Error) {
            setMovies([]);
            navigate(`?searchTerm=${encodeURIComponent(movieName)}`);
            setNoMoviesFound(true);
        }
        else {
            setMovies(response.Search);
            setNoMoviesFound(false);
            navigate(`?searchTerm=${encodeURIComponent(movieName)}`);
        }
    };

    const movieItems = movies.map((movie) => {
        console.log(movie.Poster);
        return (
            <div key={movie.imdbID}>
                <div class="col">
                    <div class="card shadow-sm">
                        <img class="bd-placeholder-img card-img-top" src={movie.Poster == "N/A" ? MissingMovieImage : movie.Poster} />
                        
                        <div class="card-body">
                            <h5 class="card-text" style={{ color: "black" }}>{movie.Title}</h5>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group">
                                    <NavLink to={`/details/${movie.imdbID}`}>
                                        <button className="btn btn-outline-dark"> Details </button>
                                    </NavLink>
                                    {/* <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                  <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button> */}
                                </div>
                                <small class="text-body-secondary">{movie.Year}</small>
                            </div>
                        </div>
                    </div>
                </div>


                {/* <NavLink to={`/details/${movie.imdbID}`}>
                    <button className="btn btn-primary"> Details </button>
                </NavLink> */}
            </div>
        );
    });

    return (
        <div>
            <section className="py-5 text-center container">
                <div className="row py-lg-5">
                    <div className="col-lg-6 col-md-8 mx-auto">
                        <h1 className="fw-light" style={{ color: "white" }}>Search Movies</h1>
                        <p className="lead" style={{ color: "#CF9FFF" }}>Your next movie adventure awaits...</p>
                        <input
                            style={{ marginBottom: "20px", width: "500px" }}
                            placeholder="ex. Hunger Games"
                            id="movie"
                            type="text"
                            onChange={handleSearchTermChange}
                            value={searchTerm}
                        />
                        <p>
                            <button className="btn custom-purple-btn" onClick={() => fetchMovies(searchTerm)}>Search</button>
                        </p>
                    </div>
                </div>
            </section>

            <div class="album py-5">
                <div class="container">
                    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                        {movieItems}
                    </div>
                </div>
                {noMoviesFound ? <h3 style={{ color: "white", textAlign: "center" }}>No Movies Found!</h3> : null}
            </div>


        </div>
    );
}

export default MovieList;
