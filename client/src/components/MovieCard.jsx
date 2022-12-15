import "../index.css"


export default function MovieCard(props){



return(
    
<div class="flip-card-container">
  <div class="flip-card">

    <div class="card-front">
      <figure>
        <div class="img-bg"></div>
        <img src={props.movie.Poster} alt="Brohm Lake"/>
        <figcaption>{props.movie.Title}</figcaption>
      </figure>

      <ul>
        <li>Detail 1</li>
        <li>Detail 2</li>
        <li>Detail 3</li>
        <li>Detail 4</li>
        <li>Detail 5</li>
      </ul>
    </div>

    <div class="card-back">
      <figure>
        <div class="img-bg"></div>
        <img src={props.movie.Poster} alt="Brohm Lake"/>
      </figure>

     

      <div class="design-container">
        <span class="design design--1"></span>
        <span class="design design--2"></span>
        <span class="design design--3"></span>
        <span class="design design--4"></span>
        <span class="design design--5"></span>
        <span class="design design--6"></span>
        <span class="design design--7"></span>
        <span class="design design--8"></span>
      </div>
    </div>

  </div>
</div>
    
)



} 
/* <div class="movie_card" id="bright">
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
        </div>*/