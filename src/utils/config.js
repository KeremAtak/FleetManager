// Fetches configuration data from env to application

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

let port = process.env.PORT
let dbUrl = process.env.DATABASE_URL

// In case of tests we use different configuration
if (process.env.NODE_ENV === 'test') {
    port = process.env.TEST_PORT
    dbUrl = process.env.TEST_DATABASE_URL
}

module.exports = {
    dbUrl,
    port
}
