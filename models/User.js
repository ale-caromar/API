// Importa Mongoose para definir el esquema de la base de datos
const mongoose = require('mongoose');

// Define el esquema de usuario
const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true, // El nombre de usuario es obligatorio
        unique: true // No puede haber dos usuarios con el mismo nombre
    },
    password: {
        type: String,
        required: true // La contraseña es obligatoria
    },
    date: {
        type: Date,
        default: Date.now // Fecha de creación del usuario.
    }
});

// Exportar el modelo para usarlo en otros archivos
module.exports = mongoose.model('User', UserSchema);
