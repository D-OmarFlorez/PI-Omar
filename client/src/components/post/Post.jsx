import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './post.css'
import validatePost from './validation'

const PostForm = ({id}, onClose) => {
  const [gameData, setGameData] = useState({
    name: '',
    image:'',
    description: '',
    platforms: [],
    releaseDate: '',
    rating: 0,
    genreNames: []
  });
  const [errors, setErrors]= useState({})
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };
 
  const handleChange = (event) => {
    if (event.target.name === 'platforms') {
      const selectedPlatforms = Array.from(event.target.selectedOptions, option => option.value);
      setGameData({
        ...gameData,
        platforms: selectedPlatforms
      });
    } else {
      setGameData({
        ...gameData,
        [event.target.name]: event.target.value
      });
    }
  };
  

  const handleRatingChange = (newRating) => {
    const floatRatingValue = parseFloat(newRating);
    setGameData({
      ...gameData,
      rating: floatRatingValue
    });
  };
  const handleChangeGenre = (event) => {
    if (event.target.name === 'platforms' || event.target.name === 'genreNames') {
      const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
      setGameData({
        ...gameData,
        [event.target.name]: selectedOptions
      });
    } else {
      setGameData({
        ...gameData,
        [event.target.name]: event.target.value
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    
    const validationErrors =validatePost(gameData)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length === 0) {
      try {
        
      axios.post('http://localhost:3001/videogames', gameData)
        .then(response => console.log(response.data))
        alert('videojuego creado con exito')
        .catch(error => console.error('Error:', error));
      } catch (error) {
        throw new Error ({error})
      }
      }
  };
  useEffect(() => {
    axios.get(`http://localhost:3001/videogames/${id}`)
      .then((response) => {
        const game = response.data;
        setGameData(game);
      })
      .catch((error) => {
        console.error('Error al obtener los datos del juego', error);
      });
  }, [id]);
  const handleUpdate = ()=>{
    const validationErrors =validatePost(gameData)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length === 0){
  
  axios.put(`http://localhost:3001/videogames/${id}`, gameData)
  .then((response)=>{
    alert('juego actualizado con exito')
  }).catch((error)=>{
    throw Error ('Error al actualizar el juego', error)
  })
}
}

  return (
    <form onSubmit={handleSubmit} className='form'>
      <button onClick={onClose}></button>
    
<div className="divGeneral">
      <label className="labelGeneral">
        Nombre:
      </label>
        <input type="text" name="name" className='formControl' value={gameData.name} onChange={handleChange} />
      
</div>
      <div className='divGeneral'>
        <label className='labelGeneral'>
          Url imagen:
          <input type='text' name='image' className='formControl' value={gameData.image} onChange={handleChange}/>
        </label>
      </div>
<div className="divGeneral">
      <label className="labelGeneral">
        Descripción:
        <textarea name="description" value={gameData.description} onChange={handleChange} />
        {errors.description && <p>{errors.description}</p>}
      </label>
</div>
<hr style={{ 
  borderStyle: "none", 
  height: "2px", 
  backgroundImage: "linear-gradient(to right, red, orange , yellow, green, blue, indigo, violet)" 
}} />
<div className="divGeneral">
      <label className="labelGeneral">
        Fecha de lanzamiento:
        <input type="date" name="releaseDate" className='formControl' value={gameData.releaseDate} onChange={handleChange} />
        {errors.releaseDate && <p>{errors.releaseDate}</p>}
      </label>
</div>
<div className='divGeneral'>
<label className="labelGeneral" >
  Géneros:
  <button onClick={toggleDropdown}>select</button>
  <div className={`select-wraper ${isDropdownVisible ? 'open' : ''}`}>
  <select multiple={true} name="genreNames" onChange={handleChangeGenre}>
    <option value="Action">Action</option>
    <option value="Casual">Casual</option>
    <option value="Adventure">Adventure</option>
    <option value="RPG">RPG</option>
    <option value="Indie">Indie</option>
    <option value="Strategy">Strategy</option>
    <option value="Shooter">Shooter</option>
    <option value="Simulation">Simulation</option>
    <option value="Puzzle">Puzzle</option>
    <option value="Arcade">Arcade</option>
    <option value="Platformer">Platformer</option>
    <option value="Massively Multiplayer">Massively Multiplayer</option>
    <option value="Racing">Racing</option>
    <option value="Sports">Sports</option>
    <option value="Fighting">Fighting</option>
    <option value="Family">Family</option>
    <option value="Board Games">Board Games</option>
    <option value="Educational">Educational</option>
    <option value="Card">Card</option>
  </select>
  {errors.genreNames && <p>{errors.genreNames}</p>}
  </div>
</label>
</div>
<hr style={{ 
  borderStyle: "none", 
  height: "2px", 
  backgroundImage: "linear-gradient(to right, red, orange , yellow, green, blue, indigo, violet)" 
}} />
  <div className='divGeneral'>        
            <label className="labelGeneral">
        Plataformas:
        <button onClick={toggleDropdown}>select</button>
        <div className={`select-wraper ${isDropdownVisible ? 'open' : ''}`}>
        <select multiple={true} name="platforms" onChange={handleChange}>
          <option value="xbox">Xbox</option>
          <option value="PS2">PS2</option>
          <option value="Linux">Linux</option>
          <option value="PS Vita">PS Vita</option>
          <option value="Android">Android</option>
          <option value="Xbox One">Xbox One</option>
          <option value="Nintendo Switch">Nintendo Switch</option>
          <option value="iOS">iOS</option>
          <option value="macOS">macOS</option>
          <option value="PC">PC</option>
          <option value="Xbox 360">Xbox 360</option>
          <option value="PlayStation 3">PlayStation 3</option>
          <option value="PlayStation 4">PlayStation 4</option>
          <option value="PlayStation 5">PlayStation 5</option>
          <option value="Web">Web</option>
          
        </select>
        {errors.platforms && <p>{errors.platforms}</p>}
        </div>
      </label >
</div>

<div className='divGeneral'>
      <label className="labelGeneral">
        Calificación:
        {[...Array(5.0)].map((star, i) => {
          const ratingValue = i + 0.9;
          return (
            <label key={i}>
              <input className='formControl hidden-radio'
                type="radio"
                name="rating"
                value={ratingValue}
                onClick={() => handleRatingChange(ratingValue)}
              />
              {ratingValue <= gameData.rating ? '❤️' : '🩶'}
            </label>
          );
        })}
        {errors.rating && <p>{errors.rating}</p>}
      </label>
      </div>
<div className="divGeneral">
      <button type ="button"  className='btn' onClick={handleUpdate}>Actualizar</button>
      <button type="submit" className='btn'>Enviar</button>
      </div>
      
    </form>
  );
};

export default PostForm;
