const {getApiDogs, getAllDogs, getDbInfo} = require("../controllers/get")
const { Router } = require('express');
const {Dog, Temperament} = require("../../db")
const axios = require("axios")

const router = Router();

router.get("/", async (req, res, next) =>{
    const {name} = req.query
    const nameDog = await getAllDogs();
    const keys = ["name"]
    try {
        if(name){
            const search = (data) =>{
                return data.filter((item)=>
                    keys.some((key)=>item[key].toLowerCase().includes(name))
                )
            }
            res.json(search(nameDog))
        }else{
        res.status(200).send(nameDog)
        }
    } catch (error) {
        next(error)
    }
})

router.get("/temperaments", async (req, res, next)=>{
    try {
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
        res.status(200).send(allTemperaments)
    } catch (error) {
        next(error)
    }
})

router.get("/:id", async (req, res, next)=>{
    const {id} = req.params
    try {
        if(id.includes("-")){
            //ver datos ingresados
            let dogs = await getDbInfo()
            let dogId = await dogs.filter((dog)=> dog.id == id)
            console.log("Perro de db: ",dogId)
            res.status(200).send(dogId)
        }else{
            let dogs = await getAllDogs()
            let dogId = await dogs.filter((dog) => dog.id == id)
            console.log(dogId)
            res.status(200).send(dogId)
        }
    } catch (error) {
        next(error)
    }
})

router.post("/", async (req, res, next)=>{
    const {name,height,weight,life,temperament, image} = req.body
    try {
        const newDog = await Dog.create({name,height,weight,life, image})  
        let temperamentDb = await Temperament.findAll({
            where:{
                name: temperament
            }
        })

        newDog.addTemperament(temperamentDb)
        res.status(200).send(newDog)
    } catch (error) {
        next(error)
    }
})

router.delete("/:id", async (req, res, next)=>{
    const {id} = req.params
    try {
        await Dog.destroy({
            where:{
                id
            }
        })
    res.status(200).send(`La raza con el id ${id} fue eliminada con exito`)
    } catch (error) {
        next(error)
    }
}) 

module.exports = router;



