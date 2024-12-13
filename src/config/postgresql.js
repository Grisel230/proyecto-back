const pg = require('pg');

const pool = new pg.Pool({
    host: "localhost",
    port: 5432,
    database: "goviajes",
    user: "postgres",
    password: "123123"
});

// Exporta la constante pool
module.exports = { pool };
