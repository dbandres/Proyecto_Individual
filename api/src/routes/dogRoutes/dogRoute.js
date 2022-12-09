const {getApiDogs, getAllDogs, getDbInfo} = require("../controllers/get")
const { Router } = require('express');
const {Dog, Temperament} = require("../../db")
const {Op} = require("sequelize")
const router = Router();

router.get("/", async (req, res, next) =>{
    const {name} = req.query
    const nameDog = await getAllDogs();
    try {
        if(name){
            let dogByName = await nameDog.filter((dog) => dog.name.toLowerCase().includes(name.toLowerCase()))
            //console.log(dogByName)
            dogByName.length ? res.send(dogByName) : res.status(404).send("Error, Name no existe")
            
        }else{
        let dogsTotal = await getAllDogs()
        res.status(200).send(dogsTotal)
        }
    } catch (error) {
        next(error)
    }
})

router.get("/temperaments", async (req, res, next)=>{
    const dogApi = await getApiDogs();
    let temperApi = dogApi.map((dog) => dog.temperament)
    //console.log(temperApi)
    const temperData = temperApi.toString().split(",")
    console.log(temperData)
    temperData.forEach(str => {
        let i = str.trim()
        Temperament.findOrCreate({
            where: {name:i}
        })
    });
    const allTemperaments = await Temperament.findAll()
    res.send(allTemperaments)
})

router.get("/:id", async (req, res, next)=>{
    const {id} = req.params
    let dogs = await getAllDogs()
    try {
        if(id){
            //ver datos ingresados
            let dogId = await dogs.filter((dog) => dog.id == id)
            console.log(dogId)
            res.status(200).send(dogId)
        }
    } catch (error) {
        next(error)
    }
})

router.post("/", async (req, res, next)=>{
    const {name,height,weight,life,temperament} = req.body
    try {
        const newDog = await Dog.create({name,height,weight,life})  
        let temperamentDb = await Temperament.findAll({
            where:{
                name: temperament
            }
        })
        newDog.addTemperament(temperamentDb)
        res.send("Ha sido creado")
    } catch (error) {
        next(error)
    }
})


module.exports = router;