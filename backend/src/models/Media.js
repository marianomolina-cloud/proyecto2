const { Schema, model } = require('mongoose');

const mediaSchema = new Schema({
    serial: {
        type: String,
        required: [true, 'El serial es obligatorio'],
        unique: true,
        trim: true
    },
    titulo: {
        type: String,
        required: [true, 'El título es obligatorio'],
        trim: true
    },
    sinopsis: {
        type: String,
        trim: true
    },
    urlPelicula: {
        type: String,
        required: [true, 'La URL de la película es obligatoria'],
        unique: true,
        trim: true
    },
    imagenPortada: {
        type: String,
        trim: true
    },
    anioEstreno: {
        type: Number,
        required: [true, 'El año de estreno es obligatorio']
    },
    generoPrincipal: {
        type: Schema.Types.ObjectId,
        ref: 'Genero',
        required: true
    },
    directorPrincipal: {
        type: Schema.Types.ObjectId,
        ref: 'Director',
        required: true
    },
    productora: {
        type: Schema.Types.ObjectId,
        ref: 'Productora',
        required: true
    },
    tipo: {
        type: Schema.Types.ObjectId,
        ref: 'Tipo',
        required: true
    }
}, {
    timestamps: { createdAt: 'fechaCreacion', updatedAt: 'fechaActualizacion' },
    versionKey: false
});

mediaSchema.pre('validate', async function(next) {
    if (this.isNew && !this.serial) {
        try {
            // Buscamos el último registro para obtener el número correlativo
            const lastMedia = await this.constructor.findOne({}, {}, { sort: { 'fechaCreacion': -1 } });
            let nextNumber = 1;
            
            if (lastMedia && lastMedia.serial) {
                const lastSerial = lastMedia.serial.split('-')[1];
                nextNumber = parseInt(lastSerial, 10) + 1;
            }
            
            this.serial = `PEL-${nextNumber.toString().padStart(4, '0')}`;
        } catch (error) {
            return next(error);
        }
    }
    next();
});

module.exports = model('Media', mediaSchema);
