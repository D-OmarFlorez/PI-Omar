import { 
    CLEAR_VIDEOGAMES, 
    DELETE_GAME, 
    GET_GAMES,
    MOSTRAR_FORM,
    REMOVE_VIDEOGAME,
    UPDATE_GAME,
    SEARCH_GAMES,
    LOAD_VIDEOGAMES,
    DROP_ID,
    LOADING,
    SET_DETAIL
    
} from "./ActionsType"
const initialState = {

    videogamesid:{},
    videogames: [],
    games:[],
    gameData: null,
    showForm: false,
    loading: false
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
                console.log('hola');
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
                case LOAD_VIDEOGAMES:
                    return{
                    ...state,
                    videogames: action.payload    
                    }
                case DROP_ID:
                    return{
                        ...state,
                        videogamesid: action.payload
                    }
                    case LOADING:
                        return{
                            ...state,
                            loading: !state.loading
                        }
                  case SET_DETAIL:
                      return{
                          ...state,
                          videogamesid:{}
                      }
                default:
                    return state;
                
    }
}