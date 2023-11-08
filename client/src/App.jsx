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
  loading,

  searchGames
} from './redux/actions';
import GamesDB from './components/gamesDb/GamesDb';
import About from './components/about/About';

function App() {
const Videogames = useSelector(state => state.videogames)
const loadGif = useSelector(state => state.loading)
const dispatch = useDispatch()
const navigate = useNavigate()
const {pathname} = useLocation();
const [audio] =useState(new Audio(buttonclick))
const playaudio=()=>{
audio.play();
};
console.log(loadGif);
const loadings = ()=>{
  dispatch(loading())
}
const onSearch = (idVideogames)=>{
 
  dispatch(searchGames(idVideogames)) ;
  };
  
const getGames = () => {
  dispatch(getGame());
};

const cerrarForm = () =>{
  dispatch(mostrarForm);
};
const onClose = (id) => {
 dispatch(removeVideogame(id));

}; 
const handleCardClick = async (id) => {
  navigate (`/Details/${id}`);
};
const limpiarHome= () =>{ 
  dispatch(limpiarHomes());
};
    
  return (
    <div>
      <div className='App'>
        <div>
     {pathname !== "/" &&(
      <Nav onSearch={onSearch} playaudio={playaudio} limpiarHome={limpiarHome}  getGames={getGames} loadings={loadings}/>
     )}
     </div >
     <LoginComponent BackgroundImage='https://www.xtrafondos.com/wallpapers/assassins-creed-15-aniversario-11354.jpg'></LoginComponent>
      {loadGif ? (
        <div className='loading-cont'>
          <div className='animated'>
            <img className='imgload' src='https://i.pinimg.com/originals/f0/86/bf/f086bf3d490cddd0c739f002fd993d5c.gif' alt='wait'/>
          </div>
          </div>
      ):(
     <Routes>
     
      <Route path ='/home' element={Videogames.length == 0 ? (
        <HomePage />
      ):(
      <Cards Videogames={Videogames} onCardClick={handleCardClick}
      onClose={onClose} getGames={getGames}  loadings={loadings}/>)} >
  </Route>
      <Route path ='/' Component={MainPage}></Route>
      <Route path ='/Details/:id' element={<Detail loading={loadings}/>}/>
      <Route path ='/filter' element={<GameList onCardClick={handleCardClick} onClose={onClose} loadings={loadings}/>}/>
      <Route path = '/gamesdb' element={<GamesDB games={getGame} handleCloseForm={cerrarForm}/>}/>
      <Route path='/about' element={<About/>}/>
     </Routes>
     )}
     </div>
    </div>
  )
  
}
export default App
