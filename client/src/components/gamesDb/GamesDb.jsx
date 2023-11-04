import {  useSelector } from "react-redux/es/hooks/useSelector";
import { deleteGames, fetchGame,  removeVideogame, 
} from "../../redux/actions";
import { useLocation } from "react-router-dom";
import './gamesDb.css'
const GamesDB = () =>{

const {pathname} = useLocation()

const showForm = useSelector(state => state.showForm)

const games = useSelector(state=> state.games)
console.log(games);
const deleteGame = async(id) => {
    dispatch(deleteGames(id))
}
const onClose = (id) => {
    dispatch(removeVideogame(id))
   
   } 
const updateGame = async (id) => {
    dispatch(fetchGame(id, true))
};
return(
    <div>
        {pathname!== "/"  && games.map((game) =>(
      
      <div key={game.id}>
          <p>{game.name}</p>
          <img className='imagenDb' src={game.image} alt={game.name}/>
          <button  onClick={() => deleteGame(game.id)}>Eliminar</button>
          <div>
          <button onClick={()=>updateGame(game.id)}>Actualizar</button>
          {showForm &&
          <div className='containerup'>
          <div className='updatediv'>
          <PostForm id={game.id} ></PostForm>  
          <div className='moveButton'>
          <button className='close-button' onClick={handleCloseForm}>X</button>
          </div>
          </div>
          </div>}
          </div>
          
            </div>
            
          
   ))}
    </div>
)
}
export default GamesDB