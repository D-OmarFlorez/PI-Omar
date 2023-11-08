const axios = require('axios')


module.exports= (async(req, res)=>{
    const{id}= req.params
    try {
        let response
        if (id === 1){
          response = await axios ('https://api.rawg.io/api/games?key=bf3907b002f9450c8a1ae32f7f532d03')
        }else{
        response = await axios(`https://api.rawg.io/api/games?key=bf3907b002f9450c8a1ae32f7f532d03&page=${id}`)
        }
       const nextPage = (response.data.next)
       const prevPage = (response.data.previous)
    
        res.status(200).json({nextpage: nextPage, prevPage:prevPage})
    } catch (error) {
        res.status(404).json({error:'no se encontro la ruta'})
        
    }
})