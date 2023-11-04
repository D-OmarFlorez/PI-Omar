import { 
    CLEAR_VIDEOGAMES, 
    DELETE_GAME, 
    GET_GAMES,
    MOSTRAR_FORM,
    REMOVE_VIDEOGAME,
    UPDATE_GAME,
    SEARCH_GAMES
    
} from "./ActionsType"
const initialState = {

    videogames: [],
    gameData: null,
    games:[],
    showForm: false
}
export const reducer = (state= initialState, action)=>{
    switch (action.type){
        case REMOVE_VIDEOGAME:
            return{
                ...state,
                videogames: state.videogames.filter(({id})=>{
                    return id !== action.payload
                })
            }
            case CLEAR_VIDEOGAMES:
                return{
                    ...state,
                    videogames: []
                }
            case MOSTRAR_FORM:
                return{
                    ...state,
                    showForm: !state.showForm
                }
            case GET_GAMES:
                return{
                    ...state,
                    games: action.payload
                }
            case DELETE_GAME:
                return{
                    ...state,
                    games: state.games.filter((game)=> game.id !== action.payload)
                }
            case UPDATE_GAME:
                return {
                  ...state,
                  gameData: action.payload.gameData,
                  showForm:action.payload.showForm
                };
            case SEARCH_GAMES:
                return{
                  ...state,
                  videogames: action.payload,
                }
                default:
                    return state;
                
    }
}