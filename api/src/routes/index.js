const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dogRoute = require("./dogRoutes/dogRoute")

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/dogs", dogRoute)


module.exports = router;
