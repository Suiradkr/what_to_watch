import "../scss/styles.scss"


export default function MovieCard(props){



return(
    <div class="movie_card" id="bright">
        <div class="info_section">
            <div class="movie_header">
                <img class="locandina" src={props.movie.Poster} />
                <h1>{props.movie.Title}</h1>
                <h4>{props.movie.Year}, {props.movie.Director}</h4>
                <span class="minutes">{props.movie.Runtime}</span>
                <p class="type">{props.movie.Genre}</p>
            </div>
            <div class="movie_desc">
                <p class="text">
                    {props.movie.Plot}</p>
            </div>
            <div class="movie_social">
                <ul>
                {props.movie.sources && props.movie.sources.map((source) =>{
                    return(
                <li><i class="material-icons"><a href={source.web_url}>{source.name}</a></i></li>
                            )})}
                    
                
                </ul>
            </div>
        </div>
        </div>
    
)



}