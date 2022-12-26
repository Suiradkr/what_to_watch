import "../App.css";
import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import '../../node_modules/bootstrap/js/src/modal';
import '../../node_modules/bootstrap/js/src/alert';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


export default function MovieModal(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => props.setShowModal(false);
  const [showModal, setShowModal] = useState(false);
  const [filmId, setFilmId] = useState(props.movie.imdbID);
  const [modalButton, setModalButton] = useState();
  const [filmInfo, setFilmInfo] = useState();
  const [showInfo, setShowInfo] = useState(false);
  
  async function addFavorite(film_id){
    console.log(film_id)
    await axios
    .post("/api/addFavorite/", {'film_id':film_id})
  }
  async function deleteFavorite(film_id){
    console.log(film_id)
    await axios
    .delete("/api/deleteFavorite/", {'data':{'film_id':film_id}})
    .then((response) => {
      if (response.data['success'])
      {if (props.getFavorites){
        props.getFavorites()
      }}
      
      
    })
  }
  
  async function inFavorites(id){
    console.log(id)
    await axios 
    .post("/api/inFavorites/", {'id':id})
    .then((response) =>{
      setModalButton(response.data['in_list'])
    })
  }

  async function getFilmDetails(id){
    await axios
    .post('/api/getFilmDetails/', {'id':id})
    .then((response) => {
      setFilmInfo(response.data['details'])
     
    })
  }
  useEffect(() => {
    console.log(filmInfo)
    inFavorites(props.movieID)
    if (props.getFavorites){
      props.getFavorites()
      
    }
  },[]);

  return (
    <>
     
      <Modal show={props.showModal} onHide={handleClose} scrollable={true} centered>
        <Modal.Header closeButton>
          <Modal.Title>{props.title} </Modal.Title>
          
        </Modal.Header>
        
        <Modal.Body scrollable="true">{props.rating} | {props.genre}<br/>
        {props.plot}<br/>
        {showInfo ? <><a href={filmInfo && filmInfo.trailer} target='_blank'> Watch Trailer</a><br/></> : ''}
        {showInfo ? (filmInfo && filmInfo.sources.map((source) => {
          return(<><a href={source.web_url} target='_blank'>{source.name}</a><br/></>)
          
        })): <>No Sources</>}
        </Modal.Body>
        <Modal.Footer>
          { showInfo ? <Button variant='info' onClick={() => {setShowInfo(!showInfo)}}>Less Details</Button>:<Button variant='info' onClick={() => {setShowInfo(!showInfo),getFilmDetails(props.movieID)}}>More Details</Button>}
          { modalButton ? <Button variant="danger" onClick={() => (deleteFavorite(props.movieID),handleClose())}>
            Remove from favorites
          </Button> :<Button variant="primary" onClick={() => (addFavorite(props.movieID),handleClose())}>
            Add to favorites
          </Button> }
        </Modal.Footer>
      </Modal>
    </>
  );
}