import { 
    
    REMOVE_VIDEOGAME,
    GENRE,
    CLEAR_VIDEOGAMES,
    MOSTRAR_FORM,
    GET_GAMES,
    DELETE_GAME,
    UPDATE_GAME,
    SEARCH_GAMES,
    LOAD_VIDEOGAMES,
    DROP_ID,
    LOADING,
    SET_DETAIL
    
} from "./ActionsType"
import axios from 'axios'

export const searchGamesSuccess = (games) =>({
    type: SEARCH_GAMES,
    payload: games
})
export const searchGames = (idVideogames) => {
  
    return async (dispatch) => {
      try {
        let url = 'http://localhost:3001/videogames';
        let response;
        if(idVideogames.length === 0){
          response = await axios.get(url);
          
        }
        else if (!isNaN(idVideogames)){
          response = await axios.get(`${url}/${idVideogames}`);
        }else{
          if(idVideogames.length < 3){
            alert('porfavor ingrese mas de 2️⃣ letras para 🔍 por nombre');
            return;
          }
          response = await axios.get(`${url}/name?name=${idVideogames}&page_size=15`);
        }
        if(!isNaN(idVideogames)){
        dispatch(searchGamesSuccess(response.data.videogames));
        }else{
          
        dispatch(searchGamesSuccess(response.data.flat())); 
        
        }
      } catch (error) {
        console.error('Error al buscar los juegos', error);
      }
    };
  };
export const dropIds= (obj)=>{
  return {type: DROP_ID, payload: obj}
}
export const dropId = (id) =>{
  return async(dispatch)=>{
    try{
  const response =await axios(`http://localhost:3001/videogames/${id}`)
  if(!isNaN(id)){
    dispatch(dropIds(response.data.videogames))
  }else{
    dispatch(dropIds(response.data))
  }
    }
    catch(error){
      console.error(error);
    }
  }
}
export const loading = () =>{
  return (dispatch)=>{
    dispatch({type: LOADING})
    setTimeout(() => {
      dispatch({type: LOADING})
    }, 2000);
}
}
export const removeVideogame = (id) => {
    return { type: REMOVE_VIDEOGAME, payload: id }
}
export const loadVideogames = (games)=>{
  return {type: LOAD_VIDEOGAMES, payload: games}
}

export const filterGames = (genre)=>{
    return {type:GENRE, payload:genre}
}
export const limpiarHomes = ()=>{
    return{
        type: CLEAR_VIDEOGAMES
    }  
}
export const mostrarForm = ()=>{
    return{
        type: MOSTRAR_FORM
    }
}
export const getGamesSuccess = (games)=>{
    return{
        type: GET_GAMES,
        payload: games
    }
}
export const getGame = async (dispatch) => {

    try {
        const response = await axios.get('http://localhost:3001/videogames/MyGames');
        
        dispatch(getGamesSuccess(response.data));
      } catch (error) {
        console.error('Error al obtener los juegos', error);
      }
    };
  

export const deleteGameSuccess = (id) => ({
    type: DELETE_GAME,
    payload: id,
  });
  
  export const deleteGames = (id) => {
    return async (dispatch) => {
      try {
        const response = await axios.delete(`http://localhost:3001/videogames/${id}`);
        if (response.status === 200){
          alert('juego eliminado con exito');
          dispatch(deleteGameSuccess(id));
        }
      } catch (error) {
        console.error('Error al eliminar el juego', error);
      }
    };
  };
  export const updateGames = (gameData, showForm) =>({
    type: UPDATE_GAME,
    payload:{gameData, showForm}
  })
  export const setDet = ()=>({
    type: SET_DETAIL,
  
  })
    
  
export const fetchGame = (id, showForm) =>{
    return async(dispatch)=>{
    try {
        const response = await axios.get(`http://localhost:3001/videogames/${id}`);
        const gameData = response.data;
  
        dispatch(updateGames({
          name: gameData.name,
          image: gameData.image,
          description: gameData.description,
          platforms: gameData.platforms,
          releaseDate: gameData.releaseDate,
          rating: gameData.rating,
          genreNames: gameData.genreNames
        }, showForm));
        
      } catch (error) {
        console.error('Error al obtener datos del juego', error);
      }
    };

    
}
