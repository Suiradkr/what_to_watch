import NavBar from "./NavBar"
import { useEffect } from "react"
import FilmCard from "./FilmCard";
import { useNavigate } from "react-router-dom";
import MovieModal from "./MovieModal";

function AllMoviesPage(props){
    const navigate = useNavigate();
    useEffect(() => {
        props.getData();
        props.user_info();
        
      }, [props.isLoggedIn, props.user]);
    

    return(
        <>
            <NavBar />
          
           {/* <h1>User: {props.user}</h1> */}
           <header>
        {props.movies &&
          props.movies.map((movie) => {
            return (
              <>
                <FilmCard movie={movie} />
                
              </>
            );
          })}
          </header>
        </>
    )
}
export default AllMoviesPage