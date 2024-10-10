// Importa la biblioteca de mongoose para interactuar con MongoDB
const mongoose = require('mongoose');

// Define un esquema para el modelo de datos de un Post
const PostSchema = mongoose.Schema({
    title: {
        type: String,   // Se define que es tipo string
        required: true // Indica que este campo es obligatorio al crear un Post.
    },
    // Campo description del Post
    description: {
        type: String, //Tipo String
        required: true // Obligatorio
    },
    // Date: almacena la fecha de creación del Post.
    date: {
        type: Date,
        default: Date.now // Asigna la fecha y hora actuales como valor predeterminado.
    }
});

// Exporta el modelo Post basado en el esquema definido anteriormente.
module.exports = mongoose.model('Post', PostSchema);
