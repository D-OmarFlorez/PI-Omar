const {Op} = require('sequelize')
const axios = require('axios');
const {Videogame, Genre} = require('../db.js')


module.exports= ( async (req, res)=>{
    const name= req.query.name;
    if(!name){
        return res.status(400).send('se te olvido escribir algo?');
    }
    if(name.length < 3){
        return res.status(400).send('te dio pereza?, pon mas letras');
    }
    if (name == "418"){
        return res.status(418).send('I am a teapot, I can´t work to you')
    }
    if (name.toLowerCase() == "bts"){
        return res.status(200).send('te encontre un papa🧍‍♂️')
    }
   try{
    let videogames = []
    const dbVideogames = await Videogame.findAll({
 //aqui investigue un poco y hice uso de el operador OP.iLike que permite buscar insensible a mayusculas y minusculas
        where: {name: { [Op.iLike]: `${name}%`}},
        limit: 15,
        include: Genre
    });
    videogames.push(...dbVideogames);

    
    const response = await axios.get (`https://api.rawg.io/api/games?key=bf3907b002f9450c8a1ae32f7f532d03&search=${name}`)
     const apiVideogames = [response.data.results];
     videogames.push(...apiVideogames)
     
    
   
        if (videogames.length > 15) {
            videogames = videogames.slice(0, 15);
        res.json(videogames);
    }else{
        res.status(404).send('no se encontraron videojuegos con este nombre🫢')
        // throw new Error ({error: error.message})
    }
}catch (error) {
        res.status(400).json({ error: error.message })
    }
})