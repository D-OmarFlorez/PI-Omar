const {Videogame, Genre} = require ('../db')
const axios = require ('axios')

module.exports=(async (req, res)=>{
    const idVideogame = req.params.idVideogame;
    if (idVideogame == '18'){
        return res.status(404).send('oops, somebody deleted this game :´(')
    }
    try{ 
        if(isNaN(idVideogame)){
    const dbvideogame= await Videogame.findByPk(idVideogame,{include: Genre} );

     if(dbvideogame){
         res.json(dbvideogame);
     }else{
       return res.status(404).send('no se encontro el juego')
     }
     }else{
         const response = await axios.get(`https://api.rawg.io/api/games/${idVideogame}?key=bf3907b002f9450c8a1ae32f7f532d03`)
         const videogames = response.data;
         if(videogames){
             res.json({videogames, prueba:'aqui tambien lo pongo'});
         }else{
           return  res.status(404).json({error: error.message})
         }
     }
    }catch(error){
       return res.status(500).send(error.message)

}
 })