import {useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import "./Card.css"


const Card =({ onClose, videogame, onCardClick, deleteGame}  ) => {
    const dispatch = useDispatch();
 const[detalles, setDetalles] = useState(false);
 const [currentImage, setCurrentImage] = useState(videogame.background_image);
 const [imageIndex, setImageIndex] = useState(0);
 const [intervalId, setIntervalId] = useState(null);

 const handleMouseEnter = () => {
   if (videogame.short_screenshots && videogame.short_screenshots.length > 0) {
       const id = setInterval(() => {
           setImageIndex((prevIndex) => (prevIndex + 1) % videogame.short_screenshots.length);
       }, 2000); 
       setIntervalId(id);
   }
};
useEffect(() => {
   if (videogame.short_screenshots && videogame.short_screenshots.length > 0) {
       setCurrentImage(videogame.short_screenshots[imageIndex].image); 
   }
}, [videogame.short_screenshots, imageIndex]);

const handleMouseLeave = () => {
 setCurrentImage(videogame.background_image);
 clearInterval(intervalId);
}
 
 const handleCardClick=()=>{
    setDetalles(true)
 }
 const handleOverlayClick = ()=>{
    setDetalles(!detalles);
 }
 
 const handleButton = (videogame)=>{
   if(isNaN(videogame.id)){
      console.log();
   deleteGame()
   }
 }

 const handleClick =(event)=>{
    event.preventDefault();
    onCardClick(videogame?.id)
 }
 const genreClass = videogame?.genres[0]?.name;
   console.log(genreClass);
   
    return (
       
       
       <div>
         <button onClick={() => {onClose(videogame?.id)}}>❌</button>

          <div className='gameInfo'>
             
                    
          
            
        <div  className={`card`} onClick={ handleClick} onMouseEnter={handleMouseEnter} 
            onMouseLeave={handleMouseLeave}>
          <div onClick={handleCardClick} className={`genre ${genreClass}`}> 
         <div className="caja">
          <h2 className="cuerpoCarta">{videogame?.name}</h2>
          </div>
          {!isNaN(videogame.id) ? ( 
          <img className="cartaJpg" src={currentImage} alt = {videogame?.name} /> 
          ) : (        
           <img className="cartaJpg" src={videogame.image} alt = {videogame?.name} /> 
          )}
          </div>
 
       </div>
    
       </div>
      
   
       </div>
    );
 }
 
 export default Card;