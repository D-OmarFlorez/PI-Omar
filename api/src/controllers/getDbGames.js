
const {Videogame, Genre} = require('../db.js')

module.exports=(async (req, res) =>{

  const dbVideogames = await Videogame.findAll({ include: Genre,});

        res.json(dbVideogames);

})
