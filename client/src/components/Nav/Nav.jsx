import SearchBar from "../searchBar/SearchBar";
import { useState, useEffect } from "react";
import React from "react";
import {useNavigate} from "react-router-dom"
import './nav.css'
/**components */
import PostForm from "../post/Post";
import { loading } from "../../redux/actions";

const Nav =({onSearch, limpiarHome, playaudio, loadings}) =>{

    const [confirm, setConfirm] = useState (false);
    const [randomGame, setRandomGame] = useState(null);
    const navigate = useNavigate();
    const [showForm, setShowForm]= useState(false)
    const [navVisible, SetNavVisible]= useState(true);

    const Logout = () =>{
        playaudio()
        navigate('/');
    }
    const logoutClick = () =>{
        loadings()
        setConfirm(true);
        limpiarHome()
    }
    const salirConfirm = () => {
        setConfirm(false);
    }

    const handleShowForm=()=>{
        playaudio()
        setShowForm(!showForm)
    }
    const principal = ()=>{
        playaudio()
        loadings()
        navigate('/home')
    }
    const filter = () =>{
        playaudio()
        loadings()
        navigate('/filter')
    }
    const myGames = () =>{
        loadings()
        playaudio()
        navigate('/gamesdb')
    }
    const about = ()=>{
        playaudio()
        loadings()
        navigate('/about')
    }
   
let timeoutId
const closeNav = () => {
  timeoutId = setTimeout(() => {
    SetNavVisible(false);
  }, 4000);
};

const cancelCloseNav = () => {
  clearTimeout(timeoutId);
};

useEffect(() => {
  closeNav(); 
  return () => {
    clearTimeout(timeoutId);
  };
}, []);

const handleMouseEnter= ()=>{
    cancelCloseNav();
}
const handleMouseLeave = () =>{
    closeNav()
}
return(
    <div>   
         <button className="toggle-nav" onClick={() =>{ SetNavVisible(!navVisible); playaudio()}}
        >
            {navVisible ? '☰' : '☰'}
        </button>
         <div>
    {navVisible &&
        <nav className={`navBar ${navVisible ? '' : 'hide'}`} onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseEnter}>

       <SearchBar onSearch={onSearch} loading={loadings}/>

        <button onClick={logoutClick}>
            Pagina Principal
        </button>
        <button onClick={filter}>search</button>
        <button onClick={principal}>volver a inicio</button>
        {confirm&&(
            <div onClick={salirConfirm} style={{borderRadius:"30px", position: 'fixed',color:'black', top: '30%', left: '50%', right: 0,width:'50%', height:'20%', bottom: 0, backgroundColor: 'rgba(225,275,214,0.9)', transform:"translate(-50%, -50%)", overflow:"auto", border:" 4px solid black"}}>
                <p>!seguro que quieres salir?</p>
                <div className="log">
                <button className="loga" onClick={Logout}>si</button>
                <button className="loga" onClick={salirConfirm}>no</button>
                </div>
                </div>)}
        <button onClick={handleShowForm}>
            {showForm ? 'crea un juego!' : 'crea un juego!'}
        </button>
        <button onClick={myGames}>MyGames</button>
        <button onClick={limpiarHome}>limpiar todo</button>
        <button onClick={about}>Acerca de</button>
        </nav>
}
        {showForm && (
            
        <div className="form" >
            
        <PostForm/>
        <button onClick={handleShowForm} className="close-button"></button>

        </div>
        )}
         
         </div>

    </div>
)
}
export default Nav