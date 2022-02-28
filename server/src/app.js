import http from 'http'
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { Server } from 'socket.io'

import robotRouter from './routes/robot.js'

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())

app.use('/robot', robotRouter)

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
  console.log('Connected.')

  socket.on('message', message => {
    console.log(`Message from ${socket.id} : ${message}`)
  })

  socket.on('disconnect', () => {
    console.log(`Socket ${socket.id} disconnected`)
  })
})

export { io }
export default server
