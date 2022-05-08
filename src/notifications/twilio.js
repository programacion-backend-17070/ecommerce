const twilio = require('twilio')
const config = require('../config')

class TwilioSender {
  constructor() {
    this.client =  twilio(config.twilio.TWILIO_SID, config.twilio.TWILIO_AUTH)
  }

  async sendSms(to) {
    try {
      const message = await this.client.messages.create({
        body: "Tu pedido va en camino!",
        from: config.twilio.TWILIO_PHONE,
        to
      })
      console.log(message)
    } catch (err) {
      console.log(err)
    }
  }

  sendWhatsapp() {

  }
}

module.exports = new TwilioSender();