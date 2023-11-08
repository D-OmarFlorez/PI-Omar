
const {Videogame, Genre} = require('../db.js')

module.exports=(async (req, res) =>{

  const dbVideogames = await Videogame.findAll({ include: Genre,});
  try{
    if (dbVideogames) {
    
        res.json(dbVideogames);
    }else{
      res.status(404).send('no se encontraron juegos en la base de datos')
    }
      }catch{
    res.status(500).send('error al solicitar los juegos')
  }
})
