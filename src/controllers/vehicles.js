/* eslint-disable camelcase */
const vehiclesRouter = require('express').Router()

// Gets pooling from utils
const pool = require('../utils/config').pool

// Fetches all the vehicles
vehiclesRouter.get('/', async (request, response) => {
  try {
    const res = await pool.query(
      'SELECT * FROM models m ' +
      'INNER JOIN vehicles v ' +
      'ON v.model_id = m.id')
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
    const res = await pool.query(
      'SELECT * FROM models m ' +
      'INNER JOIN vehicles v ' +
      'ON v.model_id = m.id ' +
      'WHERE v.id = $1', [id])
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
    const { registration_number, inspection_date, model_id } = request.body

    if (registration_number === undefined) {
      response.status(400).json({ error: 'registration number missing' })
    } else if (model_id === undefined) {
      response.status(400).json({ error: 'model id missing' })
    }

    // We must verify that the model does exist.
    // These lines can be removed if verification is done elsewhere
    const model = await pool.query(
      'SELECT * FROM models ' +
      'WHERE id = $1', [model_id]);
    if (model.rows.length === 0) {
      response.status(400).json({ error: 'malformatted model id' })
    }

    const res = await pool.query(
      'INSERT INTO vehicles(registration_number, inspection_date, model_id) ' +
      'VALUES (UPPER($1), $2, $3) ' +
      'RETURNING *',
      [registration_number, inspection_date, model_id])

    response.status(201).send({ response: res.rows });
  } catch (err) {
    // In case of an error that the program fails to catch
    response.status(500).json({ error: 'something went wrong' })
  }
})

// Fetches a single vehicle using the id-parameter
// Current execution asks you to replace all data
vehiclesRouter.put('/:id', async (request, response) => {
  try {
    const id = parseInt(request.params.id)
    const { registration_number, inspection_date, model_id } = request.body
    if (registration_number === undefined) {
      response.status(400).json({ error: 'registration number missing' })
    } else if (model_id === undefined) {
      response.status(400).json({ error: 'model year missing' })
    }

    // We must verify that the model does exist.
    // These lines can be removed if verification is done elsewhere
    const model = await pool.query(
      'SELECT * FROM models ' +
      'WHERE id = $1', [model_id]);
    if (model.rows.length === 0) {
      response.status(400).json({ error: 'malformatted model id' })
    }

    const res = await pool.query(
      'UPDATE vehicles ' +
      'SET registration_number = UPPER($1), inspection_date = $2, model_id = $3 ' +
      'WHERE id = $4 ' +
      'RETURNING *', [registration_number, inspection_date, model_id, id])

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
    const res = await pool.query(
      'DELETE FROM vehicles ' +
      'WHERE id = $1 ' +
      'RETURNING *', [id])
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
    const res = await pool.query(
      'SELECT * FROM models m ' +
      'INNER JOIN vehicles v ' +
      'ON v.model_id = m.id ' +
      'WHERE UPPER(m.brand) = UPPER($1)', [brand])
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
    const res = await pool.query(
      'SELECT * FROM models m ' +
      'INNER JOIN vehicles v ' +
      'ON v.model_id = m.id ' +
      'WHERE UPPER(m.model) = UPPER($1)', [model])
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
    const res = await pool.query(
      'SELECT * FROM models m ' +
      'INNER JOIN vehicles v ' +
      'ON v.model_id = m.id ' +
      'WHERE m.model_year ' +
      'BETWEEN $1 AND $2', [min, max])
    response.status(200).json(res.rows)
  } catch (err) {
    // In case of an error that the program fails to catch
    response.status(500).json({ error: 'something went wrong' })
  }
})

module.exports = vehiclesRouter
