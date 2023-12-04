import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as client from "./client";
import { NavLink } from "react-router-dom";

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
            <section className="py-5 text-center container">
                <div className="row py-lg-5">
                    <div className="col-lg-6 col-md-8 mx-auto">
                        <h1 className="fw-light" style={{color:"white"}}>Search Movies</h1>
                        <p className="lead" style={{color:"#CF9FFF"}}>Your next movie adventure awaits...</p>
                        <input
                            style={{marginBottom:"20px", width:"500px"}}
                            placeholder="ex. Hunger Games"
                            id="movie"
                            type="text"
                            onChange={handleSearchTermChange}
                            value={searchTerm}
                        />
                        <p>
                            <button className="btn custom-purple-btn" onClick={() => fetchMovies(searchTerm)}>Search</button>
                            {/* <a href="#" className="btn btn-primary my-2">Main call to action</a>
                            <a href="#" className="btn btn-secondary my-2">Secondary action</a> */}
                        </p>
                    </div>
                </div>
            </section>
           

            {movieItems}
            {noMoviesFound ? <h6 style={{ color: "white" }}>No Movies Found!</h6> : null}
        </div>
    );
}

export default MovieList;
