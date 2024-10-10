// Importar Express para crear un enrutador y el modelo Post para interactuar con la base de datos
const express = require('express');
const router = express.Router();
const Post = require('../models/Post'); // Modelo que define la estructura de un post en la base de datos

// Ruta para crear un nuevo post, utilizando el método POST
router.post('/', async (req, res) => {
    // Crear un nuevo objeto Post con los datos recibidos en el cuerpo de la solicitud
    const post = new Post({
        title: req.body.title, // Título del post
        description: req.body.description // Descripción del post
    });

    try {
        // Guardar el nuevo post en la base de datos
        const savedPost = await post.save();
        // Responder con el post guardado en formato JSON
        res.json(savedPost);
    } catch (error) {
        // Si ocurre un error al guardar el post, responder con el mensaje de error
        res.json({ message: error });
    }
});

// Ruta para obtener un post específico por su ID, utilizando el método GET
router.get('/:postId', async (req, res) => {
    try {
        // Buscar un post en la base de datos por su ID, que se obtiene de los parámetros de la solicitud
        const post = await Post.findById(req.params.postId);
        // Responder con el post encontrado en formato JSON
        res.json(post);
    } catch (error) {
        // Si ocurre un error al buscar el post, responder con el mensaje de error
        res.json({ message: error });
    }
});

// Ruta para eliminar un post por su ID, utilizando el método DELETE
router.delete('/:postId', async (req, res) => {
    try {
        // Elimina un post de la base de datos usando su ID
        const removedPost = await Post.remove({ _id: req.params.postId });
        // Responde con el resultado de la operación de eliminación
        res.json(removedPost);
    } catch (error) {
        // Si ocurre un error al eliminar el post, responder con el mensaje de error
        res.json({ message: error });
    }
});

// Ruta para actualiza un post por su ID, utilizando el método PATCH
router.patch('/:postId', async (req, res) => {
    try {
        // Actualiza un post en la base de datos usando su ID y modificando solo el título
        const updatePost = await Post.updateOne(
            { _id: req.params.postId }, // Buscar por ID
            { $set: { title: req.body.title } } // Actualizar solo el campo "title" con el valor recibido en el cuerpo de la solicitud
        );
        // Responde con el resultado de la operación de actualización
        res.json(updatePost);
    } catch (error) {
        // Si ocurre un error al actualizar el post, responder con el mensaje de error
        res.json({ message: error });
    }
});

// Exporta el enrutador para que pueda ser usado en otros archivos de la aplicación
module.exports = router;

