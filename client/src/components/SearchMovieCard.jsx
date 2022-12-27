import "../index.css";
import { useState, useEffect } from "react";
import MovieModal from "./MovieModal";
import axios from "axios";
import '../../node_modules/bootstrap/js/src/modal';
import SearchMovieModal from "./SearchMovieModal";

export default function SearchMovieCard(props) {
  const [showModal, setShowModal] = useState(false);
  const [filmId, setFilmId] = useState(props.film.id);
  const [isFav, setIsFav] = useState(false)
  
  
  useEffect(() => {
    
      
    
  }, []);

  return (
    <>
        <div class="card-box" onClick={() => setShowModal(true)}>
        <img src={props.film.image_url} alt={props.film.name} id={`${props.film.tmdb_type}-${props.film.tmdb_id}`} />
        </div>
        {showModal ? <SearchMovieModal showModal={showModal} name={props.film.name} setShowModal={setShowModal} film_id={`${props.film.tmdb_type}-${props.film.tmdb_id}`}/> : <></>}
    </>
  );
}
