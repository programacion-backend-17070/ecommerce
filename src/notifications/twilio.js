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
}

module.exports = new SmsSender()