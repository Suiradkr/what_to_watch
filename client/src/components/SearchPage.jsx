import NavBar from "./NavBar"
import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { useState } from "react";


function SearchPage(props){

    const location = useLocation();
    const [searchResults, setSearchResults] = useState();
    useEffect(() => {
        setSearchResults(location.state.data.data)
        props.user_info()
        
    })

    return(
        <>
            <NavBar />
           <h3>Search Results</h3>
           <header>
           {searchResults && searchResults.map((film) => {

            return(
                <div class="card-box">
                <img src={film.image_url} alt={film.name} id={film.imdb_id} />
              </div>
            )
           })}
           </header>
        </>
    )
}
export default SearchPage