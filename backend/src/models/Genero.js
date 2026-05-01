const { Schema, model } = require('mongoose');

const generoSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del género es obligatorio'],
        unique: true,
        trim: true
    },
    estado: {
        type: String,
        required: [true, 'El estado es obligatorio'],
        enum: ['Activo', 'Inactivo'],
        default: 'Activo'
    },
    descripcion: {
        type: String,
        trim: true
    }
}, {
    timestamps: { createdAt: 'fechaCreacion', updatedAt: 'fechaActualizacion' },
    versionKey: false
});

module.exports = model('Genero', generoSchema);
