// Fetches configuration data from env to application
const { Pool } = require('pg');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

let port = process.env.PORT

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'password',
    port: 5432,
})

module.exports = {
    port, pool
}
