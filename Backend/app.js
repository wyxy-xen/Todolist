const express = require('express'); // importation de micro-framework express
const db = require("./models/index"); // importation de framework sequelize

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


module.exports = app;