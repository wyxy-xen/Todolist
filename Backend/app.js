/********** importation des librairies et des frameworks ***********************************/
const express = require('express'); // importation de micro-framework express
const db = require("./models/index"); // importation de framework sequelize
const bodyparser = require('body-parser'); // importation de package permettant de transformer le corps de la requete en objet json
const cors = require('cors'); // importation de pachkage de sécurité cors
const List = require('./models/list.model'); // importation du modèle list
const Category = require('./models/category.model'); // importation du modèle catégorie
const User = require('./models/user.model'); // importation du modéle utilisateur
const app = express(); // istanciation de l'objet express afin de créer le serveur 
const multer = require('./config/multer.config'); // importation du middleware de configuration de multer
const path = require('path');

/************************ connexion à la base de données ***********************************/
db.sync({force: false}); // warning: if force is true, the database will be omitted ! please, take care !!! 

/****************************** test de la connexion ****************************************/ 
db
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

/****************** création des middlewares pour plusieurs fonctionnalités ******************/  
// middleware pour la sécurité
app.use(cors()); 
app.options('*', cors());
// middleware pour la trasformation du corps de la requete
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ limit: '10mb', extended: true }));

/****************************************** API REST *****************************************/  

app.post('/api/category', multer, (req, resp, next) => {
    const thingObject = JSON.parse(req.body.thing);
    const category = new Category({
        ...thingObject,
        imageURL: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    console.log('category', category);
    category.save()
    .then((data)=> {resp.status(201).json({message: 'la catégorie est ajoutée avec succès !', data: data})})
    .catch((err) => {resp.status(400).json("l'erreur est la suivante: ", err)});
}); // middleware pour traiter la requete et la réponse associées à la route post '/api/category'

app.use('/images', express.static(path.join(__dirname, 'images'))); // middleware pour télécharger l'image du serveur

app.get('/api/category', (req, res, next) => {
    Category.findAll()
    .then((categories) => { res.status(200).json({ message: 'les catégories sont téléchargées avec succès !', Data: categories }) })
    .catch((err) => { res.status(400).json({ err }) });
}); // middleware pour traiter la requeste et la réponse associées à la route get '/api/category'

app.delete('/api/category/:id', (req, res, next) => { 
  Category.findOne({
    where: { id: req.params.id }
 }).then((result) => {
     return Category.destroy({where: { id: req.params.id }})
               .then(() => { res.status(200).json({ message: 'la catégorie est supprimée avec succès !'}) })
               .catch((err) => { res.status(400).json({ err }) });
 });
});

app.get('/api/category/:id', (req, res, next) => { 
  Category.findOne({
    where: { id: req.params.id }
 })
 .then((category) => {res.status(200).json({ message: 'la catégorie est supprimée avec succès !', Data: category}) })
 .catch((err) => { res.status(400).json({ err }) });
});

module.exports = app;