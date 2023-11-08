const axios = require('axios')

let currentUrl = 1
module.exports= (async(req, res)=>{
    try {
        let response
        if (currentUrl === 1){
          response = await axios ('https://api.rawg.io/api/games?key=bf3907b002f9450c8a1ae32f7f532d03')
        }else{
        response = await axios(`https://api.rawg.io/api/games?key=bf3907b002f9450c8a1ae32f7f532d03&page=${currentUrl}`)
        }
       const nextPage = (response.data.next)
        currentUrl++
        res.status(200).json(nextPage)
    } catch (error) {
        res.status(404).json({error:'no se encontro la ruta'})
        
    }
})