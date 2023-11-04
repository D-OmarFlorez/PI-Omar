import { useState, useEffect } from 'react'
import { useLocation, Route, Routes, useNavigate, useParams} from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import axios from 'axios'
import Nav from './components/Nav/Nav';
import MainPage from './components/paginaPrincipal/MainPage';
import Cards from './components/cards/Cards';
import PostForm from './components/post/Post';
import LoginComponent from './components/background/BackgroundComponent'
import './App.css'
import Detail from './components/details/Details';
import GameList from './components/filtro/Filter';
import HomePage from './components/homepage/HomePage';
import {
  removeVideogame, 
  limpiarHomes,
  mostrarForm,
  getGame,

  searchGames
} from './redux/actions';
import GamesDB from './components/gamesDb/GamesDb';

function App() {
const Videogames = useSelector(state => state.videogames)
const showForm = useSelector(state => state.showForm)
const dispatch = useDispatch()
const navigate = useNavigate()
const {pathname} = useLocation();
const games = useSelector(state=> state.games)
 
const onSearch = (idVideogames)=>{
  dispatch(searchGames(idVideogames)) 
  }
  
const getGames = () => {
  dispatch(getGame())
}

const handleCloseForm = ()=>{
  dispatch(mostrarForm())
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
      <Nav onSearch={onSearch} limpiarHome={limpiarHome}  getGames={getGames}/>
     )}
     </div>
      <LoginComponent BackgroundImage='https://www.xtrafondos.com/wallpapers/assassins-creed-15-aniversario-11354.jpg'></LoginComponent>
     <Routes>
     
      <Route path ='/home' element={Videogames.length === 0 ? (
        <HomePage/>
      ):(
      <Cards Videogames={Videogames} onCardClick={handleCardClick}
      onClose={onClose} getGames={getGames}  />)} >
  </Route>
      <Route path ='/' Component={MainPage}></Route>
      <Route path ='/Details/:id' element={<Detail/>}/>
      <Route path ='/filter' element={<GameList onCardClick={handleCardClick} onClose={onClose}/>}/>
      <Route path = '/gamesdb' element={<GamesDB/>}/>
     </Routes>
     
     </div>
    </div>
  )
  
}
export default App
