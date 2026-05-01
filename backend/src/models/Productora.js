const { Schema, model } = require('mongoose');

const productoraSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre de la productora es obligatorio'],
        trim: true
    },
    estado: {
        type: String,
        required: [true, 'El estado es obligatorio'],
        enum: ['Activo', 'Inactivo'],
        default: 'Activo'
    },
    slogan: {
        type: String,
        trim: true
    },
    descripcion: {
        type: String,
        trim: true
    }
}, {
    timestamps: { createdAt: 'fechaCreacion', updatedAt: 'fechaActualizacion' },
    versionKey: false
});

module.exports = model('Productora', productoraSchema);
