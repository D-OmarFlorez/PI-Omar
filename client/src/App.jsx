import { useState, useEffect } from 'react'
import { useLocation, Route, Routes, useNavigate} from 'react-router-dom';
import axios from 'axios'
import Nav from './components/Nav/Nav';
import MainPage from './components/paginaPrincipal/MainPage';
import Cards from './components/cards/Cards';
import LoginComponent from './components/background/BackgroundComponent'
import './App.css'


function App() {
  const [Videogames, setVideogames] = useState([]);
  const [detalles, setDetalles]=useState(false);
 const {pathname} = useLocation();
const url =`http://localhost:3001/videogames` 
  const onSearch = (idVideogames)=>{
    try {
      if(idVideogames.length === 0){
        axios(url)
        .then(response => {
          const {data} = response;
          setVideogames(data)
          
        })
      }
      else if (!isNaN(idVideogames)){
     
        axios(`${url}/${idVideogames}`)
        .then(response=>{
          const {data} = response;
          if (data.name){
            if (!Videogames.some((game)=> game.idVideogames === data.idVideogames)){
              setVideogames((oldChars)=>[...oldChars, data])
            }else{
              alert('Este juego ya en esta en la lista')
            }
          }else{
           alert('!no hay Videojuegos con este ID¡') 
          }
    }).catch((error)=>{
        throw Error (error);
        })
      
      }else{
        if(idVideogames.length < 3){
          alert('porfavor ingrese mas de 2️⃣ letras para 🔍 por nombre')
        return;
        }
        const searchResults = [];
          axios(`${url}/name?name=${idVideogames}&page_size=15`)
          .then((response) =>{
            const {data} = response;
            if (data.error){
              alert ('!can´t find videogame whit this name')
            }else{
              const Data = data.flat().slice(0, 15)    
                            
              searchResults.push(...Data)
            setVideogames(searchResults);
            }
          })
          .catch((error)=>{
            throw error;
          });
        }
      }catch(error){
        throw error
      }
  
    }
    const handleClose = ()=>{
      setShowDetail(false);
      setSelectedCharacter(null);
    }  
    const onClose = (id) => {
      const videogameFilter = Videogames.filter((videogame) => {
        return videogame.id !== id; // Filtrar personajes cuyo ID no coincida
      });
      setVideogames(videogameFilter);
    }
    const handleCardClick = async (id) => {
      try {
        const response = await axios(`http://localhost:3001/videogames${id}`);
        const { data } = response;
    
        setDetalles(data);
        setPersonaje(true);
      } catch (error) {
        console.error('Error al obtener detalles del videojuego', error);
      }
    };
    const limpiarHome= () =>{ 
      setVideogames([]);
    }
    const random =(random)=>{
    const [randomGame, setRandomGame]= useState(null); 
    }
  return (
    <div>
      <div className='App'>
     {pathname !== "/" &&(
      <Nav onSearch={onSearch} limpiarHome={limpiarHome} setRandomGame={random}/>
     )}
     
      <LoginComponent BackgroundImage='https://i.pinimg.com/originals/81/df/1c/81df1c66a7bc01dc38bbc4744995ed12.jpg'></LoginComponent>
     <Routes>
     
      <Route path ='/home' element={<Cards Videogames={Videogames} handleCardClick={handleCardClick}
      onClose={onClose} />}></Route>
      <Route path ='/' Component={MainPage}></Route>

     </Routes>
     </div>
    </div>
  )
}

export default App
