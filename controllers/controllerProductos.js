const fs = require('fs');

const listaProductos = async (req, res) => {
    try {
        const data = await fs.promises.readFile('./db/products.json', 'utf-8');
        let dataJson = JSON.parse(data);
        res.status(200).json({ dataJson });
    }
    catch {
        res.status(400).send("No se puede acceder a la lista de productos");
    }
};

const agregarProducto = async (req, res) => {
    try {
        const data = await fs.promises.readFile('./db/products.json', 'utf-8');
        let dataJson = JSON.parse(data);
        let producto = {
            id: dataJson.length +1,
            name: req.body.name,
            price: req.body.price,
            url: req.body.url,
            descript: req.body.descript
        };
        dataJson.push({ producto: producto });
        let productoJson = JSON.stringify(dataJson, null, 2);
        await fs.promises.writeFile('./db/products.json', productoJson);
        res.status(200).send("Producto agregado");
    }
    catch {
        res.status(400).send("Hubo un error al cargar el producto");
    }
};

const productoXId = async (req, res) => {
    try {
        const data = await fs.promises.readFile('./db/products.json', 'utf-8');
        let dataJson = JSON.parse(data);
        let dataId = dataJson.find((producto) => producto.producto.id === Number(req.params.id));
        (dataId != undefined) ? res.status(200).json(dataId) : res.status(400).send('Producto no existe');
    }
    catch (error) {
        res.status(400).send(error);
    }
};

const modificarProducto = async (req, res) => {
    try {
        const data = await fs.promises.readFile('./db/products.json', 'utf-8');
        let dataJson = JSON.parse(data);
        let id = Number(req.params.id);
        let indice = id - 1;
        if (dataJson[indice] === undefined || null) {
            res.status(400).send("Producto no encontrado");
        }
        else {
            const productoActualizado = {
            id: id,
            name: req.body.name,
            price: req.body.price,
            url: req.body.url,
            descript: req.body.descript
        }
        dataJson[indice] = { producto: productoActualizado };
        let productoJson = JSON.stringify(dataJson, null, 2);
        await fs.promises.writeFile('./db/products.json', productoJson);
        res.status(200).send("Producto editado");
        }
    }
    catch (error) {
        res.status(400).send(error);
    }
};

const eliminarProducto = async (req, res) => {
    try {
        const data = await fs.promises.readFile('./db/products.json', 'utf-8');
        let dataJson = JSON.parse(data);
        let dataId = Number(dataJson.find((producto) => producto.producto.id === Number(req.params.id)));
        if (dataId === undefined || null) {
            res.status(400).send("No existe el producto");
        }
        else {
            let dataNuevo = dataJson.filter((producto) => producto.producto.id != Number(req.params.id));
            let productoJson = JSON.stringify(dataNuevo, null, 2);
            await fs.promises.writeFile('./db/products.json', productoJson);
            res.status(200).send("Producto eliminado");
        }
    }
    catch (error) {
        res.status(400).send(error);
    }
};

const eliminarTodo = async (req, res) => {
    try {
        const data = await fs.promises.readFile('./db/products.json', 'utf-8');
        let dataJson = JSON.parse(data);
        dataJson = [];
        let productoJson = JSON.stringify(dataJson, null, 2);
        await fs.promises.writeFile('./db/products.json', productoJson);
        res.status(200).send("Lista de productos eliminada");
    }
    catch (error) {
        res.status(400).send(error);
    }
};

module.exports = {listaProductos, agregarProducto, productoXId, modificarProducto, eliminarProducto, eliminarTodo};