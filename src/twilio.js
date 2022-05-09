const twilio = require('twilio')

const sid = 'ACedbf1a2f3c72f8b34c75139edced888e'
const token = '0bd6e0567cf82c8668629231a0f57723'
const num = '+19896629198'

const client = twilio(sid, token)

client.messages.create({
  body: "Hola desde la mac del profe",
  from: num,
  to: "+525540774320"
}).then(res => console.log(res))