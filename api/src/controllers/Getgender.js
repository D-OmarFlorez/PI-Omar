const axios = require ('axios')
const {Genre} = require('../db.js')


const getGenderApi = (async()=>{
    const response= await axios.get(`https://api.rawg.io/api/genres?key=bf3907b002f9450c8a1ae32f7f532d03`)
    const genders = response.data.results;
    return genders
})
module.exports=(async()=>{
    const gendersApi= await getGenderApi();
    gendersApi.forEach(async(genre) => {
        await Genre.findOrCreate({where:{name:genre.name}})
    });
})
