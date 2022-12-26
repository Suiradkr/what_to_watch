import "../index.css";
import { useState, useEffect } from "react";
import MovieModal from "./MovieModal";
import axios from "axios";
import '../../node_modules/bootstrap/js/src/modal';

export default function FilmCard(props) {
  const [showModal, setShowModal] = useState(false);
  const [filmId, setFilmId] = useState(props.movie.imdbID);
  const [isFav, setIsFav] = useState(false)
  
  async function addFavorite(film_id){
    await axios
    .post("/api/addFavorite/", {'film_id':film_id})
    .then((response) => {
    
      
    })
  }
  async function deleteFavorite(film_id){
    console.log(film_id)
    await axios
    .delete("/api/deleteFavorite/", {'data':{'film_id':film_id}})
    .then((response) => {
     
      props.getFavorites()
      
    })
  }
  

  useEffect(() => {
    console.log(showModal)
    if (props.getFavorites){
      props.getFavorites()
      
    }
  }, []);

  return (
    <>
      <div class="card-box" onClick={() => setShowModal(true)}>
        <img src={props.movie.Poster} alt={props.movie.Title} id={filmId} />
      </div>
      {showModal ? <MovieModal rating={props.movie.Rated} genre={props.movie.Genre} getFavorites={props.getFavorites} movie={props.movie} movieID={props.movie.imdbID} showModal={showModal} setShowModal={setShowModal} title={props.movie.Title} plot={props.movie.Plot}/> : <></>}
    </>
  );
}
