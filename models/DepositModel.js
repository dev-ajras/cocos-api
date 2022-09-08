const { DATE } = require('sequelize')
const { Sequelize } = require('sequelize')

const db = require('../config/db-connection')
  
const { DataTypes } = Sequelize
const User = require('./UserModel')
const Deposit = db.define('deposits', {
        
        amount: {
            type: DataTypes.DOUBLE
        },
        currency: {
          type: DataTypes.STRING,
          defaultValue: 'Ars'
        },
        date: {
            type: DataTypes.DATEONLY,
            defaultValue: DataTypes.NOW
        }

   },{
    // Freeze Table Name
    freezeTableName: true,
    timestamps:false
  })

  Deposit.User = Deposit.belongsTo(User)

  Deposit.sync()

module.exports = Deposit