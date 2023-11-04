import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const foros = [
        { nombre: 'Reddit', url: 'https://www.reddit.com/r/VideojuegosMX/' },
        { nombre: 'Fandom', url: 'https://www.fandom.com/explore-es?uselang=es#Juegos' },
        { nombre: '3D Juegos', url: 'https://www.3djuegos.com/' },
        { nombre: 'Foros de LoL', url: 'https://www.leagueoflegends.com/es-mx/' },
        { nombre: 'Foros de Call of Duty', url: 'https://www.codforums.com/' },
        { nombre: 'EA noticias', url: 'https://www.ea.com/es-es/forums' },
    ];

    return (
        <div>
            <h2>Foros</h2>
            <ul>
                {foros.map((foro, index) => (
                    <li key={index}>
                        <Link to={foro.url}>{foro.nombre}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HomePage;
