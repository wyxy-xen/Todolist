const Sequelize = require('sequelize');
const db = require('./index');
const Category = require('./category.model');
const User = require('./user.model');

const List = db.define('list', {
    Nom: {
        type: Sequelize.STRING
    },
    Type: {
        type: Sequelize.ENUM('ponctuel', 'au long cours')
    },
    Category: {
        type: Sequelize.STRING
    },
    DateDebut: {
        type: Sequelize.DATE
    },
    DateFin: {
        type: Sequelize.DATE
    },
    DateFinExact: {
        type: Sequelize.DATE
    },
    IsDone: {
        type: Sequelize.BOOLEAN
    },
    IsLate: {
        type: Sequelize.STRING
    },
    Percent: {
        type: Sequelize.NUMBER
    }
});

List.hasMany(Category);
List.hasMany(User);

module.exports = List;