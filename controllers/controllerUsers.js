const fs = require('fs');

const listaUsers = async (req, res) => {
    try {
        const data = await fs.promises.readFile('./db/users.json', 'utf-8');
        let dataJson = JSON.parse(data);
        res.status(200).json({ dataJson });
    }
    catch (error) {
        res.status(400).send(error);
    }
};

const agregarUser = async (req, res) => {
    try {
        const data = await fs.promises.readFile('./db/users.json', 'utf-8');
        let dataJson = JSON.parse(data);
        let user = {
            id: dataJson.length +1,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            direccion: req.body.direccion,
            telefono: req.body.telefono
        };
        dataJson.push({ user: user });
        let productoJson = JSON.stringify(dataJson, null, 2);
        await fs.promises.writeFile('./db/users.json', productoJson);
        res.status(200).send("Usuario agregado");
    }
    catch {
        res.status(400).send("Hubo un error al cargar el producto");
    }
};

module.exports = { listaUsers, agregarUser };