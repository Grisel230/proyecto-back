const { Sequelize } = require('sequelize');
const variables = require('./variables.js');




const sequelize = new Sequelize(variables.database.dbname, variables.database.dbuser, variables.database.dbpasswd, {
    host: variables.database.dbhost,
    dialect: 'postgres',
    port: variables.database.dbport
});




sequelize.authenticate()
    .then(() => {
        console.log('Successful database connection :)');
    })
    .catch(err => {
        console.error('Error connecting to database:', err);
    });

sequelize.sync({alter: true})
    .then(() => {
        console.log('Tables created successfully');
    })
    .catch(err => {
        console.error('Error creating tables:', err);
    });


module.exports = { sequelize };
