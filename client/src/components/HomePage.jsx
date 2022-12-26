import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import FilmCard from "./FilmCard";


import NavBar from "./NavBar";

function HomePage(props) {
  const navigate = useNavigate();

  useEffect(() => {
    props.getData();
    props.getTvShows();
    
    if (!props.isLoggedIn) {
      navigate("/");
    // } else {
    //   props.user_info();
      // navigate("/userhomepage/");
    }
  }, [props.isLoggedIn, props.user]);

  return (
    <>
      <NavBar />
    
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
      
      <button class="btn btn-primary" onClick={() => props.logout_user()}>
        Logout
      </button>
    </>
  );
}
export default HomePage;
