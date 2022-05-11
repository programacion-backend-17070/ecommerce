const twilio = require('twilio')
const config = require('../config')

class SmsSender {
  constructor () {
    this.client = twilio(config.twilio.TWILIO_SID, config.twilio.TWILIO_AUTH)
  }
  
  async send(phone) {
    const response = await this.client.messages.create({
      body: "Tu pedido va en camino",
      from: config.twilio.TWILIO_PHONE,
      to: phone
    })

    console.log(response)
  }

  async sendWhatsapp(phone = '+5214421977355') {
    const response = await this.client.messages
      .create({
         from: 'whatsapp:+14155238886',
         body: 'Hola! Tu pedido va en camino. Llega en un periodo de 1-2 días hábiles 😎',
         mediaUrl: ["https://920459.smushcdn.com/2298792/wp-content/uploads/2018/06/gato-feliz.jpg?lossy=1&strip=1&webp=1"],
         to: `whatsapp:${phone}`
       })
      
    console.log(response)
  }
}

module.exports = new SmsSender()