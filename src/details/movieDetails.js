import { useEffect, useState } from "react";
import { useParams } from "react-router";
import * as client from "../search/client";
import "./movieDetails.css";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

function MovieDetails({ setUser, user, isLoggedIn }) {
    const [movieDetail, setMovieDetail] = useState({});
    const [isLiked, setIsLiked] = useState(false); // State to keep track of like status
    const [currentMovie, setCurrentMovie] = useState({});
    const [likes, setLikes] = useState(null);
    const [usersLiked, setUsersLiked] = useState([]);
    const [currentUser, setCurrentUser] = useState({ username: "username", firstname: "first", liked_movies: [], followers: [], following: [], role: "" });

    const { imdbId } = useParams();


    useEffect(() => {
        console.log("in use effect")
        console.log("isLoggedIn: " + isLoggedIn);
        setUsersLiked([]);
        setCurrentUser(user);
        fetchMovieDetailsById(imdbId);
        // onSignIn(currentUser);
    }, []);

    useEffect(() => {
        console.log("re-rendering usersLiked & likes")
    }, [likes, usersLiked]);

    const fetchMovieDetailsById = async (imdbId) => {
        // remote api json object 
        const response = await client.fetchMovieById(imdbId);
        setMovieDetail(response);

        // local api json object 
        const response2 = await client.fetchMovieByIMDB(imdbId);
        setCurrentMovie(response2);
        let updatedUsersLiked = [];
        if (response2 && response2.likes !== undefined) {
            setLikes(response2.likes);
        } else {
            setLikes("NA");
        }

        const usersResponse = await client.fetchAllUsers();
        // console.log(usersResponse);
        var currUser = {};

        // console.log("fetchMovieDetailsById appCurrentUser prop: " + appCurrentUser.username);
        // console.log("fetchMovieDetailsById user prop: " + user.username);

        for (const userObj of usersResponse) {
            if (userObj.liked_movies.includes(response2.id) && !updatedUsersLiked.some(u => u._id === userObj._id)) {
                updatedUsersLiked.push(userObj);
                console.log(updatedUsersLiked);
            }
            if (isLoggedIn) {
                if (userObj.username === user.username) {
                    currUser = userObj;
                    setCurrentUser(userObj);
                    setUser(userObj);
                }
            }
        }
        setUsersLiked(updatedUsersLiked);
        console.log("in updatedUserLikes:" + updatedUsersLiked)

        if (isLoggedIn) {
            if (currUser.liked_movies.includes(response2.id)) {
                setIsLiked(true);
            }
        }


    };


    const handleLikeClick = async () => {
        if (isLoggedIn) {
            if (!isLiked && !(currentUser.liked_movies.includes(currentMovie.id))) {
                // If the movie is not liked, increase likes
                await client.increaseLikes(imdbId);
                setLikes((prevLikes) => (prevLikes !== 'NA' ? prevLikes + 1 : 1));

                await client.updateUserLikes(currentUser._id, currentMovie.id);
                setUsersLiked((prevUsersLiked) => [...prevUsersLiked, currentUser]);

                setIsLiked(true);
                setUser((prevUser) => ({
                    ...prevUser,
                    liked_movies: [...prevUser.liked_movies, currentMovie.id],
                }));
            } else {
                // If the movie is liked, decrease likes
                await client.decreaseLikes(imdbId);
                setLikes((prevLikes) => (prevLikes !== 'NA' ? prevLikes - 1 : 'NA'));

                await client.removeUserLikes(currentUser._id, currentMovie.id);
                setUsersLiked((prevUsersLiked) =>
                    prevUsersLiked.filter((u) => u._id !== currentUser._id)
                );

                setIsLiked(false);
                setUser((prevUser) => ({
                    ...prevUser,
                    liked_movies: prevUser.liked_movies.filter(
                        (movieId) => movieId !== currentMovie.id
                    ),
                }));
            }
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
                    {console.log("current user is: " + currentUser.username)}
                    {console.log("liked movies of current user: " + currentUser.liked_movies)}
                    {(currentUser.role === "USER" || !isLoggedIn) && (

                        <div className="text-center mt-3">
                            <button
                                className={`btn ${isLiked || currentUser.liked_movies.includes(currentMovie.id) ? 'btn-danger' : 'btn-outline-danger'}`}
                                onClick={handleLikeClick}
                            >
                                {console.log("is liked:" + isLiked)}
                                {console.log("user in liked by" + currentUser.liked_movies.includes(currentMovie.id))}
                                {isLiked || currentUser.liked_movies.includes(currentMovie.id) ? <FaHeart /> : <CiHeart />}
                            </button>
                        </div>
                    )}
                    <table className="table">
                        <tbody>
                            <tr>
                                <th className="table-header">Rating</th>
                                <td className="table-data">{movieDetail.Rated}</td>
                            </tr>
                            <tr>
                                <th className="table-header">Genre</th>
                                <td className="table-data">{movieDetail.Genre}</td>
                            </tr>
                            <tr>
                                <th className="table-header">Plot</th>
                                <td className="table-data">{movieDetail.Plot}</td>
                            </tr>
                            <tr>
                                <th className="table-header">Released</th>
                                <td className="table-data">{movieDetail.Released}</td>
                            </tr>
                            <tr>
                                <th className="table-header">Director</th>
                                <td className="table-data">{movieDetail.Director}</td>
                            </tr>
                            <tr>
                                <th className="table-header">Likes</th>
                                <td className="table-data">{likes}</td>
                            </tr>
                            <tr>
                                <th className="table-header">Liked By</th>
                                <td className="table-data">
                                    <ul>
                                        {usersLiked.map((likedUser, index) => (
                                            <li key={index} className='fw-light'>
                                                <Link style={{ color: "white", textDecoration: "none" }} to={`/profile/${likedUser.username}`}>{likedUser.firstName} {likedUser.lastName}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default MovieDetails;
