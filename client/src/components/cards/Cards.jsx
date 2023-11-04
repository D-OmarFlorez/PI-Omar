import { useState } from "react";
import Card from "../card/Card";
import "./Cards.css"
// import {randomCharacter} from '../nav/Nav'
const Cards = ({ Videogames, onClose, onCardClick,  showCloseButton, deleteGame}) => {
 

   Videogames = Array.isArray(Videogames) ? Videogames : [];
   Videogames.flat()
   return(
      <div className="box">     
        
   
         {Videogames?.map((videogame, index)=>{
           if (!videogame) return null;
           const key = videogame.id? videogame.id: `random-${index}`
 
           return(
               <div className="cuerpo" key={key}>
                 {showCloseButton && (
                  <button onClick={()=>console.log("cerrar")} className="close-button">
                     cerrar
                  </button>
                 )} 
            <Card 
              
               id= {key}
               name={videogame.name}
               image={videogame.background_image}
               genre={videogame.genres}
               videogame={videogame}
               onClose={onClose}
               onCardClick={onCardClick}
               deleteGame={deleteGame}
               
               
            />
            </div>
            
            )
         }
         )}
         </div>
         
    
   )
}

export default Cards;