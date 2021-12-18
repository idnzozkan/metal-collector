import express from 'express'
import {
  position,
  moveLeft,
  moveRight,
  moveForward,
  moveBackward,
  moveLeftForward,
  moveRightForward,
  moveLeftBackward,
  moveRightBackward,
  moveTo
} from '../gcode-utils.js'

const router = express.Router()

router.get('/position', (req, res) => {
  try {
    res.status(200).json(position)
  } catch (err) {
    console.log(err)
    res.status(500).json(err.message)
  }
})

router.get('/move/left', async (req, res) => {
  try {
    const robotRes = await moveLeft()
    res.status(200).json(robotRes)
  } catch (err) {
    console.log(err)
    res.status(500).json(err.message)
  }
})

router.get('/move/right', async (req, res) => {
  try {
    const robotRes = await moveRight()
    res.status(200).json(robotRes)
  } catch (err) {
    console.log(err)
    res.status(500).json(err.message)
  }
})

router.get('/move/forward', async (req, res) => {
  try {
    const robotRes = await moveForward()
    res.status(200).json(robotRes)
  } catch (err) {
    console.log(err)
    res.status(500).json(err.message)
  }
})

router.get('/move/backward', async (req, res) => {
  try {
    const robotRes = await moveBackward()
    res.status(200).json(robotRes)
  } catch (err) {
    console.log(err)
    res.status(500).json(err.message)
  }
})

router.get('/move/left-forward', async (req, res) => {
  try {
    const robotRes = await moveLeftForward()
    res.status(200).json(robotRes)
  } catch (err) {
    console.log(err)
    res.status(500).json(err.message)
  }
})

router.get('/move/right-forward', async (req, res) => {
  try {
    const robotRes = await moveRightForward()
    res.status(200).json(robotRes)
  } catch (err) {
    console.log(err)
    res.status(500).json(err.message)
  }
})

router.get('/move/left-backward', async (req, res) => {
  try {
    const robotRes = await moveLeftBackward()
    res.status(200).json(robotRes)
  } catch (err) {
    console.log(err)
    res.status(500).json(err.message)
  }
})

router.get('/move/right-backward', async (req, res) => {
  try {
    const robotRes = await moveRightBackward()
    res.status(200).json(robotRes)
  } catch (err) {
    console.log(err)
    res.status(500).json(err.message)
  }
})

router.post('/move/position', async (req, res) => {
  try {
    const robotRes = await moveTo(req.body)
    res.status(200).json(robotRes)
  } catch (err) {
    console.log(err)
    res.status(500).json(err.message)
  }
})

export default router
