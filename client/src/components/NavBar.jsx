import "../App.css";
import "react-bootstrap";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function NavBar() {

  const [searchTitle, setSearchTitle] = useState()
  const navigate = useNavigate()
  const handleChange = (e) => {
    setSearchTitle(e.target.value)
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  async function search_film(title){
    if (title != '' || title != undefined){
       await axios
    .post('/api/search/', {'search':title})
    .then((response) => {
      
      navigate('/homepage/search/', {'state': {'data':response.data}})
    })
    }
   
  }
  return (
    <nav class="navbar navbar-expand-md navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="/homepage/">
          What2Watch
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor02"
          aria-controls="navbarColor02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarColor02">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <a class="nav-link" href="/homepage/movies/">
                Movies
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/homepage/tvshows/">
                TV Shows
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/homepage/favorites/">
                Favorites
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/homepage/account/">
                Account
              </a>
            </li>
          </ul>
          <form class="d-flex" onSubmit={handleSubmit}>
            <input
              class="form-control me-sm-2"
              type="search"
              placeholder="Search"
              onChange={handleChange}
            ></input>
            <button class="btn btn-outline-dark my-2 my-sm-0" type="submit" onClick={() => search_film(searchTitle)}>
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
    
  );
}
export default NavBar;
