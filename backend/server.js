const express = require('express'); // importo libreria express (middleware server node)
const cors = require('cors'); // importo libreria cors (per comunicazione ajax)
const mongoose = require('mongoose'); // importo libreria mongoose (middleware mongodb)

require('dotenv').config(); // configura file per variabili d'ambiente

const app = express(); // definisco l'app del server
const port = process.env.PORT || 5000; // definisco la porta del server

app.use(cors()); // il server utilizza la libreria cors
app.use(express.json()); // il server può utilizzare il parsing di dati in formato json

const uri = process.env.ATLAS_URI; //url connessione a mongodb atlas
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true}); // connessione db
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

// importo i file "router" per il backend
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

// uso i file "router" e li associo alle routes per il server
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
}); // il server si mette in ascolto sulla porta prevista
