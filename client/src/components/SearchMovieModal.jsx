import "../App.css";
import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import '../../node_modules/bootstrap/js/src/modal';
import '../../node_modules/bootstrap/js/src/alert';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


export default function SearchMovieModal(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => props.setShowModal(false);
  
  const [filmId, setFilmId] = useState(props.id);
  const [modalButton, setModalButton] = useState();
 
  const [showInfo, setShowInfo] = useState(false);

  const [showMD,setShowMD] = useState(true);
    const [filmInfo, setFilmInfo] = useState(); 
    const [movieID, setMovieID] = useState();
  
    async function getSearchDetails(id){
        console.log('running')
        await axios
        .post('/api/searchDetails/', {'id':id})
        .then((response) => {
            setFilmInfo(response.data.data)
        })
    }
    
  useEffect(() => {
   setMovieID(props.film_id)
       
    console.log(movieID)
  },[]);

  return (
    <>
     
      <Modal show={props.showModal} onHide={handleClose} scrollable={true} centered>
        <Modal.Header closeButton>
          <Modal.Title>{props.name}</Modal.Title>
          
        </Modal.Header>
        
        <Modal.Body scrollable="true">
        {showInfo ? <>{filmInfo && filmInfo.us_rating} | {filmInfo && filmInfo.genre_names}<br/> {filmInfo && filmInfo.plot_overview}</> : ''}<br/>
        {showInfo ? <><a href={filmInfo && filmInfo.trailer} target='_blank'> Watch Trailer</a><br/></> : ''}
        {showInfo ? <> Where to Watch<br/>{showInfo ? (filmInfo && filmInfo.sources.map((source) => {
          return(<><a href={source.web_url} target='_blank'>{source.name}</a><br/></>)
          
        })): <></>}</>: ''}
        
        </Modal.Body>
        <Modal.Footer>
          { showInfo ? <Button variant='info' onClick={() => {setShowInfo(!showInfo)}}>Less Details</Button>:<Button variant='info' onClick={() => {setShowInfo(!showInfo),getSearchDetails(movieID)}}>More Details</Button>}
         
        </Modal.Footer>
      </Modal>
    </>
  );
}