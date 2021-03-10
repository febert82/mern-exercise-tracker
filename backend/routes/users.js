// importo il middleware di express per le routes
const router = require('express').Router();
// importo il modello di collection "User" 
let User = require('../models/user.model');

// definisco il metodo get per la route "/"
router.route('/').get((req, res) => {
    // seleziono tutti gli users dal database
    User.find()
        // carico gli users nella response del get
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

// definisco il metodo post per la route "/add"
router.route('/add').post((req, res) => {
    // prelevo lo username dalla request del metodo post
    const username = req.body.username;

    // inserisco lo username in un nuovo "User" per il db
    const newUser = new User({username});

    // salvo il nuovo User nel db
    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;