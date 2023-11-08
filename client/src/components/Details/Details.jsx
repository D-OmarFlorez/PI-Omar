import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {useSelector, useDispatch } from "react-redux";
import { dropId, setDet } from "../../redux/actions";

import './details.css'



const Detail = ()=>{
  const videojuegos = useSelector(state=> state.videogamesid)
  // const [videojuegos, setVideogame] = useState({});
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {id} = useParams()
  
    console.log(videojuegos);
   
    useEffect(()=>{
      
      dispatch(dropId(id))
      return ()=>{
        dispatch(setDet())
      }
    },[])
    console.log(!isNaN(videojuegos));
  
   
    let platform;
    let store;
    let genres;
    let tags;
    
    if(!isNaN(videojuegos.id)){
      if (videojuegos && videojuegos.stores) {
        const stores = videojuegos.stores;
        store = stores.map(value => value.store);
      }
      if(videojuegos.platforms ){
        platform = videojuegos.platforms.map(value=> value.platform) 
      }
      if(videojuegos.tags){
        tags= videojuegos.tags.map(value => value)
      }
     
    }else{
      if(videojuegos.platforms && videojuegos.genres ){
    platform = videojuegos.platforms.map(e=>e).join(', ')
    genres = videojuegos.genres.map(e=>e)
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
    return element.map(item=> item.name).join(', ')
  }else{
    return ''
  }
}
let date
if(isNaN(videojuegos.id)){
  date = videojuegos.releaseDate
}
let releaseDate
if(typeof date === 'string'){
  releaseDate = date.substring(0, 10)
}
console.log((videojuegos));
    return(
    <div className="background">
      <button onClick={back}>←</button>
     <div className="nombredetalle">
      <div className="detallesLeft">
      <p>name: {videojuegos?.name}</p>
     <img src={videojuegos.background_image} alt = {videojuegos.name} /><br/>
     <div className="marcador">
     {tags?.map((tag, index) => (
  <p key={index} className="tag">
    {tag.name} 
  </p>
))}
     </div>
      </div>
     </div>
     <div className="detallesDerecha">
      
     {videojuegos && !isNaN(videojuegos.id) ? (
     
     <div className="carta">
      <p className="descripcion" ><b>Description : </b>{videojuegos?.description_raw}</p>
       <p><b>platforms : </b> {mapName(platform)}</p>
       <p><b>Release Date : </b> {videojuegos?.released}</p>
       <p><b>rating : </b> {videojuegos?.rating}</p>
       <p><b>genres : </b>{mapName(videojuegos?.genres)}</p>
       <p><b>clasificacion : </b>{videojuegos?.esrb_rating?.name}</p>
       <p><b>disponible en : </b>{mapName(store)}</p>
     </div>
     
     ) : videojuegos && (
      <div>
     <img style={{borderStyle:"outset; border-width: 5px", width:"50%", height: "auto",borderRadius:"100%", borderInlineColor:"Highlight 10px", border:"10px solid #00ffff"}} src={videojuegos.image} alt = {videojuegos.name} /> 
     <div className="carta">
      <div className="info">
      <p ><b>Description : </b>{videojuegos?.description}</p>
       <p><b>platforms : </b> {platform}</p>
       <p><b>Release Date : </b> {releaseDate}</p>
       <p><b>rating : </b> {videojuegos?.rating}</p>
       <p><b>genres :</b> {mapDb(genres)} </p>
       </div>
       </div>
       </div>
     )}
     </div>
     </div>
    
   
       
           
   )
}



export default Detail;