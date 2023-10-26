import { useState, useEffect } from 'react'
import { useLocation, Route, Routes, useNavigate} from 'react-router-dom';
import axios from 'axios'

import './App.css'

function App() {
  const [Videogames, setVideogames] = useState([]);

const url =`http:localhost:3001/videogames` 
  const onSearch = (id)=>{
    try {
      if(id.length === 0){
        axios(url)
        .then(response => {
          const {data} = response;
          setVideogames(data)
        })
      }
      else if (!isNaN(id)){
     
        axios(`${url}/${id}`)
        .then((response=>{
          const {data} = response;
          if (data.name){
            if (!Videogames.some((game)=> game.id === data.id)){
              setVideogames((oldChars)=>[...oldChars, data])
            }else{
              alert('Este juego ya en esta en la lista')
            }
          }else{
           alert('!no hay Videojuegos con este ID¡') 
          }
    })
        .catch((error)=>{
          throw error;
        })
      
        ) 
      }else{
        if(id.length < 2){
          alert('porfavor ingrese mas de 2️⃣ letras para 🔍 por nombre')
        return;
        }
        const searchResults = [];
        const search = (url) =>{
          axios(`${url}/name?name=${id}`)
          .then((response) =>{
            const {data} = response;
            if (data.error){
              alert ('!can´t find videogame whit this name')
            }else{
              searchResults.push(...data)
            setVideogames(searchResults);
            }
          })
          .catch((error)=>{
            throw error;
          });
        }
      }
    }catch(error){
      throw error
    }
    
  }
  console.log(onSearch(12));

  return (
    <>
     <h1>hola</h1>
    </>
  )
}

export default App
