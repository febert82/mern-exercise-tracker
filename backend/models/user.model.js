const mongoose = require('mongoose'); // importo mongoose

const Schema = mongoose.Schema;

// creo schema per la collection "user" con campo "username" 
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },

}, {
    timestamps: true,
});

// creo collection "User" nel db usando lo schema appena definito
const User = mongoose.model('User', userSchema);

//esporto la collection appena creata
module.exports = User;
