const express = require('express');
const bodyParser = require('body-parser');
const server = express();
const config = require('./utils/config')
const cors = require('cors')

server.use(cors())
server.use(bodyParser.json());
server.use(require('./utils/middleware').logger)

//these are the controllers that the server uses
server.use('/api/vehicles', require('./controllers/vehicles'))

const text = 'INSERT INTO vehicles(brand, model, registration_number, model_year, engine_displacement, engine_power) VALUES($1, $2, $3, $4, $5, $6) RETURNING *'
const getAll = 'SELECT * FROM vehicles'
const values = ['Toyota', 'Avensis', 'ABC-124', '1997', 1600, 95]

server.get('/', (request, response) => {
    response.json({
        message: 'FleetManager API'
    })
})


server.listen(config.port, () => {
    console.log(`Server running on port`, config.port)
})