import NavBar from "./NavBar"
import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { useState } from "react";
import SearchMovieModal from "./SearchMovieModal";
import SearchMovieCard from "./SearchMovieCard";

function SearchPage(props){

    const location = useLocation();
    const [searchResults, setSearchResults] = useState();
    const [showModal,setShowModal] = useState(false)
    
    useEffect(() => {
        setSearchResults(location.state.data.data)
        props.user_info()
        
    },[])

    return(
        <>
            <NavBar />
           <h2>Search Results</h2>
           <header>
           {searchResults && searchResults.map((film) => {

            return(
                <SearchMovieCard film={film} />
            )
           })}
           </header>
        </>
    )
}
export default SearchPage