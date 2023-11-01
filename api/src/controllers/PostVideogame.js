const {Videogame, Genre} = require ('../db')
module.exports=(async(req, res)=>{
    const {name, image, releaseDate, rating, description, platforms, genreNames} = req.body;
    try{
        
    if (!name || !description || !genreNames || !image|| !releaseDate|| !rating){
        return res.status(400).send('Faltan datos')
    }
    if (typeof image !== 'string'){
        return res.status(400).send(' la imagen debe ser una url valida')
    }
    const partes = releaseDate.split("/")
    const formatDate = `${partes[1]}-${partes[0]}-${partes[2]}` 
    const dateObject = new Date (formatDate);
    const year = dateObject.getFullYear();
    const currentYear = new Date().getFullYear()
   
    
    if(year < 1965 || year > currentYear ){
        return res.status(400).send(`Debe ser una fecha valida entre los años 1965 y ${currentYear} `)
    }
    if (isNaN(rating) || rating < 0 || rating > 5){
        return res.status(400).send('la calificacion debe estar entre 0.0 y 5.0')
    }
    if(name.length <2){
        return res.status(400).send('agrega un nombre mas largo')
    }
    if (description.length < 20 || description.length > 255){
        return res.status(400).send('formato de 20 a 255 caracteres requerido')
    }
    const existingGame = await Videogame.findOne({ where: { name: name } });
    if (existingGame) {
        return res.status(400).send('El videojuego ya existe');
    }
    const genres = await Genre.findAll({where:{name:genreNames}})
   if(!genres || genres.length===0){
    return res.status(400).send('ningun genero valido encontrado')
   }
   
   const newGame = await Videogame.create({
       name, image, description, platforms, releaseDate, rating,
    })
    await newGame.setGenres(genres)
      
       console.log(newGame);

        res.status(201).json(newGame);
    }catch(error){
        res.status(500).json({error: error.message})
    }
})