import http from 'http'
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { Server } from 'socket.io'

import robotRoute from './routes/robot.js'
import metalItemRoute from './routes/metal-item.js'

dotenv.config()

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    transports: ['websocket', 'polling'],
    credentials: true
  }
})

io.on('connection', socket => {
  console.log('A user is connected')

  socket.on('message', message => {
    console.log(`message from ${socket.id} : ${message}`)
  })

  socket.on('disconnect', () => {
    console.log(`socket ${socket.id} disconnected`)
  })
})

export { io }

app.use(express.json())
app.use(cors())

app.use('/robot', robotRoute)
app.use('/metal-item', metalItemRoute)

server.listen(process.env.PORT || 8080, () => {
  console.log('Server is running!')
})
