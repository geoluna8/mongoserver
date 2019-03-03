// app/models/persona.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PersonaSchema   = new Schema({
    nombre: String,
    apellidos: String,
    email: String,
    telefono: String,
    ciudad: String,
    pais: String
});

module.exports = mongoose.model('Persona', PersonaSchema);