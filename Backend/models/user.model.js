const Sequelize = require('sequelize');
const db = require('./index');
const List = require('./list.model');
const Category = require('./category.model');

const User = db.define('user', {
    Nom: {
        type: Sequelize.STRING
    },
    Prenom: {
        type: Sequelize.STRING
    },
    Email: {
        type: Sequelize.STRING,
        unique: true
    },
    Login: {
        type: Sequelize.STRING
    },
    MPasse: {
        type: Sequelize.STRING
    },
    Role: {
        type: Sequelize.ENUM('admin', 'user')
    }
});

// one to many with table List
User.hasMany(List, {
    foreignKey: 'idUser',
    sourceKey: 'id',
    allowNull: false
});
// one to many with table Category
User.hasMany(Category, {
    foreignKey: 'idUser',
    sourceKey: 'id',
    allowNull: false
});

module.exports = User;