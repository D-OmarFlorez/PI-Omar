const { Videogame } = require('../db');

module.exports = async (req, res) => {
    const { idVideogame } = req.params;
    const newData = req.body;
    const { name, description } = newData;

    try {
        if (name.length < 2) {
            return res.status(400).send('agrega un nombre mas largo');
        }
        if (description.length < 20 || description.length > 255) {
            return res.status(400).send('formato de 20 a 255 caracteres requerido');
        }

        await Videogame.update(newData, { where: { id: idVideogame } })
            .then(() => {
                res.status(201).send('se actualizo correctamente');
            })
            .catch(error => res.status(500).json({ error: error.message }));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}