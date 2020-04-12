const express = require('express'); // importation de micro-framework express
const db = require("./models/index"); // importation de framework sequelize
const bodyparser = require('body-parser'); // importation de package permettant de transformer le corps de la requete en objet json
const cors = require('cors'); // importation de pachkage de sécurité cors
const List = require('./models/list.model'); // importation du modèle list
const Category = require('./models/category.model'); // importation du modèle catégorie
const User = require('./models/user.model'); // importation du modéle utilisateur
const app = express(); // istanciation de l'objet express afin de créer le serveur 
// connexion à la base de données
db.sync();

// test de la connexion
db
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// création des middlewares pour plusieurs fonctionnalités
// middleware pour la sécurité
app.use(cors()); 
app.options('*', cors());
// middleware pour la trasformation du corps de la requete
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ limit: '10mb', extended: true }));

// API REST
app.post('/api/category', (req, resp, next) => {
    const category = new Category({
        Nom: req.body.Nom,
        Type: req.body.Type,
        Photo: req.body.Photo
    });
    category.save()
    .then((data)=> {resp.status(201).json({message: 'la catégorie est ajoutée avec succès !', data: data})})
    .catch((err) => {resp.status(400).json("l'erreur est la suivante: ", err)});
}); // middleware pour traiter la requeste et la réponse associées à la route '/api/category'


module.exports = app;