const {Videogame}=require('../db')

module.exports=(async(req, res)=>{
    const {idVideogame} = req.params;

    try{
        const videogames = await Videogame.findByPk(idVideogame);
       
        if (!videogames){
            return res.status(404).json({error:'the game required not exists'})
        }
     
        await videogames.destroy();
        res.status(200).json({sucess: 'videojuego eliminado con exito, igual, era una basura xd'})
    }catch(error){
res.status(500).json({error: 'Something happened and we couldn´t delete the game.'})
    }
})