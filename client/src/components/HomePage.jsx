import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'
import MovieCard from './MovieCard'
import NavBar from './NavBar'

function HomePage(props){
    const navigate = useNavigate()
    
   console.log(props.isLoggedIn)
    useEffect(() => { 
        props.getData()
        if(!props.isLoggedIn){
            navigate('/')
        }else{
        navigate('/userhomepage/')
        }
       
    },[props.isLoggedIn])

    return (
        <div >
            
            <h1>You've made it to your homepage!!!</h1>
            <div class='row'>
            {props.movies && props.movies.map((movie) =>{

                return (
                    <MovieCard movie={movie}/>
                )
            })}
            </div>
            <button class="btn btn-primary" onClick={() => props.logout_user()}>Logout</button>

        </div>
    )

}
export default HomePage