
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import * as client from "../search/client"
function MovieDetails(){

    const[movieDetail, setMovieDetail] = useState({});

    const{imdbId} = useParams();

    useEffect(() => {
        fetchMovieDetailsById(imdbId)

    }, [])

   const fetchMovieDetailsById = async (imdbId) => {
      const response = await client.fetchMovieById(imdbId);
      setMovieDetail(response)
    
      
  }

    return(
        <div style={{color:"white"}}>
        <h1>{movieDetail.Title}</h1>
        <img src= {movieDetail.Poster}></img>
        <h6> {movieDetail.Rated}</h6>
        <p> Plot: {movieDetail.Plot}</p>
        <p> Released: {movieDetail.Released}</p>
        <p> Director: {movieDetail.Director}</p>
        </div>
    )
}

export default MovieDetails