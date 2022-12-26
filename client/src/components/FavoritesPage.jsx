import NavBar from "./NavBar"
import { useEffect, useState } from "react"
import FilmCard from "./FilmCard"
import axios from "axios"

function FavoritesPage(props){
  const [favMovies, setFavMovies] = useState();
  async function getFavorites(){
    await axios
    .get("/api/getFavorites/")
    .then((response) => {
      setFavMovies(response.data['list'])
    })
  }
    useEffect(() => {
      
        getFavorites()
        props.user_info()
    },[])

    return(
        <>
            <NavBar />
          
           
           <header>
           {favMovies &&
          favMovies.map((movie) => {
            
            return (
              <>
                <FilmCard getFavorites={getFavorites} movie={movie} movieID={movie.imdbID}/>
                {console.log(movie)}
              </>
            );
          })}
          </header>
         
        </>
    )
}
export default FavoritesPage