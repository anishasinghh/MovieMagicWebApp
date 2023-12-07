
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import * as client from "../search/client"
import "./movieDetails.css";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
function MovieDetails() {

    const [movieDetail, setMovieDetail] = useState({});
    const [isLiked, setIsLiked] = useState(false); // State to keep track of like status

    const { imdbId } = useParams();

    useEffect(() => {
        fetchMovieDetailsById(imdbId)

    }, [])

    const fetchMovieDetailsById = async (imdbId) => {
        const response = await client.fetchMovieById(imdbId);
        setMovieDetail(response)


    }

    const handleLikeClick = () => {
        setIsLiked(!isLiked);
    };

    return (
        <div className="container" style={{ color: "white" }}>
            <div className="row justify-content-center">
                <div className="col col-lg-8 mt-5">
                    <div className="text-center">
                        <h1 className="fw-light mb-3">{movieDetail.Title}</h1>
                        <img src={movieDetail.Poster}></img>
                    </div>
                    <div className="text-center mt-3">
                        <button
                            className={`btn ${isLiked ? 'btn-danger' : 'btn-outline-danger'}`}
                            onClick={handleLikeClick}
                        >
                            {isLiked ? <FaHeart /> : <CiHeart />}
                        </button>
                    </div>
                    <table className="table">
                        <tbody>
                            <tr>
                                <th scope="row" style={{ backgroundColor: 'black', color: 'white' }}>Rating</th>
                                <td style={{ backgroundColor: 'black', color: 'white' }}>{movieDetail.Rated}</td>
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
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default MovieDetails