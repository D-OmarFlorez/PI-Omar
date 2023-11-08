import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'

const HomePage = () => {
    const foros = [
        { nombre: 'Reddit', url: 'https://www.reddit.com/r/VideojuegosMX/', image:'https://media.wired.com/photos/5954a1b05578bd7594c46869/master/w_1920,c_limit/reddit-alien-red-st.jpg' },
        { nombre: 'Fandom', url: 'https://www.fandom.com/explore-es?uselang=es#Juegos', image:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Fandom_heart-logo.svg/646px-Fandom_heart-logo.svg.png' },
        { nombre: '3D Juegos', url: 'https://www.3djuegos.com/', image:'https://img.weblogssl.com/g/r/png/site-default-icons/3djuegoslat_192_192.png' },
        { nombre: 'Foros de LoL', url: 'https://www.leagueoflegends.com/es-mx/', image:'https://www.leagueoflegends.com/static/logo-1200-04b3cefafba917c9c571f9244fd28a1e.png' },
        { nombre: 'Foros de Call of Duty', url: 'https://www.codforums.com/', image:'https://www.codforums.com/imgs/CODForumsLogoV7.png' },
        { nombre: 'EA noticias', url: 'https://www.ea.com/es-es/forums', image:'https://1000marcas.net/wp-content/uploads/2020/03/Electronic-Arts-Logo-historia-768x1029.jpg' },
    ];

    return (
       <div>
            <h1>Accede a la base de datos de Videojuegos mas grande del mundo</h1>
            <h3>busca tu juego favorito desde la barra de navegacion, o filtralos por tu plataforma o genero favoritos</h3>
            <br></br>
            <h1 className='1'>dale un vistazo a las principales noticias y reportajes del la cultura geek y la cultura gamer solo por SYFY</h1>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/videoseries?si=Y7qtT3DdfDmgpguw&amp;list=PL6Cen8nMa4HgUgt9KDOZFQmiS_HZ352Ok" title="Noticias Gamer" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" className='video' allowfullscreen></iframe>
       <h2>Foros de videojuegos</h2>
       <div className='cont'> 
                {foros.map((foro, index) => (   
                    <div className='card' key={index}>
                        <Link to={foro.url}>{foro.nombre} <img src={foro.image}/></Link>
                </div>    
                ))}
            
        </div>
        </div>
    );
};

export default HomePage;
