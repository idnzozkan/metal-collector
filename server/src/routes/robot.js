import express from 'express'
import Robot from '../lib'

const router = express.Router()
const robot = new Robot()

router.get('/position', (req, res) => {
  res.status(200).json(robot.getPosition())
})

router.post('/position', (req, res) => {
  robot.setPosition(req.body)
  res.status(200).json(robot.getPosition())
})

router.get('/scan', async (req, res) => {
  try {
    const robotRes = await robot.scan()
    res.status(200).json(robotRes)
  } catch (err) {
    console.log(err)
    res.status(500).json(err.message)
  }
})

router.get('/move/left', async (req, res) => {
  try {
    const robotRes = await robot.moveLeft()
    res.status(200).json(robotRes)
  } catch (err) {
    console.log(err)
    res.status(500).json(err.message)
  }
})

router.get('/move/right', async (req, res) => {
  try {
    const robotRes = await robot.moveRight()
    res.status(200).json(robotRes)
  } catch (err) {
    console.log(err)
    res.status(500).json(err.message)
  }
})

router.get('/move/forward', async (req, res) => {
  try {
    const robotRes = await robot.moveForward()
    res.status(200).json(robotRes)
  } catch (err) {
    console.log(err)
    res.status(500).json(err.message)
  }
})

router.get('/move/backward', async (req, res) => {
  try {
    const robotRes = await robot.moveBackward()
    res.status(200).json(robotRes)
  } catch (err) {
    console.log(err)
    res.status(500).json(err.message)
  }
})

router.get('/move/left-forward', async (req, res) => {
  try {
    const robotRes = await robot.moveLeftForward()
    res.status(200).json(robotRes)
  } catch (err) {
    console.log(err)
    res.status(500).json(err.message)
  }
})

router.get('/move/right-forward', async (req, res) => {
  try {
    const robotRes = await robot.moveRightForward()
    res.status(200).json(robotRes)
  } catch (err) {
    console.log(err)
    res.status(500).json(err.message)
  }
})

router.get('/move/left-backward', async (req, res) => {
  try {
    const robotRes = await robot.moveLeftBackward()
    res.status(200).json(robotRes)
  } catch (err) {
    console.log(err)
    res.status(500).json(err.message)
  }
})

router.get('/move/right-backward', async (req, res) => {
  try {
    const robotRes = await robot.moveRightBackward()
    res.status(200).json(robotRes)
  } catch (err) {
    console.log(err)
    res.status(500).json(err.message)
  }
})

router.post('/move/position', async (req, res) => {
  try {
    const robotRes = await robot.moveTo(req.body)
    res.status(200).json(robotRes)
  } catch (err) {
    console.log(err)
    res.status(500).json(err.message)
  }
})

export default router
