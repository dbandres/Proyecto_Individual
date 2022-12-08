const axios = require("axios")


const getApiDogs = async () =>{
    const URL = await axios.get("https://api.thedogapi.com/v1/breeds");
    const UrlResponse = await URL.data.map((dog) => {
        return{
            id: dog.id,
            name: dog.name,
            weight: dog.weight.metric,
            height: dog.height.metric,
            life_span: dog.life_span,
            temperament: dog.temperament,
            image: dog.image.url
        }
    });
    return UrlResponse;
}

const getDbInfo = async () =>{
    return await Dog.findAll({
        include:{
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    })
}


module.exports = {
    getApiDogs
}