import express from 'express'

const router = express.Router()

router.get('/ping', async (req, res) => {
  res.send('pong!')
})

export default router
