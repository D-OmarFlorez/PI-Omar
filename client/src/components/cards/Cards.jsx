import Card from "../card/Card";
import "./Cards.css"
// import {randomCharacter} from '../nav/Nav'
const Cards = ({ Videogames, onClose, onCardClick, randomGame, showCloseButton}) => {
   Videogames = Array.isArray(Videogames) ? Videogames : [];
   Videogames.flat()
   console.log(Videogames);
   return(
      
      <div className="cabecera">
         {Videogames?.map((videogame, index)=>{
           if (!videogame) return null;
           const key = videogame.id? videogame.id: `random-${index}`
           console.log(videogame.background_image)
            return(
               <div className="cuerpo" key={key}>
                 {showCloseButton && (
                  <button onClick={()=>console.log("cerrar")} className="close-button">
                     cerrar
                  </button>
                 )} 
            <Card 
              
               id= {videogame.id}
               name={videogame.name}
               image={videogame.background_image}
               videogame={videogame}
               onClose={onClose}
               onCardClick={onCardClick}
               
               
            />
            </div>
            
            )
         }
      )}
      
      </div>
   )
}

export default Cards;