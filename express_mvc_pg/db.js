const { Client } = require('pg')
const client = new Client(
  {
    user: 'odoo',
    host: 'localhost',
    database: 'user',
    password: 'odoo',
    port: 5432,
  }
)

module.exports = client;