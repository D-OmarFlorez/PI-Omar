import {useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import { addFavGame, removeFavGame } from "../../redux/actions";
import "./Card.css"


const Card =({ onClose, videogame, onCardClick}  ) => {
    const dispatch = useDispatch();
 const[detalles, setDetalles] = useState(false);
 
 const handleCardClick=()=>{
    setDetalles(true)
 }
 const handleOverlayClick = ()=>{
    setDetalles(!detalles);
 }
 
//  const myFavGame = useSelector((state) => state.myFavGames)
 
//     const [isFav, setIsFav] = useState (false);
//    const handleFavorite = () => {
//     if(isFav){
//        setIsFav(false)
//        dispatch(removeFavGame(videogame.idVideogames))
//     } else {
//        setIsFav(true)
//        dispatch(addFavGame({videogame}))
//     }
 
//  }
 
 

 const handleClick =(event)=>{
    event.preventDefault();
    onCardClick(videogame.id)
 }
    // useEffect(()=>{
    //    myFavGame?.forEach(fav => {
    //       if(fav.idVideogames === videogame.idVideogames) {
    //          setIsFav(true)
    //       }
    //    });
    // }, [myFavGame])
    
   
    return (
       
       
       <div>
          <div>
             
          
          
        {/* {
    isFav ? (
       <button onClick={handleFavorite}>❤️</button>
    ) : (
       <button onClick={handleFavorite}>🤍</button>
    )
 } */}
           <button onClick={() => {onClose(videogame.id)}}>❌</button>
          
            
        <div  className="card"  onClick={ handleClick}>
          <div onClick={handleCardClick}> 
 
          <h2>{videogame?.name}</h2>
          <img className="cartaJpg" src={videogame?.background_image} alt = {videogame?.name} /> 
          </div>
         
          {detalles &&(
             <div  onClick={handleOverlayClick} style={{ position: 'fixed', top: '50%', left: '50%', right: 0,width:'40%', height:'91%', bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', transform:"translate(-50%, -50%)", overflow:"auto", border:" 4px solid black"}}>
         <div className="background">
          <div className="nombredetalle">
           <p>name: {videogame?.name}</p>
          </div>
          <img style={{borderStyle:"outset; border-width: 5px", borderRadius:"100%", borderInlineColor:"Highlight 10px", border:"10px solid #00ffff"}} src={videogame.image} alt = {videogame.name} /> 
          <div className="carta">
           <p ><b>Description: </b>{videogame?.description.toString()}</p>
            <p><b>platforms:</b> {videogame?.map(v=> v.platforms).toString()}</p>
            <p><b>Release Date: </b> {videogame?.releaseDate.toString()}</p>
            <p><b>rating: </b> {videogame?.rating.toString()}</p>
            <p><b>genres: </b>{videogame?.map(v=> v.genres).toString()}</p>
          </div>
          </div>
          </div>
        
            
                
                )}
                   {/* <a href="#">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
       </a> */}
       </div>
    
       </div>
      
   
       </div>
    );
 }
 
 export default Card;