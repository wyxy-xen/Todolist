/*jslint node: true */
const Sequelize = require('sequelize');
const db = require('./index');
const List = require('./list.model');

const Category = db.define('category', {
    Nom: {
        type: Sequelize.STRING
    },
    Type: {
        type: Sequelize.STRING
    },
    Photo: {
        type: Sequelize.STRING
    },
    imageURL: {
        type: Sequelize.STRING
    }
});

// one to many with table Category
Category.hasMany(List, {
    foreignKey: 'idCategory',
    sourceKey: 'id',
    allowNull: false
});

module.exports = Category;