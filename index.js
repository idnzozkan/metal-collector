const SerialPort = require('serialport')
const port = new SerialPort('/dev/ttyUSB0', { baudRate: 115200 })

port.write('$$', function (err) {
  if (err) {
    return console.log('Error on write: ', err.message)
  }

  console.log('message written')
})
