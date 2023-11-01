import { useState, useEffect } from 'react'
import { useLocation, Route, Routes, useNavigate, useParams} from 'react-router-dom';
import axios from 'axios'
import Nav from './components/Nav/Nav';
import MainPage from './components/paginaPrincipal/MainPage';
import Cards from './components/cards/Cards';
import PostForm from './components/post/Post';
import LoginComponent from './components/background/BackgroundComponent'
import './App.css'
import Detail from './components/details/Details';


function App() {
  const [Videogames, setVideogames] = useState([]);
  const [games, setGames] = useState([]);
  const [showForm, setShowForm]= useState(false)
  const [gameData, setGameData] = useState()
  const navigate = useNavigate()
 const {pathname} = useLocation();
 const video = Videogames.map(f=>f.platforms)
const {id} = useParams

 console.log(video);

// useEffect(async()=>{
//   try {
//     await axios.get('http://localhost:3001/videogames/genre')
    
//   } catch (error) {
//     alert('no se cargaron los generos')
//     throw Error ('hubo un error al cargar los generos', error)
//   }
// },[])

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
  
    const getGames = () => {
    try {
        axios('http://localhost:3001/videogames/MyGames')
        .then (response =>{ 
            setGames(response.data)
        })
    } catch (error) {
        throw new Error ({'Error': error})
        
    }
}

const deleteGame = async(id) => {
  try {
    const response = await axios.delete(`http://localhost:3001/videogames/${id}`)
    if (response.status === 200){
      alert('juego eliminado con exito')
      getGames()
    }
  } catch (error) {
    throw Error ('error al eliminar el juego', error)
    
  }
}
const updateGame = async (id) => {
  try {
    const response = await axios.get(`http://localhost:3001/videogames/${id}`);
    const gameData = response.data;

    setGameData({
      name: gameData.name,
      image: gameData.image,
      description: gameData.description,
      platforms: gameData.platforms,
      releaseDate: gameData.releaseDate,
      rating: gameData.rating,
      genreNames: gameData.genreNames

    });

    setShowForm(true);
   
  } catch (error) {
    console.error('Error al obtener datos del juego', error);
  }
};

const handleCloseForm = ()=>{
  setShowForm(!showForm)
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
     navigate (`/Details/${id}`)
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
        <div>
     {pathname !== "/" &&(
      <Nav onSearch={onSearch} limpiarHome={limpiarHome} setRandomGame={random} getGames={getGames}/>
     )}
     </div>
      <LoginComponent BackgroundImage='https://www.xtrafondos.com/wallpapers/assassins-creed-15-aniversario-11354.jpg'></LoginComponent>
     <Routes>
     
      <Route path ='/home' element={<Cards Videogames={Videogames} onCardClick={handleCardClick}
      onClose={onClose} getGames={getGames}  />} ></Route>
      <Route path ='/' Component={MainPage}></Route>
      <Route path ='/Details/:id' element={<Detail/>}/>

     </Routes>
     <p></p>
    {pathname!== "/" && games.map((game) =>(
      
      <div key={game.id}>
          <p>{game.name}</p>
          <img className='imagenDb' src={game.image} alt={game.name}/>
          <button  onClick={() => deleteGame(game.id)}>Eliminar</button>
          <div>
          {showForm &&
          <div className='containerup'>
          <div className='updatediv'>
          <PostForm id={game.id} />
          <button className='close-button' onClick={handleCloseForm}>X</button>
          </div>
          </div>}
          </div>
           <button onClick={()=>updateGame(game.id)}>Actualizar</button>
            </div>
            
          
   ))}
    
     </div>
    </div>
  )
  
}
export default App
