const express = require('express');
const { listaUsers, agregarUser } = require('../controllers/controllerUsers');
const router = express.Router();

router.get('/', listaUsers);
router.post('/agregar/', agregarUser);

module.exports = router;