const {getApiDogs} = require("../controllers/get")
const { Router } = require('express');

const router = Router();

router.get("/", async (req, res, next) =>{
    const {name} = req.query
    const nameDog = await getApiDogs();
    try {
        if(name){
            let dogByName = await nameDog.filter((dog) => dog.name.toLowerCase().includes(name.toLowerCase()))
            //console.log(dogByName)
            dogByName.length ? res.send(dogByName) : res.status(404).send("Error, Name no existe")
            
        }else{
        let dogsTotal = await getApiDogs()
        res.status(200).send(dogsTotal)
        }
    } catch (error) {
        next(error)
    }
})

module.exports = router;