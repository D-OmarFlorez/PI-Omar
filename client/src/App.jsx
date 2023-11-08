import { useLocation, Route, Routes, useNavigate} from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import { useState } from 'react';
import Nav from './components/Nav/Nav';
import MainPage from './components/paginaPrincipal/MainPage';
import Cards from './components/cards/Cards';
import LoginComponent from './components/background/BackgroundComponent'
import './App.css'
import Detail from './components/details/Details';
import GameList from './components/filtro/Filter';
import HomePage from './components/homepage/HomePage';
import buttonclick from './components/estilos/buttonclick.mp3'
import {
  removeVideogame, 
  limpiarHomes,
  mostrarForm,
  getGame,

  searchGames
} from './redux/actions';
import GamesDB from './components/gamesDb/GamesDb';
import About from './components/about/About';

function App() {
const Videogames = useSelector(state => state.videogames)
const dispatch = useDispatch()
const navigate = useNavigate()
const {pathname} = useLocation();
const [audio] =useState(new Audio(buttonclick))
const playaudio=()=>{
audio.play()
}
const onSearch = (idVideogames)=>{
  dispatch(searchGames(idVideogames)) 
  }
  
const getGames = () => {
  dispatch(getGame())
}

const cerrarForm = () =>{
  dispatch(mostrarForm)
}
const onClose = (id) => {
 dispatch(removeVideogame(id))

} 
const handleCardClick = async (id) => {
  navigate (`/Details/${id}`)
};
const limpiarHome= () =>{ 
  dispatch(limpiarHomes())
}
    
  return (
    <div>
      <div className='App'>
        <div>
     {pathname !== "/" &&(
      <Nav onSearch={onSearch} playaudio={playaudio} limpiarHome={limpiarHome}  getGames={getGames}/>
     )}
     </div >
      <LoginComponent BackgroundImage='https://www.xtrafondos.com/wallpapers/assassins-creed-15-aniversario-11354.jpg'></LoginComponent>
     <Routes>
     
      <Route path ='/home' element={Videogames.length == 0 ? (
        <HomePage/>
      ):(
      <Cards Videogames={Videogames} onCardClick={handleCardClick}
      onClose={onClose} getGames={getGames}  />)} >
  </Route>
      <Route path ='/' Component={MainPage}></Route>
      <Route path ='/Details/:id' element={<Detail/>}/>
      <Route path ='/filter' element={<GameList onCardClick={handleCardClick} onClose={onClose}/>}/>
      <Route path = '/gamesdb' element={<GamesDB games={getGame} handleCloseForm={cerrarForm}/>}/>
      <Route path='/about' element={<About/>}/>
     </Routes>
     
     </div>
    </div>
  )
  
}
export default App
