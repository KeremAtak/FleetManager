const { Pool } = require('pg');
const connectionString = 'postgresql://manager:password@localhost/fleet'

const pool = new Pool({
    connectionString: connectionString
})

const text = 'INSERT INTO vehicles(brand, model, registration_number, model_year, engine_displacement, engine_power) VALUES($1, $2, $3, $4, $5, $6) RETURNING *'
const getAll = 'SELECT * FROM vehicles'
const values = ['Toyota', 'Avensis', 'ABC-124', '1997', 1600, 95]

pool.query(getAll, (err, res) => {
    try {
        console.log(res.rows)
    } catch (e) {
        console.log(e.stack)
    }
})