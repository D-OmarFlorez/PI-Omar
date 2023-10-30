import React, { useState } from 'react';
import validation from './validation';

const PostForm = () => {
  const [gameData, setGameData] = useState({
    name: '',
    description: '',
    platforms: [],
    genreNames: []
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setGameData({
      ...gameData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validar los datos del formulario
    const validationErrors = validation(gameData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // Enviar los datos al servido
      fetch('/videogames', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(gameData)
      })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre:
        <input type="text" name="name" value={gameData.name} onChange={handleChange} />
        {errors.name && <p>{errors.name}</p>}
      </label>

      <label>
        Descripción:
        <textarea name="description" value={gameData.description} onChange={handleChange} />
        {errors.description && <p>{errors.description}</p>}
      </label>

      {/* Aquí puedes agregar campos para las plataformas y los géneros */}

      <button type="submit">Enviar</button>
    </form>
  );
};

export default PostForm;