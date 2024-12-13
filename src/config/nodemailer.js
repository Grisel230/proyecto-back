const nodemailer = require('nodemailer');
require('dotenv').config();

// Transportador de nodemailer usando el SMTP de Gmail
const transporter = nodemailer.createTransport({
    service: 'Gmail', // Puedes cambiar a otro servicio SMTP
    secure: false,
    auth: {
        user: process.env.EMAIL_USER, // Tu email
        pass: process.env.EMAIL_PASS  // Tu contraseña de aplicación o contraseña generada
    },
    tls: {
        rejectUnauthorized: false
    }
});

transporter.verify().then(() => {
    console.log('Ready to send emails :P')
})

module.exports = {transporter};