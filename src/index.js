const express = require('express');
const bodyParser = require('body-parser');
const server = express();
const config = require('./utils/config')
const cors = require('cors')

server.use(cors())
server.use(bodyParser.json());
server.use(require('./utils/middleware').logger)

//these are the controller(s) that the server uses
server.use('/api/vehicles', require('./controllers/vehicles'))
server.use('/api/models', require('./controllers/models'))

server.get('/', (request, response) => {
    response.json({ message: 'FleetManager API' })
})

server.listen(config.port, () => {
    console.log(`Server running on port`, config.port)
})