import { useEffect, useState } from "react";
import { useParams } from "react-router";
import * as client from "../search/client";
import "./movieDetails.css";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";


function MovieDetails({ appCurrentUser, setUser, user, isLoggedIn }) {
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
                const updatedMovie = await client.increaseLikes(imdbId);
                setCurrentMovie(updatedMovie);
                setLikes(updatedMovie.likes);
                await client.updateUserLikes(currentUser._id, updatedMovie.id)

                setUsersLiked(prevusersLiked => [...prevusersLiked, currentUser]);
                setIsLiked(true);
                 // Update the liked movie in HomeUser component
      setUser((prevUser) => ({
        ...prevUser,
        liked_movies: isLiked
          ? prevUser.liked_movies.filter((movieId) => movieId !== currentMovie.id)
          : [...prevUser.liked_movies, currentMovie.id],
      }));
      // Refresh the user's liked movies on the home page
      fetchMovieDetailsById(imdbId);
                // refreshUserList();
            } else {
                // If the movie is liked, decrease likes
                const updatedMovie = await client.decreaseLikes(imdbId);
                setCurrentMovie(updatedMovie);
                setLikes(updatedMovie.likes);
                await client.removeUserLikes(currentUser._id, updatedMovie.id)

                setUsersLiked(prevusersLiked => prevusersLiked.filter(u => u._id !== currentUser._id));
                setIsLiked(false);
                // refreshUserList();
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
                            <tr>
                                <th scope="row" style={{ backgroundColor: 'black', color: 'white' }}>Liked By</th>
                                <td style={{ backgroundColor: 'black', color: 'white' }}>
                                    <ul>
                                        {console.log(usersLiked)}
                                        {usersLiked.map((likedUser, index) => (
                                            <li key={index}>
                                                <Link to={`/profile/${likedUser.username}`}>{likedUser.firstName} {likedUser.lastName}</Link>
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
