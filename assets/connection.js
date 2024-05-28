const mysql = require('mysql2');
require('dotenv').config();
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: process.env.DB_USER,
      // TODO: Add MySQL password here
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    },
    console.log(`Connected to the database.`)
  );

  module.exports = {
    db,
  }