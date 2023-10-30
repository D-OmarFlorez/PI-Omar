const axios = require('axios')
/*archivos funcionales*/
const {Videogame, Genre} = require('../db.js')

module.exports=(async (req, res) =>{

  const dbVideogames = await Videogame.findAll({ include: Genre, limit:15});
  
    const response = await axios.get(`https://api.rawg.io/api/games?key=bf3907b002f9450c8a1ae32f7f532d03`);
    const adaptarDatosApi=(datosApi)=> {
        return {
          ...datosApi,
          image: datosApi.background_image,  // Cambia 'image' a 'backgroundImage'
        };
      }
    const apiVideogames = response.data.results.map(adaptarDatosApi);
    const videogames = [...dbVideogames, ...apiVideogames]
    res.json(videogames);

})
