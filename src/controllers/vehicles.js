const vehiclesRouter = require('express').Router()

const pool = require('../utils/pool').pool

vehiclesRouter.get('/', async (request, response) => {
    try {
        const res = await pool.query('SELECT * FROM vehicles')
        response.status(200).json(res.rows)
    } catch (err) {
        console.log(err.stack)
    }
})

module.exports = vehiclesRouter
