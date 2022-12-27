import axios from "axios";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../App.css";
import FilmCard from "./FilmCard";
import NavBar from "./NavBar";
import React from "react";
import Multiselect from 'multiselect-react-dropdown'
import MovieModal from "./MovieModal";
import '../../node_modules/bootstrap/js/src/modal';

function HomePage(props) {
  const navigate = useNavigate();
  const [genres,setGenres] = useState([]);
  const [field, setField] = useState([]);
  const [randomFilm,setRandomFilm] = useState()
  const [showModal, setShowModal] = useState(false);

  async function generate_film_genres(){
    await axios
    .get('/api/genres/')
    .then((response) => {
      setGenres(response.data['genres'].map((genre) => {
        return({'name':genre.name,'id':genre.id})
      }))
    })
  }

  async function generate_film(){
    if (field == []){
      setField([''])
    }
await axios
    .post('/api/generate/', {'genres':field})
    .then((response) => {
      setRandomFilm(response.data['film']) 
    })
  }


  useEffect(() => {
    props.getData();
    props.getTvShows();
    generate_film_genres();
    
    if (!props.isLoggedIn) {
      navigate("/");
    }
    
  }, [props.isLoggedIn, props.user, field, showModal]);

  return (
    <>
      <NavBar />
    
     <Button onClick={() => generate_film()}><h1>What2Watch</h1></Button>
    {randomFilm ?  <header><div class="card-box" onClick={() => setShowModal(true)}>
        <img src={randomFilm.Poster} alt={randomFilm.title} id={randomFilm.id} />
      </div>  {showModal ? <MovieModal buttons={true} rating={randomFilm.Rated} genre={randomFilm.Genre} getFavorites={props.getFavorites} movie={randomFilm} movieID={randomFilm.imdbID} showModal={showModal} setShowModal={setShowModal} title={randomFilm.Title} plot={randomFilm.Plot}/> : <></>}</header> :''}
   
      <div className="select-drop">
        <Multiselect placeholder='Genres' isObject={true} displayValue='name' options={genres} showCheckbox onRemove={(e)=>setField(e)} onSelect={(e)=>setField(e)}/>
        
      </div>
     
    <header>
      
        {props.movies &&
          props.movies.map((movie) => {
            return (
              <>
                <FilmCard movie={movie} />
                
              </>
            );
          })}
        {props.tvShows &&
          props.tvShows.map((shows) => {
            return (
              <>
                <FilmCard movie={shows} />
              </>
            );
          })}
      
      </header>
      
     
    </>
  );
}
export default HomePage;
