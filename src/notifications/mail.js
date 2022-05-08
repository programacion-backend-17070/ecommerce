const nodemailer = require('nodemailer')
const config = require('../config')

const TEST_EMAIL = 'laisha.streich44@ethereal.email'
class MailSender {
  constructor() {
    // this.transporter = nodemailer.createTransport({
    //   host: 'smtp.ethereal.email',
    //   port: 587,
    //   auth: {
    //       user: TEST_EMAIL,
    //       pass: '7YW2JEe5FyFyXn6EBQ'
    //   }
    // });

    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 587,
      auth: {
          user: config.mail.GMAIL_ADDRESS,
          pass: config.mail.GMAIL_PWD
      }
    });
  }

  async send(to, template) {

    const mailOptions = {
      from: "'Notificaciones <no-reply@videojuegos.com>'",
      subject: "Tu pedido en la tienda de videojuegos",
      to,
      attachments: [
        {
          path: __dirname + '/pedido.png'
        }
      ],
      html: template || '<h1 style="color: blue;">Tu pedido esta siendo procesado <span style="color: green;">Tienda de videojuegos</span></h1>'
    }

    const res = await this.transporter.sendMail(mailOptions)
    console.log(res)
  }
}


module.exports = new MailSender()