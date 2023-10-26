const {Videogame, Genre} = require ('../db')
module.exports=(async(req, res)=>{
    const {name, description, platforms, genreNames} = req.body;

    try{
        
    if (!name || !description || !genreNames){
        return res.status(400).json({error: error.message})
    }
    if(name.length <2){
        return res.status(400).send('agrega un nombre mas largo')
    }
    if (description.length < 20 || description > 255){
        return res.status(400).send('formato de 20 a 255 caracteres requerido')
    }
        const newGame = await Videogame.create({
            name, description, platforms
        })
        
       
        const genres = await Genre.findAll({where:{name:genreNames}})
        await newGame.addGenres(genres)

        res.status(201).json(newGame);
    }catch(error){
        res.status(500).json({error: error.message})
    }
})