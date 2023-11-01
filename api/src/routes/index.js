/*dependencias*/
const { Router } = require('express');
const axios = require('axios')
/*archivos funcionales*/
const {Videogame, Genre} = require('../db.js')
/*controllers*/
const GetVideogames = require ('../controllers/GetVideogames.js');
const GetName = require('../controllers/GetName.js');
const GendersToDb = require('../controllers/Getgender.js');
const CreateGame = require ( '../controllers/PostVideogame.js')
const GetId = require('../controllers/GetId.js')
const deleteGame = require('../controllers/DeleteGame.js')
const UpdateGame = require ('../controllers/UpdateVideogame.js')
const DBGames = require('../controllers/getDbGames.js')
//const {API_KEY} = process.env
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

/*rutas*/
// show all games
router.get('/videogames',GetVideogames);

router.get('/videogames/name', GetName);

router.get('/videogames/MyGames', DBGames)

router.get('/videogames/genres', async (req, res)=>{
   try{
    await GendersToDb();
    const genres = await Genre.findAll();
    res.json(genres);       
   }catch(error){
    res.json(400).json({error: error.message})
   }
})
router.get('/videogames/:idVideogame', GetId)

router.post ( '/videogames', CreateGame)

router.delete ('/videogames/:idVideogame', deleteGame)

router.put('/videogames/:idVideogame', UpdateGame)
//show games by primary key
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
