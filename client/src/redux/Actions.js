import { 
    ADD_FAV, 
    REMOVE_FAV,
    GENRE,
    
} from "./ActionsType"

export const addFavGame = (character) => {
    return { type: ADD_FAV, payload: character }
}

export const removeFavGame = (id) => {
    return { type: REMOVE_FAV, payload: id }
}

export const filterGames = (genre)=>{
    return {type:GENRE, payload:genre}
}