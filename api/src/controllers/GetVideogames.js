const axios = require('axios')
/*archivos funcionales*/
const {Videogame, Genre} = require('../db.js')

module.exports=(async (req, res) =>{
    const dbVideogames = await Videogame.findAll({ include: Genre});
    const response = await axios.get(`https://api.rawg.io/api/games?key=bf3907b002f9450c8a1ae32f7f532d03`);
    const apiVideogames = response.data.results;
    const videogames = [...dbVideogames, ...apiVideogames]
    res.json(videogames);

})
