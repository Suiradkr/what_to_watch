import NavBar from "./NavBar"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import FilmCard from "./FilmCard";

function AllTvShowsPage(props){

    const navigate = useNavigate();

    useEffect(() => {
      props.getTvShows();
        props.user_info();
    }, [props.isLoggedIn, props.user]);

    return(
        <>
            <NavBar />
            <h2>Shows</h2>
            <header>
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
    )
}
export default AllTvShowsPage