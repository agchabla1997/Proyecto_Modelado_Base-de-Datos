const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PacientesSchema = new Schema ({
nombre: { type: String, requiered: true} ,
apellido: {type: String, requiered: true},
edad: {type: String, requiered: true},
direccion: {type: String, requiered: true},
telefono: {type: Number, requiered: true},
path: { type: String },
originalname: { type: String},
mimetype:{ type: String},
size: { type: Number },
status: {
type: Boolean,
default: false
}


});

module.exports = mongoose.model('pacientes', PacientesSchema);