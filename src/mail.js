const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 587,
  auth: {
      user: config.mail.GMAIL_ADDRESS,
      pass: config.mail.GMAIL_PWD
  }
});

const mailOptions = {
  from: "Notificaciones <no-reply@videojuegos.com>",
  subject: "Tu pedido en la tienda de videojuegos",
  to: email,
  html: 'Hola'
}

transporter.sendMail(mailOptions).then(response => console.log(response))