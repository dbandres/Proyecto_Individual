const {getApiDogs} = require("../controllers/get")
const { Router } = require('express');

const router = Router();

router.get("/", async (req, res, next) =>{
    try {
        let dogsTotal = await getApiDogs()
        res.status(200).send(dogsTotal)
    } catch (error) {
        next(error)
    }
})

module.exports = router;