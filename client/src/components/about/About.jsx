import React, { useState } from 'react';
import './about.css'; 
import imagenAbout from '../estilos/imagenabout.jpg'
const paginas = [
    { nombre: 'Reddit', descripcion: ' Reddit es una red social donde los usuarios pueden publicar enlaces a contenido en la web. Otros usuarios pueden votar a favor o en contra de los enlaces, haciendo que aparezcan más o menos destacados. El subreddit de VideojuegosMX es un espacio dedicado a discutir todo lo relacionado con los videojuegos en México.' },
    { nombre: 'Fandom', descripcion: 'Fandom: Fandom es una plataforma de entretenimiento global que alimenta la pasión de los fans. Es un lugar para explorar, contribuir y celebrar todo sobre videojuegos y otros aspectos de la cultura pop.' },
    {nombre: '3D Juegos', descripcion:'3D Juegos: 3DJuegos es una revista de videojuegos online con noticias, análisis, avances y mucho más. Es un lugar ideal para los jugadores que buscan las últimas noticias y reseñas de videojuegos.'},
    {nombre: 'LOL', descripcion:'Foros de LoL (League of Legends): League of Legends es un juego en línea competitivo que combina la velocidad y la intensidad de un RTS con elementos de RPG. Los foros de LoL son un lugar para discutir estrategias, compartir guías y consejos, y hablar sobre todo lo relacionado con League of Legends.'},
    {nombre: 'Call Of Duty', descripcion:'Foros de Call of Duty: Call of Duty es una serie de videojuegos de disparos en primera persona. Los foros de Call of Duty son un lugar para los jugadores discutir sobre el juego, compartir estrategias y mantenerse al día con las últimas noticias.'},
    {nombre: 'EA Noticias', descripcion:'EA noticias: Electronic Arts es una empresa líder en entretenimiento interactivo que produce y distribuye algunos de los videojuegos más populares del mundo. Los foros de EA son un lugar para los jugadores discutir sobre los juegos de EA, obtener ayuda y encontrar las últimas noticias.'},
];


const About = () => {
    const [showDiv, setShowDiv]= useState(false)
    const [descripcion, setDescripcion] = useState('');
    const [showDescription, setShowDescription]= useState(false)

  const handleClick = (descripcion) => {
    setDescripcion(descripcion);
    setShowDescription(!showDescription)
  };
    const div = ()=>{
        setShowDiv(!showDiv)
        setShowDescription(false)
    };
    const cerrar = ()=>{
        setShowDescription(false)
    }
    
  return (
    <div className="about-container">
      <h1>Acerca de</h1>
     
      <h2>Equipo de desarrollo</h2>
      <div className="developer-info">
        <img className='dev' src={imagenAbout} alt="Foto del desarrollador" /><br/>
        {showDescription && (
        <div className='flotante'>
        <p onClick={cerrar}>{descripcion}</p>
        </div>
)}
{showDiv && (
        <div className='flotantes'>
        <p onClick={div}>Nací el 21 de septiembre de 2002 en Colombia, un país rico en cultura y diversidad. A la temprana edad de 10 años, mi vida dio un giro inesperado cuando me mudé a Brasil, a una hacienda retirada del pueblo donde la conexión a internet era un lujo. Sin embargo, este cambio de escenario no hizo más que avivar mi curiosidad y pasión por los sistemas informáticos y electromecánicos.

Desde muy joven, demostré una habilidad innata para la mecánica, la electromecánica y el manejo de software de componentes electrónicos. Esta pasión por el aprendizaje y la innovación me llevó a explorar y dominar estos campos, a pesar de las limitaciones de mi entorno.

En 2022, regresé a Colombia, lleno de sueños y ambiciones pero con poco dinero. Encontré trabajo en un vivero de chocolate y aguacate, donde pude ahorrar lo suficiente para comprar una computadora. Este fue el primer paso en mi viaje hacia la realización de mi sueño: convertirme en programador.

En julio de 2023, comencé a estudiar en un bootcamp intensivo de programación web. Aprendí JavaScript, React, Redux, Express, Node, GitHub, entre otras tecnologías. Mi horario era riguroso, estudiaba desde las 7 am GMT -3 hasta pasadas las 9 pm GMT-3, de lunes a sábado. Con más de 1000 horas de aprendizaje práctico en la modalidad full stack, cada día me acercaba más a mi objetivo.

Aunque todavía tengo mucho que aprender, estoy orgulloso de lo que he logrado hasta ahora. Cada línea de código que escribo, cada problema que resuelvo, me acerca un paso más a mi sueño. Y aunque el camino ha sido largo y a veces difícil, cada desafío superado solo aumenta mi pasión por la programación.

Estoy emocionado por lo que el futuro me depara en este emocionante campo. Y mientras continúo mi viaje de aprendizaje, estoy agradecido por cada oportunidad y experiencia que me ha llevado hasta aquí. ¡Estoy listo para enfrentar los desafíos que vendrán y emocionado por las oportunidades que la programación me brindará!</p>
        </div>
)}
        
            <button onClick={div}>
            Omar Sneider Florez Moreno
            </button>
    
        
      </div>
      <div>
      {paginas.map((pagina, index) => (
        <button key={index} onClick={() => handleClick(pagina.descripcion)}>
          {pagina.nombre}
        </button>
      ))}
      
      </div>

      <div className="contact-info">
        <h2>Contacto</h2>
        <p>Email:  <a href="mailto:sneiderflorez2002@gmail.com">sneiderflorez2002@gmail.com</a></p>
        <p>telefono: +57 314 3213318 <br/> (┬┬﹏┬┬)+57 315 4581679</p>
        <p>
          Redes sociales:
          <a href="https://www.facebook.com/omarsneider.florezmoreno.7/" target='blank'><img className='logo' src='https://d1csarkz8obe9u.cloudfront.net/posterpreviews/facebook-design-template-935d72736eb17f5a6429dbf56a006a20_screen.jpg?ts=1585226980' alt='Facebook'/></a>,
          <a href="https://www.linkedin.com/in/sneider-florez-403a47278" target='blank'><img className='logo' src='https://e7.pngegg.com/pngimages/93/587/png-clipart-linkedin-logo-linkedin-logo-computer-icons-business-symbol-linkedin-icon-miscellaneous-blue-thumbnail.png' alt='Linkedlin'/></a>,
          <a href="https://github.com/D-OmarFlorez" target='blank'><img className='logo' src='https://w7.pngwing.com/pngs/914/758/png-transparent-github-social-media-computer-icons-logo-android-github-logo-computer-wallpaper-banner-thumbnail.png' alt='GitHub'/></a>,
          <a href="https://www.instagram.com/elomar_love/" target='blank'><img className='logo' src='https://w7.pngwing.com/pngs/462/874/png-transparent-instagram-logo-icon-instagram-icon-text-logo-sticker-thumbnail.png' alt='Instagram'/></a>
        </p>
      </div>
      <div className="copyright-info">
        <p>© {new Date().getFullYear()} Omar Florez. Todos los derechos reservados.</p>
      </div>
    </div>
  );
};

export default About;
