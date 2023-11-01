import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './mainPage.css'
/**components */
import BackgroundComponent from '../background/BackgroundComponent'

const MainPage = () => {
    const [games, setGames] = useState([]);
    const [currentImage, setCurrentImage] = useState(0);
    const [imagenesCargadas, setImagenesCargadas] = useState(0);

const manejarCarga = () => {
  setImagenesCargadas(imagenesCargadas + 1);
};

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImage(prevImage=>(prevImage + 1) % games.length);
        }, 6000);

        return () => clearInterval(timer); // Limpiar el intervalo cuando el componente se desmonte
    }, [games]);

    useEffect(()=>{
        axios(`http://localhost:3001/videogames`)
        .then (response=>{
            setGames(response.data);
        })
        .catch(error => {throw Error (error,'error')})
    },[]);

    return (
        <div className="main-page">
            <BackgroundComponent BackgroundImage='https://i.pinimg.com/originals/1d/f2/f6/1df2f64578da0fb8b70b85047144b195.gif'  />
                    <h1 style={{
                        fontFamily: 'pressStart2'
                    }}>The Biggest Video Game Database on RAWG - Video Game Discovery Service</h1>
                            <div className='container'>
                <div className='carrusel'>
                    <div className='carousel'>
                        {games[currentImage - 1] && <img className="side-image slide" src={games[currentImage - 1].image} alt={games[currentImage - 1].name} onLoad={manejarCarga} />}
                        <Link to="/home">
                        {games[currentImage] && <img className="main-image slide" src={games[currentImage].image} alt={`Nombre: ${games[currentImage].name}, Rating: ${games[currentImage].rating}, Plataformas: ${games[currentImage].platforms.join(', ')}`} 
        title={`Nombre: ${games[currentImage].name}, Rating: ${games[currentImage].rating}, Plataformas: ${games[currentImage].platforms.map(platform=>platform.platform?.name)}`} onLoad={manejarCarga}/>}
                        </Link>
                        {games[currentImage + 1] && <img className="side-image slide" src={games[currentImage + 1].image} alt={games[currentImage + 1].name} onLoad={manejarCarga}/>}            </div>
                    </div>
                    </div>
                <p>RAWG.IO ♛ Keep all games in one profile ✔ See what friends are playing, and find your next great game.</p>
          
            <Link to="/home">
                <button>Comenzar</button>
            </Link>
        </div>
        
    );
};

export default MainPage;
