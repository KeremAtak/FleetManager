const vehiclesRouter = require('express').Router()

// Gets pooling from utils
const pool = require('../utils/pool').pool

// Fetches all the vehicles
vehiclesRouter.get('/', async (request, response) => {
    try {
        const res = await pool.query('SELECT * FROM vehicles')
        response.status(200).json(res.rows)
    } catch (err) {
        // In case of an error that the program fails to catch
        response.status(500).json({ error: 'something went wrong' })
    }
})

// Fetches a single vehicle using the id-parameter
vehiclesRouter.get('/:id', async (request, response) => {
    try {
        const id = parseInt(request.params.id)
        const res = await pool.query('SELECT * FROM vehicles ' +
            'WHERE id = $1', [id])
        if (res.rows.length === 0) {
            response.status(400).json({ error: 'malformatted id' })
        }
        response.status(200).json(res.rows)
    } catch (err) {
        // In case of an error that the program fails to catch
        response.status(500).json({ error: 'something went wrong' })
    }
})

// Creates a new vehicle
vehiclesRouter.post('/', async (request, response) => {
    try {
        const { brand, model, registration_number, model_year,
            inspection_date, engine_displacement, engine_power } = request.body

        if (brand === undefined) {
            response.status(400).json({ error: 'brand missing' })
        } else if (model === undefined) {
            response.status(400).json({ error: 'model missing' })
        } else if (registration_number === undefined) {
            response.status(400).json({ error: 'registration number missing' })
        } else if (model_year === undefined) {
            response.status(400).json({ error: 'model year missing' })
        } else if (engine_power === undefined) {
            response.status(400).json({ error: 'engine power missing' })
        }
        const res = await pool.query('INSERT INTO vehicles(brand, model, ' +
            'registration_number, model_year, inspection_date, engine_displacement,' +
            'engine_power) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [brand, model, registration_number,
                model_year, inspection_date, engine_displacement, engine_power])

        response.status(201).send({ response: res.rows });
    } catch (err) {
        // In case of an error that the  program fails to catch
        response.status(500).json({ error: 'something went wrong' })
    }
})

// Fetches a single vehicle using the id-parameter
// Current execution asks you to replace all data
vehiclesRouter.put('/:id', async (request, response) => {
    try {
        const id = parseInt(request.params.id)
        const { brand, model, registration_number, model_year,
            inspection_date, engine_displacement, engine_power } = request.body
        if (brand === undefined) {
            response.status(400).json({ error: 'brand missing' })
        } else if (model === undefined) {
            response.status(400).json({ error: 'model missing' })
        } else if (registration_number === undefined) {
            response.status(400).json({ error: 'registration number missing' })
        } else if (model_year === undefined) {
            response.status(400).json({ error: 'model year missing' })
        } else if (engine_power === undefined) {
            response.status(400).json({ error: 'engine power missing' })
        }

        const res = await pool.query('UPDATE vehicles SET brand = $1, model = $2, ' +
            'registration_number = $3, model_year = $4, inspection_date = $5, ' +
            'engine_displacement = $6, engine_power = $7 WHERE id = $8 RETURNING *',
            [brand, model, registration_number, model_year, inspection_date,
                engine_displacement, engine_power, id])

        if (res.rows.length === 0) {
            response.status(400).json({ error: 'malformatted id' })
        }
        response.status(200).send({ response: res.rows });
    } catch (err) {
        // In case of an error that program fails to catch
        response.status(500).json({ error: 'something went wrong' })
    }
})

// Deletes a single vehicle using the id-parameter
vehiclesRouter.delete('/:id', async (request, response) => {
    try {
        const id = parseInt(request.params.id)
        const res = await pool.query('DELETE FROM vehicles WHERE id = $1 RETURNING *', [id])
        if (res.rows.length === 0) {
            response.status(400).json({ error: 'malformatted id' })
        }
        response.status(200).send({ response: res.rows });
    } catch (err) {
        // In case of an error that program fails to catch
        response.status(500).json({ error: 'something went wrong' })
    }
})

// Fetches all vehicles with a certain brand
vehiclesRouter.get('/brand/:brand', async (request, response) => {
    const brand = request.params.brand
    try {
        const res = await pool.query('SELECT * FROM vehicles WHERE UPPER(brand) = UPPER($1)', [brand])
        if (res.rows.length === 0) {
            response.status(400).json({ error: 'malformatted brand' })
        }
        response.status(200).json(res.rows)
    } catch (err) {
        // In case of an error that the program fails to catch
        response.status(500).json({ error: 'something went wrong' })
    }
})

// Fetches all vehicles with a certain model
vehiclesRouter.get('/model/:model', async (request, response) => {
    const model = request.params.model
    try {
        const res = await pool.query('SELECT * FROM vehicles WHERE UPPER(model) = UPPER($1)', [model])
        if (res.rows.length === 0) {
            response.status(400).json({ error: 'malformatted model' })
        }
        response.status(200).json(res.rows)
    } catch (err) {
        // In case of an error that the program fails to catch
        response.status(500).json({ error: 'something went wrong' })
    }
})

// Fetches all vehicles created between years min and max
vehiclesRouter.get('/year/:min/:max', async (request, response) => {
    const min = parseInt(request.params.min)
    const max = parseInt(request.params.max)
    try {
        const res = await pool.query('SELECT * FROM vehicles WHERE model_year BETWEEN $1 AND $2', [min, max])
        response.status(200).json(res.rows)
    } catch (err) {
        // In case of an error that the program fails to catch
        response.status(500).json({ error: 'something went wrong' })
    }
})

module.exports = vehiclesRouter
