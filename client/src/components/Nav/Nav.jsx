import SearchBar from "../searchBar/SearchBar";
import { useState } from "react";
import React from "react";
import {Link, useNavigate} from "react-router-dom"
import axios from "axios"
/**components */
import PostForm from "../post/Post";

const Nav =({onSearch, limpiarHome, mostrarAbout}) =>{

    const [confirm, setConfirm] = useState (false);
    const [randomGame, setRandomGame] = useState(null);
    const navigate = useNavigate();
    const [showForm, setShowForm]= useState(false)

    const Logout = () =>{
        navigate('/');
    }
    const logoutClick = () =>{
        setConfirm(true);
    }
    const salirConfirm = () => {
        setConfirm(false);
    }

    const handleShowForm=()=>{
        setShowForm(!showForm)
    }

    const random = async ()=>{
    try{
        const randomId= Math.round(Math.random() * 855363)
        const response = await axios(`http://localhost:3001/videogames/${randomId}`)
        const {data} = response;

        if(data.name){
            setRandomGame(data);
        }
    }catch(error){
        throw new Error ('Error al encontrar al personage')

    }
}
return(
    <div>
        <nav>
        <button onClick={logoutClick}>
            Pagina Principal
        </button>
        {confirm&&(
            <div onClick={salirConfirm} style={{borderRadius:"30px", position: 'fixed',color:'black', top: '30%', left: '50%', right: 0,width:'50%', height:'20%', bottom: 0, backgroundColor: 'rgba(225,275,214,0.9)', transform:"translate(-50%, -50%)", overflow:"auto", border:" 4px solid black"}}>
                <p>!seguro que quieres salir?</p>
                <button onClick={Logout}>si</button>
                <button onClick={salirConfirm}>no</button>
                </div>)}
        <button onClick={handleShowForm}>
            {showForm ? 'crea un juego!' : 'crea un juego!'}
        </button>
        <button onClick={limpiarHome}></button>
      <SearchBar onSearch={onSearch}/>
        </nav>
        {showForm && (<div style={{ 
        position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#fff',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0px 0px 10px rgba(0,0,0,0.1)'}}>
            
        <PostForm/>
        </div>
        )}
         

    </div>
)
}
export default Nav