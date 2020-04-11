const Sequelize = require('sequelize');
const db = require('./index');

const Category = db.define('category', {
    Nom: {
        type: Sequelize.STRING
    },
    Type: {
        type: Sequelize.STRING
    },
    Photo: {
        type: Sequelize.STRING
    }
});

module.exports = Category;