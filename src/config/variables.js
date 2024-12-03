import dotenv from 'dotenv';

dotenv.config();  // Cargar las variables de entorno desde el archivo .env

export const variables = {
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
};