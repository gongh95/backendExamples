const express = require('express');
const router = express.Router();
const {listaProductos, agregarProducto, productoXId, modificarProducto, eliminarProducto, eliminarTodo} = require('../controllers/controllerProductos');

router.get('/', listaProductos);
router.get('/:id', productoXId);
router.post('/agregar/', agregarProducto);
router.put('/editar/:id', modificarProducto);
router.delete('/eliminar/lista', eliminarTodo);
router.delete('/eliminar/:id', eliminarProducto);

module.exports = router;