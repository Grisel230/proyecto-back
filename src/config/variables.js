// Dentro de este archivo colocarán todas las variables globales del sistema para su reutilización

require('dotenv').config();  // Cargar las variables de entorno desde el archivo .env

module.exports = {
    app: {
        port: process.env.PORT || 4000,
    },
    database: {
        dbhost: process.env.DBHOST,
        dbname: process.env.DATABASE,
        dbport: process.env.DBPORT,
        dbuser: process.env.DBUSER,
        dbpasswd: process.env.DBPASSWORD,
    }
}
