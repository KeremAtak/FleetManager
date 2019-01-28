const { pg, Pool } = require('pg');
const config = require('./config')

// This is the pool-configuration. You must change it if you've configured postgres differently!
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'password',
    port: 5432,
})

module.exports = {
    pool
}