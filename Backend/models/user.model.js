const Sequelize = require('sequelize');
const db = require('./index');

const User = db.define('user', {
    Nom: {
        type: Sequelize.STRING
    },
    Prenom: {
        type: Sequelize.STRING
    },
    Login: {
        type: Sequelize.STRING
    },
    Email: {
        type: Sequelize.STRING
    },
    Password: {
        type: Sequelize.STRING
    },
    Role: {
        type: Sequelize.ENUM('admin', 'user')
    }
});

module.exports = User;