import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {useSelector, useDispatch } from "react-redux";
import { dropId } from "../../redux/actions";

import './details.css'



const Detail = ()=>{
  const videojuegos = useSelector(state=> state.videogamesid)
  const [videogame, setVideogame] = useState({});
  const {pathname} = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {id} = useParams()
    useEffect(()=>{
      return ()=>{
        setVideogame({})
      }
    },[pathname])
    
    useEffect(()=>{
      dispatch(dropId(id))
    }, [videogame])
    
    useEffect(()=> {
      try{
         
        if(videojuegos.length > 1){
        const juego = videojuegos.find(juego=> juego.id == id)
          setVideogame(juego)
        }else{
          setVideogame(videojuegos)
        }
        console.log(videojuegos);
      }catch(error){
        throw Error ({error:'problemas con las solicitud'})
      }
    },[id])
    let platform;
    let store;
    let genres;
    let tags;
    
    if(!isNaN(videogame.id)){
      if (videogame && videogame.stores) {
        const stores = videogame.stores;
        store = stores.map(value => value.store);
      }
      if(videogame.platforms ){
        platform = videogame.platforms.map(value=> value.platform) 
      }
      if(videogame.tags){
        tags= videogame.tags.map(value => value)
      }
     
    }else{
      if(videogame.platforms && videogame.genres ){
    platform = videogame.platforms.map(e=>e).join(', ')
    genres = videogame.genres.map(e=>e)
  }
  
}
console.log(platform);
console.log(genres);
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
     <img src={videogame.background_image} alt = {videogame.name} /><br/>
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
      
     {videogame && !isNaN(videogame.id) ? (
     
     <div className="carta">
      <p className="descripcion" ><b>Description : </b>{videogame?.description_raw}</p>
       <p><b>platforms : </b> {mapName(platform)}</p>
       <p><b>Release Date : </b> {videogame?.released}</p>
       <p><b>rating : </b> {videogame?.rating}</p>
       <p><b>genres : </b>{mapName(videogame?.genres)}</p>
       <p><b>clasificacion : </b>{videogame?.esrb_rating?.name}</p>
       <p><b>disponible en : </b>{mapName(store)}</p>
     </div>
     
     ) : videogame && (
      <div>
     <img style={{borderStyle:"outset; border-width: 5px", width:"50%", height: "auto",borderRadius:"100%", borderInlineColor:"Highlight 10px", border:"10px solid #00ffff"}} src={videogame.image} alt = {videogame.name} /> 
     <div className="carta">
      <div className="info">
      <p ><b>Description : </b>{videogame?.description}</p>
       <p><b>platforms : </b> {platform}</p>
       <p><b>Release Date : </b> {releaseDate}</p>
       <p><b>rating : </b> {videogame?.rating}</p>
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