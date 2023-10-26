import { 
    ADD_FAV, 
    REMOVE_FAV,
    GENRE,
    
} from "./ActionsType"
const initialState = {

    myFavGames: [],
    allFavGames:[]
}
export const reducer = (state= initialState, action)=>{
    switch (action.type){
        case ADD_FAV:
            return{
                ...state,
                myFavGames:[...state.allFavGames, action.payload],
                allFavGames:[...state.allFavGames, action.payload]
            }
        case REMOVE_FAV:
            return{
                ...state,
                myFavGames: state.myFavGames.filter(({id})=>{
                    return id !== action.payload
                })
            }
        case GENRE:
        const filterByGenre=[...state.allFavGames].filter((favGame)=> favGame.genre === action.payload)    
        
    }
}