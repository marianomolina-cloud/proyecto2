const { Schema, model } = require('mongoose');

const tipoSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del tipo es obligatorio'],
        trim: true
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción es obligatoria'],
        trim: true
    }
}, {
    timestamps: { createdAt: 'fechaCreacion', updatedAt: 'fechaActualizacion' },
    versionKey: false
});

module.exports = model('Tipo', tipoSchema);
