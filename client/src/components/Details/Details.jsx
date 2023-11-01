import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import './details.css'

const Detail = ()=>{
    const {id} = useParams()
    const [videogame, setVideogame] = useState({});
    useEffect(()=> {
        axios(`http://localhost:3001/videogames/${id}`)
        .then(({ data }) => {
          if (data.name) {
           setVideogame(data);
         } else {
           alert('hubo un error al traer el juego');
      }

   })
   .catch ((error)=> {
    console.log('se rompio', error);
   })
  
   return setVideogame({});

    },[id])
    


    const mapName = (element) =>{
        if(element){
        return element.map(item => item.name).join(',')
    }else{
        return ''
    }
}
console.log(videogame);

    return(
    <div className="background">
     <div className="nombredetalle">
      <p>name: {videogame?.name}</p>
      
     </div>
     <img style={{borderStyle:"outset; border-width: 5px", width:"50%", height: "auto",borderRadius:"100%", borderInlineColor:"Highlight 10px", border:"10px solid #00ffff"}} src={videogame.background_image} alt = {videogame.name} /> 
     <div className="carta">
      <p ><b>Description: </b>{videogame?.description_raw}</p>
       <p><b>platforms:</b> {mapName(videogame?.platforms)}</p>
       <p><b>Release Date: </b> {videogame?.released}</p>
       <p><b>rating: </b> {videogame?.rating}</p>
       <p><b>genres: </b>{mapName(videogame?.genres)}</p>
     </div>
     </div>
    
   
       
           
   )
}



export default Detail;