import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import robotRoute from './routes/robot.js'
import metalItemRoute from './routes/metal-item.js'

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())

app.use('/robot', robotRoute)
app.use('/metal-item', metalItemRoute)

app.listen(process.env.PORT || 8080, () => {
  console.log('Server is running!')
})
