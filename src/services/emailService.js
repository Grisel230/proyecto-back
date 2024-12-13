// Lógica para enviar un correo electrónico para verificar al usuario
const { transporter } = require("../config/nodemailer");
require('dotenv').config();

class EmailService {
    constructor() {
        this.transporter = transporter;
    }

    // Generar código aleatorio de 6 dígitos
    generateVerificationCode() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }

    // Plantilla para email de verificación de cuenta
    async sendAccountVerification(userEmail, verificationToken) {
        try {
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: userEmail,
                subject: 'Verifica tu cuenta de ARBA',
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                        <h2 style="color: #333;">¡Bienvenido a ARBA!</h2>
                        <p>Gracias por registrarte. Para verificar tu cuenta, por favor haz clic en el siguiente enlace:</p>
                        <a href="${process.env.FRONTEND_URL}/api/auth/verify/${verificationToken}" 
                           style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0;">
                            Verificar mi cuenta
                        </a>
                        <p>Si no creaste esta cuenta, puedes ignorar este correo.</p>
                        <p>Este enlace expirará en 24 horas.</p>
                    </div>
                `
            };

            const info = await this.transporter.sendMail(mailOptions);
            return { success: true, messageId: info.messageId };

        } catch (error) {
            console.error('Error sending verification email:', error);
            throw new Error('Failed to send verification email');
        }
    }

    // Plantilla para email de recuperación de contraseña
    async sendPasswordRecovery(userEmail) {
        const recoveryCode = this.generateVerificationCode();

        try {
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: userEmail,
                subject: 'Recuperación de Contraseña ARBA',
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                        <h2 style="color: #333;">Recuperación de Contraseña</h2>
                        <p>Has solicitado restablecer tu contraseña. Usa el siguiente código para continuar:</p>
                        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; text-align: center; margin: 20px 0;">
                            <h1 style="color: #4CAF50; letter-spacing: 5px; font-size: 32px;">${recoveryCode}</h1>
                        </div>
                        <p>Este código expirará en 15 minutos.</p>
                        <p>Si no solicitaste cambiar tu contraseña, ignora este correo.</p>
                    </div>
                `
            };

            const info = await this.transporter.sendMail(mailOptions);
            return { 
                success: true, 
                messageId: info.messageId,
                recoveryCode // Devolver el código para guardarlo en la base de datos
            };

        } catch (error) {
            console.error('Error sending recovery email:', error);
            throw new Error('Failed to send recovery email');
        }
    }

    // Método para verificar la conexión
    async verifyConnection() {
        try {
            await this.transporter.verify();
            console.log('Ready to send emails :P');
            return true;
        } catch (error) {
            console.error('Error verifying email connection:', error);
            return false;
        }
    }
}

// Crear y exportar una instancia del servicio
const emailService = new EmailService();
module.exports = emailService;
