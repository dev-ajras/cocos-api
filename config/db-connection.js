const { Sequelize } = require('sequelize')

const db = new Sequelize(process.env.DATABASE_NAME, process.env.USERNAME, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: 'mysql',
    timezone: '-03:00'
})

module.exports = db