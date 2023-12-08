import { useEffect, useState } from "react";
import { useParams } from "react-router";
import * as client from "../search/client";
import "./movieDetails.css";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";

function MovieDetails({ user, isLoggedIn }) {
    const [movieDetail, setMovieDetail] = useState({});
    const [isLiked, setIsLiked] = useState(false); // State to keep track of like status
    const [currentMovie, setCurrentMovie] = useState({});
    const [likes, setLikes] = useState(null);

    const { imdbId } = useParams();

    useEffect(() => {
        fetchMovieDetailsById(imdbId);
        fetchMovieByIMDB(imdbId);
    }, [imdbId]);

    // for remote api
    const fetchMovieDetailsById = async (imdbId) => {
        const response = await client.fetchMovieById(imdbId);
        setMovieDetail(response);
        console.log(movieDetail);
        if (response && response.likes !== undefined) {
            setLikes(response.likes);
        } else {
            setLikes("NA");
        }
        // handleLikes();
    };

    // for local api 
    const fetchMovieByIMDB = async (imdbId) => {
        const response = await client.fetchMovieByIMDB(imdbId);
        setCurrentMovie(response);
        if (response && response.likes !== undefined) {
            setLikes(response.likes);
        } else {
            setLikes("NA");
        }
        // handleLikes();
    };

    const handleLikeClick = async () => {
        if (isLoggedIn) {
            if (!isLiked) {
                // If the movie is not liked, increase likes
                const updatedMovie = await client.increaseLikes(imdbId);
                setCurrentMovie(updatedMovie);
                setLikes(updatedMovie.likes);
                await client.updateUserLikes(user._id, updatedMovie.id)

            } else {
                // If the movie is liked, decrease likes
                const updatedMovie = await client.decreaseLikes(imdbId);
                setCurrentMovie(updatedMovie);
                setLikes(updatedMovie.likes);
                await client.removeUserLikes(user._id, updatedMovie.id)
            }
            setIsLiked(!isLiked); // Toggle the like status after the action
        } else {
            alert('Please log in to like this movie.');
        }
    };

    return (
        <div className="container" style={{ color: "white" }}>
            <div className="row justify-content-center">
                <div className="col col-lg-8 mt-5">
                    <div className="text-center">
                        <h1 className="fw-light mb-3">{movieDetail.Title}</h1>
                        <img src={movieDetail.Poster} alt={movieDetail.Title} />
                    </div>
                    {(user.role === "USER" || !isLoggedIn) && (
                        <div className="text-center mt-3">
                            <button
                                className={`btn ${isLiked ? 'btn-danger' : 'btn-outline-danger'}`}
                                onClick={handleLikeClick}
                            >
                                {isLiked ? <FaHeart /> : <CiHeart />}
                            </button>
                        </div>
                    )}
                    <table className="table">
                        <tbody>
                            <tr>
                                <th scope="row" style={{ backgroundColor: 'black', color: 'white' }}>Rating</th>
                                <td style={{ backgroundColor: 'black', color: 'white' }}>{movieDetail.Rated}</td>
                            </tr>
                            <tr>
                                <th scope="row" style={{ backgroundColor: 'black', color: 'white' }}>Genre</th>
                                <td style={{ backgroundColor: 'black', color: 'white' }}>{movieDetail.Genre}</td>
                            </tr>
                            <tr>
                                <th scope="row" style={{ backgroundColor: 'black', color: 'white' }}>Plot</th>
                                <td style={{ backgroundColor: 'black', color: 'white' }}>{movieDetail.Plot}</td>
                            </tr>
                            <tr>
                                <th scope="row" style={{ backgroundColor: 'black', color: 'white' }}>Released</th>
                                <td style={{ backgroundColor: 'black', color: 'white' }}>{movieDetail.Released}</td>
                            </tr>
                            <tr>
                                <th scope="row" style={{ backgroundColor: 'black', color: 'white' }}>Director</th>
                                <td style={{ backgroundColor: 'black', color: 'white' }}>{movieDetail.Director}</td>
                            </tr>
                            <tr>
                                <th scope="row" style={{ backgroundColor: 'black', color: 'white' }}>Likes</th>
                                <td style={{ backgroundColor: 'black', color: 'white' }}>{likes}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default MovieDetails;
