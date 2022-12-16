import "../index.css"


export default function MovieCard(props){



return(
    
<div class="card-box">
    
    <img src={props.movie.Poster} alt={props.movie.Title} />
    <div class="movie-content">
        <h3>{props.movie.Title}</h3>
        <p>{props.movie.Genre}</p>
    </div>
    
  </div>
    
)
} 