const axios = require("axios")
const {Dog, Temperament} = require("../../db")


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
    //const sliceResponse = UrlResponse.slice(0,8)
    //let finalResponse = Array.from(new Set(UrlResponse))
    
    return UrlResponse;
}

const getDbInfo = async () =>{
    let dogdb = await Dog.findAll({
        include:{
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    })
    return dogdb.map(d=>({
            id: d.id,
            name: d.name,
            weight: d.weight,
            height: d.height,
            life: d.life,
            temperament: d.temperaments.map(t => t.name).join(", "),
            image: d.image
    }))
    
}

const getAllDogs = async () =>{
    const API = await getApiDogs();
    const DB = await getDbInfo();
    const infoTotal = API.concat(DB)
    return infoTotal;
}

module.exports = {
    getApiDogs,
    getDbInfo,
    getAllDogs
}