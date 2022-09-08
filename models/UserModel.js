const { Sequelize } = require('sequelize')

const db = require('../config/db-connection')

const { DataTypes } = Sequelize

const User = db.define('users', {
    firstname: {
        type: DataTypes.STRING
    },
    lastname: {
        type: DataTypes.STRING
    },
    username: {
      type: DataTypes.STRING,
      
    },
    password: {
      type: DataTypes.STRING
    },
    amount: {
        type: DataTypes.DOUBLE,
        defaultValue: 0
    }
  },{
    // Freeze Table Name
    freezeTableName: true,
    timestamps:false
  });

     User.sync()


  

module.exports = User