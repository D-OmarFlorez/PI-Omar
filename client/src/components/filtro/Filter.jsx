import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../card/Card";
import './filter.css'
import { useDispatch, useSelector } from "react-redux";
import { loadVideogames, loading, searchGames } from "../../redux/actions";
import { useLocation } from "react-router-dom";

const GameList = ({onCardClick, loadings }) => {
    const [games, setGames] = useState([]);
    const dispatch = useDispatch()
    const [selectedGenre, setSelectedGenre] = useState("");
    const [selectedRating, setSelectedRating] = useState("");
    const [selectedPlatform, setSelectedPlatform] = useState("");
    const [selectedClass, setSelectedClass]= useState("")
    const [currentUrl, setCurrentUrl] = useState("http://localhost:3001/videogames");
    const [prevPageUrl, setPrevPageUrl] = useState("");
    const [pag, setPag] = useState(1)
  //  console.log(game);
  
    useEffect(() => {
        if (currentUrl) {
          axios(currentUrl)
          .then((response) => {
            if(currentUrl == 'http://localhost:3001/videogames'){
              dispatch(loadVideogames(response.data.videogames))
              setGames(response.data.videogames);
            }else{
              setGames(response.data.results)
              dispatch(loadVideogames(response.data.results))
              if(currentUrl !== response.config.url){
                setCurrentUrl(response.data.next)
                
              }
            }
          })
          .catch((error) => {
            console.error("Error al cargar los juegos", error);
          });
        }
      }, [currentUrl]);
      const next = (pag) =>{
       
        axios(`http://localhost:3001/videogames/next/${pag}`)
        .then((response)=>{
            setCurrentUrl(response.data.nextpage)
            setPrevPageUrl(response.data.prevPage)
            setPag(pag+1)
          })
          .catch((error)=>{
            throw Error (error,'no se pudo traer el link')
          })
        
              }

      const back = ()=>{
        axios(prevPageUrl)
        .then ((response)=>{
          setCurrentUrl(response.config.url)
          setPrevPageUrl(response.data.previous)
         
          setPag(pag-1)
        })
        .catch((error)=>{
          throw Error (error,'no se pudo traer el link')
        })
      }
      const onCloses = (id) => {
        console.log(id);
        const videogameFilter = games((videogame) => {
          return videogame.id !== id;
        });
        setGames(videogameFilter);
      }
      let filteredGames = []
      if (games && games.length > 0) {
        filteredGames = games.filter((game) => {
         
        const rating = selectedRating ? Math.floor(game.rating) == selectedRating : true;
        let genero
        let plataforms
        let platform;
        let clasificacion;
        if (!isNaN(game.id)) {
          genero = selectedGenre ? (game.genres && game.genres.some(genre => genre.name === selectedGenre)) : true;
          plataforms = game.platforms.map(value => value.platform);
          platform = selectedPlatform ? plataforms.some(plat => plat.name == selectedPlatform) : true;
          clasificacion = selectedClass ? game.esrb_rating?.name == selectedClass : true;
        } else {
          plataforms = game.platforms;
          platform = selectedPlatform ? plataforms.some(plat=> plat == selectedPlatform) : true; 
          let genre = game.genres.flat()  
          let gender = genre.map(a => a.name)
          genero= selectedGenre ? gender.some(gen=> gen == selectedGenre) : true; 
          clasificacion = game.rating 
            }
              
         
            return genero && platform && rating && clasificacion;
          });
        }
      return (
        <div className="colador">
          <div className="navFilter">
          <h1>Navega entre mas de 800.000 videojuegos, y explora cada uno de ellos!!</h1>

        <select value={selectedRating} onChange={(e) => setSelectedRating(e.target.value)}>
          <option value="">Todos los ratings</option>
          <option value="0">0.0-0.9</option>
          <option value="1">1.0-1.9</option>
          <option value="2">2.0-2.9</option>
          <option value="3">3.0-3.9</option>
          <option value="4">4.0-4.9</option>
          <option value="5">5</option>
        </select>

        <select value={selectedClass} onChange={(e)=> setSelectedClass(e.target.value)}>
          <option value="">Todas las clasificaciones</option>
          <option value="Mature">Mature</option>
          <option value="Everyone 10+">Everyone 10+</option>
          <option value="Teen">Adolescentes</option>
          <option value="Adults Only">Adultos</option>
        </select>

        <select value={selectedPlatform} onChange={(p) => setSelectedPlatform(p.target.value)}>
          <option value="">todas las plataformas</option>
          <option value="xbox">Xbox</option>
          <option value="PS2">PS2</option>
          <option value="Linux">Linux</option>
          <option value="PS Vita">PS Vita</option>
          <option value="Android">Android</option>
          <option value="Xbox One">Xbox One</option>
          <option value="Nintendo Switch">Nintendo Switch</option>
          <option value="iOS">iOS</option>
          <option value="macOS">macOS</option>
          <option value="PC">PC</option>
          <option value="Xbox 360">Xbox 360</option>
          <option value="PlayStation 3">PlayStation 3</option>
          <option value="PlayStation 4">PlayStation 4</option>
          <option value="PlayStation 5">PlayStation 5</option>
          <option value="Web">Web</option>
        </select>

        <select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}>
            <option value="">Todos los géneros</option>
            <option value="Action">Action</option>
            <option value="Casual">Casual</option>
            <option value="Adventure">Adventure</option>
            <option value="RPG">RPG</option>
            <option value="Indie">Indie</option>
            <option value="Strategy">Strategy</option>
            <option value="Shooter">Shooter</option>
            <option value="Simulation">Simulation</option>
            <option value="Puzzle">Puzzle</option>
            <option value="Arcade">Arcade</option>
            <option value="Platformer">Platformer</option>
            <option value="Massively Multiplayer">Massively Multiplayer</option>
            <option value="Racing">Racing</option>
            <option value="Sports">Sports</option>
            <option value="Fighting">Fighting</option>
            <option value="Family">Family</option>
            <option value="Board Games">Board Games</option>
            <option value="Educational">Educational</option>
            <option value="Card">Card</option>
          </select>
          </div>
          <div className="box" >
  {filteredGames.map((game, index) => {
    const key= game.id? game.id : `random${index}`
    return(
    
    <div className="game-box" key={key}>
      
    <Card
      key={game.id} 
      name={game.name}
      image={game.background_image}
      videogame={game} 
      onClose={() => onCloses(game.id)} 
      onCardClick={() => onCardClick(game.id)} 
     
    />
    </div>
  )})}
</div>
{prevPageUrl && (
  <button onClick={back}>atras</button>
)}
<button onClick={()=>{ next(pag)}}>adelante</button>
        </div>
);
  }
export default GameList;
