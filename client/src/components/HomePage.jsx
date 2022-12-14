import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'
import MovieCard from './MovieCard'

function HomePage(props){
    const navigate = useNavigate()
    //const [mov, setMovprops.movies)
    let moviedata = []
    console.log(props.movies)
   
    useEffect(() => { 
        //props.getData()
        if(!props.isLoggedIn){
            navigate('/')
        }
       
        //moviedata = props.movies
    },[props.isLoggedIn])

    return (
        <div >
            <h1>You've made it to your homepage!!!</h1>
            {props.movies && props.movies.map((movie) =>{

                return (
                    <MovieCard movie={movie}/>
                )
            })}
            
            <button onClick={() => props.logout_user()}>Logout</button>

        </div>
    )

}
export default HomePage