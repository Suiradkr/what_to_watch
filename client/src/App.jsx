import "./App.css";

import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUpPage from "./components/SignUpPage";
import LoginPage from "./components/LoginPage";
import { useState, useEffect} from "react";
import HomePage from "./components/HomePage";
import AccountPage from "./components/AccountPage";
import AllMoviesPage from "./components/AllMoviesPage";
import AllTvShowsPage from "./components/AllTvShowsPage";
import FavoritesPage from "./components/FavoritesPage";
import '.././node_modules/bootstrap/js/src/collapse';
import '.././node_modules/bootstrap/js/src/modal';
import '.././node_modules/bootstrap/js/src/dom/event-handler';
import SearchPage from "./components/SearchPage";


export default function App() {


  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState()
  const [movies, setMovies] = useState();
  const [tvShows, setTvShows] = useState();
  const [favMovies, setFavMovies] = useState();
  function getCookie(name) {
  
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }
  const csrftoken = getCookie("csrftoken");
  axios.defaults.headers.common["X-CSRFToken"] = csrftoken;

  async function signup_user(firstname, lastname, email, password) {
    await axios
      .post("/api/signup_user/", {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response.data);
      })
      
  }

  async function login_user(email, password) {
    await axios.post("api/login_user/", { email: email, password: password })
    .then((response) => {
      console.log(response.data)
      if (response.data['success']){
        setIsLoggedIn(true)
        console.log(response.data['user'])
        setUser(response.data['user'])
      }else{
        setIsLoggedIn(false)}
        
    })
    
  }

   async function logout_user(){
    await axios
      .get("api/logout_user/")
      .then((response) => {
        setIsLoggedIn(false)
        setMovies([])
        setUser('')
        console.log(response)

    })
  }

  async function getData(){
    await axios
      .get("/api/moviedata/")
      .then((response)=> {
        if (response.data['success']){
          setIsLoggedIn(true)
          setMovies(response.data['data'])
        }else{
          
          console.log(response.data['user'])
        }
      })}

  async function getTvData(){
    await axios
      .get("/api/tvdata/")
      .then((response)=> {
        if (response.data['success']){
          setIsLoggedIn(true)
          setTvShows(response.data['data'])
        }else{
          console.log(response.data['user'])
        }
      })}

  async function getUserInfo(){
    await axios
    .get("/api/whoami/")
    .then((response) => {
      setUser(response.data.user)
    })
  }

  async function getFavorites(){
    await axios
    .get("/api/getFavorites/")
    .then((response) => {
      setFavMovies('')
      setFavMovies(response.data['list'])
    })
  }

  
 useEffect(() =>{


 },[isLoggedIn,user,favMovies])
  
  return (
    <div className="App">
     
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={<LoginPage login_user={login_user} isLoggedIn={isLoggedIn}/>}
          />
          <Route
            path="/signup/"
            element={<SignUpPage create_user={signup_user} isLoggedIn={isLoggedIn}/>}
          /> 
          <Route path="/homepage/" element={<HomePage getFavorites={getFavorites} user={user} user_info={getUserInfo} logout_user={logout_user} getData={getData} getTvShows={getTvData} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} movies={movies} tvShows={tvShows}/>} />
          <Route
            path="/homepage/account/"
            element={<AccountPage user={user} user_info={getUserInfo} isLoggedIn={isLoggedIn} />}
          />
           <Route
            path="/homepage/favorites/"
            element={<FavoritesPage user={user} user_info={getUserInfo} isLoggedIn={isLoggedIn} favMovies={favMovies} getFavorites={getFavorites} />}
          />
          <Route path="/homepage/movies/" element={<AllMoviesPage user={user} user_info={getUserInfo} movies={movies} getData={getData} isLoggedIn={isLoggedIn} />} />
          <Route path="/homepage/tvshows/" element={<AllTvShowsPage user={user} user_info={getUserInfo} getTvShows={getTvData} tvShows={tvShows} isLoggedIn={isLoggedIn} />} />
          <Route path="/homepage/search/" element={<SearchPage getFavorites={getFavorites} user={user} user_info={getUserInfo} logout_user={logout_user} getData={getData} getTvShows={getTvData} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} movies={movies} tvShows={tvShows}/>} />
        </Routes>
      </Router>
    </div>
  );
}


