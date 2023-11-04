import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './details.css'

const Detail = ()=>{
  const navigate = useNavigate()
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

    let platform;
    let store;
    let genres;
    if(!isNaN(videogame.id)){
      if (videogame && videogame.stores) {
        const stores = videogame.stores;
        store = stores.map(value => value.store);
      }
      if(videogame.platforms){
        platform = videogame.platforms.map(value=> value.platform)
        
      }
    }else{
      if(videogame.platforms && videogame.genres){
    platform = videogame.platforms.map(e=> e)
    genres = videogame.genres.map(e=>e)
  }
    }
const back = ()=>{
  navigate('/home')
}
    const mapName = (element) =>{
        if(element){
        return element.map(item => item.name).join(', ')
    }else{
        return ''
    }
}
const mapDb =(element) =>{
  if(element){
    return element.map(item=> item).join(',')
  }else{
    return ''
  }
}
let date
if(isNaN(videogame.id)){
  date = videogame.releaseDate
}
let releaseDate
if(typeof date === 'string'){
  releaseDate = date.substring(0, 10)
}


    return(
    <div className="background">
      <button onClick={back}>←</button>
     <div className="nombredetalle">
      <div className="detallesLeft">
      <p>name: {videogame?.name}</p>
     <img src={videogame.background_image} alt = {videogame.name} /> 
      </div>
     </div>
     <div className="detallesDerecha">
     {!isNaN(videogame.id) ? (
     
     <div className="carta">
      <p ><b>Description: </b>{videogame?.description_raw}</p>
       <p><b>platforms: </b> {mapName(platform)}</p>
       <p><b>Release Date: </b> {videogame?.released}</p>
       <p><b>rating: </b> {videogame?.rating}</p>
       <p><b>genres: </b>{mapName(videogame?.genres)}</p>
       <p><b>clasificacion: </b>{videogame?.esrb_rating?.name}</p>
       <p><b>disponible en: </b>{mapName(store)}</p>
     </div>
     
     ) : (
      <div>
     <img style={{borderStyle:"outset; border-width: 5px", width:"50%", height: "auto",borderRadius:"100%", borderInlineColor:"Highlight 10px", border:"10px solid #00ffff"}} src={videogame.image} alt = {videogame.name} /> 
     <div className="carta">
      <p ><b>Description: </b>{videogame?.description}</p>
       <p><b>platforms: </b> {mapDb(platform)}</p>
       <p><b>Release Date: </b> {releaseDate}</p>
       <p><b>rating: </b> {videogame?.rating}</p>
       <p><b>genres: </b>{mapDb(genres)}</p>
       </div>
       </div>
     )}
     </div>
     </div>
    
   
       
           
   )
}



export default Detail;