/* import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Canal de comunicación del back-end con el front-end (Angular)
app.use(cors({
    origin: 'http://localhost:4200',
    allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin'],
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

export default app;
 */



const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');

// Importacion de rutas
/* const userRoutes = require('../routes/userRoutes.js');
const paymentsRoutes = require('../routes/paymentsRoutes.js');
const appointmentsRoutes = require('../routes/appointmetsRoutes.js');
const roleRoutes = require('../routes/roleRoutes.js');
const statusRoutes = require('../routes/statusRoutes.js');
const authRoutes = require("../routes/authRoutes.js");
const passwordResetRoutes = require("../routes/passwordresetRoutes.js");
const clinicalhistoryfolderRoutes = require("../routes/clinicalhistoryfolderRoutes.js");
const physiotherapistschedulesRoutes = require("../routes/physiotherapistSchedulesRoutes.js");
const servicesRoutes = require("../routes/servicesRoutes.js");
const clinicalhistoryRoutes = require("../routes/clinicalhistoryRoutes.js"); */

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cookieParser());

const userRoutes = require('../routes/usuarioRutas');
const authRoutes = require("../routes/authRoutes.js");
const viajesRoutes = require('../routes/viajeRutas.js');
const ticketRoutes = require('../routes/ticketsRutas.js');
const autobusesRoutes = require('../routes/autobusesRutas.js');



// Canal de comunicación del back-end con el front-end (Angular)
app.use(cors({
    origin: 'http://localhost:4200',
    allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));


// Ruta para verificar el estado del servidor
app.get("/health", (req, res) => {
    res.send('Servidor jala funcionando correctamente')
});

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/trips', viajesRoutes);
app.use('/api/tickets', ticketRoutes);

app.use('/api/autobuses', autobusesRoutes);
const conductoresRoutes = require('../routes/conductoresRutas');
app.use('/api/conductores', conductoresRoutes);

const ciudadesRoutes = require('../routes/ciudadRutas.js');
app.use('/api/ciudades', ciudadesRoutes);

const rutasRoutes = require('../routes/rutas.js');
app.use('/api/rutas', rutasRoutes);

module.exports = app;
