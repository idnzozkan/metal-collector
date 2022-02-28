import gerbilCnc from 'gerbil-cnc'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { io } from '../app.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const config = fs.readFileSync(path.resolve(__dirname, '../config.json'))
const { port, stepSize, feedRate, xMax, xMin, yMax, yMin } = JSON.parse(config)

const gerbil = gerbilCnc(port)

export const moveLeft = async (robot, xToMove) => {
  const machineReady = await gerbil.machineReady
  const amountX = xToMove || stepSize

  if (machineReady[0].connected) {
    if (robot.getPosition().x - parseFloat(amountX) < xMin) throw new Error('You cannot exceed the workspace limits!')

    try {
      const response = await gerbil.writeLine(`G21G91G1X-${amountX}F${feedRate}`)

      robot.setPosition({ x: robot.getPosition() - parseFloat(amountX) })
      io.emit('update-robot-position', robot.getPosition())
      console.log(robot.getPosition())

      console.log('Response: ', response + 'Robot moved left')
      return response
    } catch (err) {
      console.log(err)
      return err.message
    }
  }
}

export const moveRight = async (robot, xToMove) => {
  const machineReady = await gerbil.machineReady
  const amountX = xToMove || stepSize

  if (machineReady[0].connected) {
    if (robot.getPosition().x + parseFloat(amountX) > xMax) throw new Error('You cannot exceed the workspace limits!')

    try {
      const response = await gerbil.writeLine(`G21G91G1X${amountX}F${feedRate}`)

      robot.setPosition({ x: robot.getPosition().x + parseFloat(amountX) })
      io.emit('update-robot-position', robot.getPosition())
      console.log(robot.getPosition())

      console.log('Response: ', response + 'Robot moved right')
      return response
    } catch (err) {
      console.log(err)
      return err.message
    }
  }
}

export const moveForward = async (robot, yToMove) => {
  const machineReady = await gerbil.machineReady
  const amountY = yToMove || stepSize

  if (machineReady[0].connected) {
    if (robot.getPosition().y + parseFloat(amountY) > yMax) throw new Error('You cannot exceed the workspace limits!')

    try {
      const response = await gerbil.writeLine(`G21G91G1Y${amountY}F${feedRate}`)

      robot.setPosition({ y: robot.getPosition().y + parseFloat(amountY) })
      io.emit('update-robot-position', robot.getPosition())
      console.log(robot.getPosition())

      console.log('Response: ', response + 'Robot moved forward')
      return response
    } catch (err) {
      console.log(err)
      return err.message
    }
  }
}

export const moveBackward = async (robot, yToMove) => {
  const machineReady = await gerbil.machineReady
  const amountY = yToMove || stepSize

  if (machineReady[0].connected) {
    if (robot.getPosition().y - parseFloat(amountY) < yMin) throw new Error('You cannot exceed the workspace limits!')

    try {
      const response = await gerbil.writeLine(`G21G91G1Y-${amountY}F${feedRate}`)

      robot.setPosition({ y: robot.getPosition().y - parseFloat(amountY) })
      io.emit('update-robot-position', robot.getPosition())
      console.log(robot.getPosition())

      console.log('Response: ', response + 'Robot moved backward')
      return response
    } catch (err) {
      console.log(err)
      return err.message
    }
  }
}

export const moveLeftForward = async (robot, xToMove, yToMove) => {
  const machineReady = await gerbil.machineReady
  const amountX = xToMove || stepSize
  const amountY = yToMove || stepSize

  if (machineReady[0].connected) {
    if (robot.getPosition().x - parseFloat(amountX) < xMin || robot.getPosition().y + parseFloat(amountY) > yMax)
      throw new Error('You cannot exceed the workspace limits!')

    try {
      const response = await gerbil.writeLine(`G21G91G1X-${amountX}Y${amountY}F${feedRate}`)

      robot.setPosition({
        x: robot.getPosition().x - parseFloat(amountX),
        y: robot.getPosition().y + parseFloat(amountY)
      })
      io.emit('update-robot-position', robot.getPosition())
      console.log(robot.getPosition())

      console.log('Response: ', response + 'Robot moved left-forward')
      return response
    } catch (err) {
      console.log(err)
      return err.message
    }
  }
}

export const moveRightForward = async (robot, xToMove, yToMove) => {
  const machineReady = await gerbil.machineReady
  const amountX = xToMove || stepSize
  const amountY = yToMove || stepSize

  if (machineReady[0].connected) {
    if (robot.getPosition().x + parseFloat(amountX) > xMax || robot.getPosition().y + parseFloat(amountY) > yMax)
      throw new Error('You cannot exceed the workspace limits!')

    try {
      const response = await gerbil.writeLine(`G21G91G1X${amountX}Y${amountY}F${feedRate}`)

      robot.setPosition({
        x: robot.getPosition().x + parseFloat(amountX),
        y: robot.getPosition().y + parseFloat(amountY)
      })
      io.emit('update-robot-position', robot.getPosition())
      console.log(robot.getPosition())

      console.log('Response: ', response + 'Robot moved right-forward')
      return response
    } catch (err) {
      console.log(err)
      return err.message
    }
  }
}

export const moveLeftBackward = async (robot, xToMove, yToMove) => {
  const machineReady = await gerbil.machineReady
  const amountX = xToMove || stepSize
  const amountY = yToMove || stepSize

  if (machineReady[0].connected) {
    if (robot.getPosition().x - parseFloat(amountX) < xMin || robot.getPosition().y - parseFloat(amountY) < yMin)
      throw new Error('You cannot exceed the workspace limits!')

    try {
      const response = await gerbil.writeLine(`G21G91G1X-${amountX}Y-${amountY}F${feedRate}`)

      robot.setPosition({
        x: robot.getPosition().x - parseFloat(amountX),
        y: robot.getPosition().y - parseFloat(amountY)
      })
      io.emit('update-robot-position', robot.getPosition())
      console.log(robot.getPosition())

      console.log('Response: ', response + 'Robot moved left-backward')
      return response
    } catch (err) {
      console.log(err)
      return err.message
    }
  }
}

export const moveRightBackward = async (robot, xToMove, yToMove) => {
  const machineReady = await gerbil.machineReady
  const amountX = xToMove || stepSize
  const amountY = yToMove || stepSize

  if (machineReady[0].connected) {
    if (robot.getPosition().x + parseFloat(amountX) > xMax || robot.getPosition().y - parseFloat(amountY) < yMin)
      throw new Error('You cannot exceed the workspace limits!')

    try {
      const response = await gerbil.writeLine(`G21G91G1X${amountX}Y-${amountY}F${feedRate}`)

      robot.setPosition({
        x: robot.getPosition().x + parseFloat(amountX),
        y: robot.getPosition().y - parseFloat(amountY)
      })
      io.emit('update-robot-position', robot.getPosition())
      console.log(robot.getPosition())

      console.log('Response: ', response + 'Robot moved right-backward')
      return response
    } catch (err) {
      console.log(err)
      return err.message
    }
  }
}
