const mongoose = require('mongoose'); // importo mongoose

const Schema = mongoose.Schema;

// creo schema per la collection "exercise" con i campi previsti 
const exerciseSchema = new Schema({
    username: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    date: { type: Date, required: true },
}, {
    timestamps: true,
});

// creo collection "Exercise" nel db usando lo schema appena definito
const Exercise = mongoose.model('Exercise', exerciseSchema);

//esporto la collection appena creata
module.exports = Exercise;
