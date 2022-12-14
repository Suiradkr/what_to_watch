import "./App.css";
import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUpPage from "./components/SignUpPage";
import LoginPage from "./components/LoginPage";
import { useState, useEffect} from "react";
import HomePage from "./components/HomePage";
//import "./scss/styles.scss"
//const navigate = useNavigate()
export default function App() {


  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [movies, setMovies] = useState();

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
      .post("api/create_user/", {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response.data);
      })
      .then("/");
  }

  async function login_user(email, password) {
    await axios.post("api/login_user/", { email: email, password: password })
      
    setIsLoggedIn(true)
    
  }

   async function logout_user(){
    await axios
      .get("api/logout_user/")
      .then((response) => {
        setIsLoggedIn(false)
        setMovies([])
        console.log(response)

    })
  }

  async function getData(){
    await axios
      .get("/api/userhomepage/")
      .then((response)=> {
        
        setMovies(response.data['data'])
      })}

 useEffect(() =>{
getData()

 },[isLoggedIn])
  
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
            path="signup/"
            element={<SignUpPage create_user={signup_user} isLoggedIn={isLoggedIn}/>}
          />
          <Route path="userhomepage/" element={<HomePage logout_user={logout_user} getData={getData} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} movies={movies}/>} />
        </Routes>
      </Router>
    </div>
  );
}


