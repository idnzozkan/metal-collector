import gerbilCnc from 'gerbil-cnc'
import fs from 'fs'
import { io } from './index.js'

const config = fs.readFileSync('./config.json')
const { port, stepSize, feedRate, xMax, xMin, yMax, yMin } = JSON.parse(config)

const gerbil = gerbilCnc(port)

export const position = { x: 0, y: 0 }

export const setPosition = ({ x, y }) => {
  position.x = x
  position.y = y
}

export const moveLeft = async xToMove => {
  const machineReady = await gerbil.machineReady
  const amountX = xToMove || stepSize

  if (machineReady[0].connected) {
    if (position.x - parseFloat(amountX) < xMin)
      throw new Error('You cannot exceed the workspace limits!')

    try {
      const response = await gerbil.writeLine(`G21G91G1X-${amountX}F${feedRate}`)

      position.x -= parseFloat(amountX)
      io.emit('update-robot-position', position)
      console.log(position)

      console.log('Response: ', response + 'Machine moved left')
      return response
    } catch (err) {
      console.log(err)
      return err.message
    }
  }
}

export const moveRight = async xToMove => {
  const machineReady = await gerbil.machineReady
  const amountX = xToMove || stepSize

  if (machineReady[0].connected) {
    if (position.x + parseFloat(amountX) > xMax)
      throw new Error('You cannot exceed the workspace limits!')

    try {
      const response = await gerbil.writeLine(`G21G91G1X${amountX}F${feedRate}`)

      position.x += parseFloat(amountX)
      io.emit('update-robot-position', position)
      console.log(position)

      console.log('Response: ', response + 'Machine moved right')
      return response
    } catch (err) {
      console.log(err)
      return err.message
    }
  }
}

export const moveForward = async yToMove => {
  const machineReady = await gerbil.machineReady
  const amountY = yToMove || stepSize

  if (machineReady[0].connected) {
    if (position.y + parseFloat(amountY) > yMax)
      throw new Error('You cannot exceed the workspace limits!')

    try {
      const response = await gerbil.writeLine(`G21G91G1Y${amountY}F${feedRate}`)

      position.y += parseFloat(amountY)
      io.emit('update-robot-position', position)
      console.log(position)

      console.log('Response: ', response + 'Machine moved forward')
      return response
    } catch (err) {
      console.log(err)
      return err.message
    }
  }
}

export const moveBackward = async yToMove => {
  const machineReady = await gerbil.machineReady
  const amountY = yToMove || stepSize

  if (machineReady[0].connected) {
    if (position.y - parseFloat(amountY) < yMin)
      throw new Error('You cannot exceed the workspace limits!')

    try {
      const response = await gerbil.writeLine(`G21G91G1Y-${amountY}F${feedRate}`)

      position.y -= parseFloat(amountY)
      io.emit('update-robot-position', position)
      console.log(position)

      console.log('Response: ', response + 'Machine moved backward')
      return response
    } catch (err) {
      console.log(err)
      return err.message
    }
  }
}

export const moveLeftForward = async (xToMove, yToMove) => {
  const machineReady = await gerbil.machineReady
  const amountX = xToMove || stepSize
  const amountY = yToMove || stepSize

  if (machineReady[0].connected) {
    if (position.x - parseFloat(amountX) < xMin || position.y + parseFloat(amountY) > yMax)
      throw new Error('You cannot exceed the workspace limits!')

    try {
      const response = await gerbil.writeLine(`G21G91G1X-${amountX}Y${amountY}F${feedRate}`)

      position.x -= parseFloat(amountX)
      position.y += parseFloat(amountY)
      io.emit('update-robot-position', position)
      console.log(position)

      console.log('Response: ', response + 'Machine moved left-forward')
      return response
    } catch (err) {
      console.log(err)
      return err.message
    }
  }
}

export const moveRightForward = async (xToMove, yToMove) => {
  const machineReady = await gerbil.machineReady
  const amountX = xToMove || stepSize
  const amountY = yToMove || stepSize

  if (machineReady[0].connected) {
    if (position.x + parseFloat(amountX) > xMax || position.y + parseFloat(amountY) > yMax)
      throw new Error('You cannot exceed the workspace limits!')

    try {
      const response = await gerbil.writeLine(`G21G91G1X${amountX}Y${amountY}F${feedRate}`)

      position.x += parseFloat(amountX)
      position.y += parseFloat(amountY)
      io.emit('update-robot-position', position)
      console.log(position)

      console.log('Response: ', response + 'Machine moved right-forward')
      return response
    } catch (err) {
      console.log(err)
      return err.message
    }
  }
}

export const moveLeftBackward = async (xToMove, yToMove) => {
  const machineReady = await gerbil.machineReady
  const amountX = xToMove || stepSize
  const amountY = yToMove || stepSize

  if (machineReady[0].connected) {
    if (position.x - parseFloat(amountX) < xMin || position.y - parseFloat(amountY) < yMin)
      throw new Error('You cannot exceed the workspace limits!')

    try {
      const response = await gerbil.writeLine(`G21G91G1X-${amountX}Y-${amountY}F${feedRate}`)

      position.x -= parseFloat(amountX)
      position.y -= parseFloat(amountY)
      io.emit('update-robot-position', position)
      console.log(position)

      console.log('Response: ', response + 'Machine moved left-backward')
      return response
    } catch (err) {
      console.log(err)
      return err.message
    }
  }
}

export const moveRightBackward = async (xToMove, yToMove) => {
  const machineReady = await gerbil.machineReady
  const amountX = xToMove || stepSize
  const amountY = yToMove || stepSize

  if (machineReady[0].connected) {
    if (position.x + parseFloat(amountX) > xMax || position.y - parseFloat(amountY) < yMin)
      throw new Error('You cannot exceed the workspace limits!')

    try {
      const response = await gerbil.writeLine(`G21G91G1X${amountX}Y-${amountY}F${feedRate}`)

      position.x += parseFloat(amountX)
      position.y -= parseFloat(amountY)
      io.emit('update-robot-position', position)
      console.log(position)

      console.log('Response: ', response + 'Machine moved right-backward')
      return response
    } catch (err) {
      console.log(err)
      return err.message
    }
  }
}

export const moveTo = async target => {
  let { x, y } = target
  x = parseFloat(x) - position.x
  y = parseFloat(y) - position.y

  if (x && !y) {
    if (x < 0) {
      await moveLeft(Math.abs(x))
    } else {
      await moveRight(x)
    }
  }

  if (!x && y) {
    if (y < 0) {
      await moveBackward(Math.abs(y))
    } else {
      await moveForward(y)
    }
  }

  if (x && y) {
    if (x < 0 && y > 0) {
      await moveLeftForward(Math.abs(x), y)
    } else if (x < 0 && y < 0) {
      await moveLeftBackward(Math.abs(x), Math.abs(y))
    } else if (x > 0 && y > 0) {
      await moveRightForward(x, y)
    } else if (x > 0 && y < 0) {
      await moveRightBackward(x, Math.abs(y))
    }
  }

  if (!x && !y) {
    return console.log("Don't move")
  }
}

export const scan = async () => {
  const dummyMetalsData = fs.readFileSync('./dummy-metals.json')
  const dummyMetals = JSON.parse(dummyMetalsData)
  const detectedMetals = []

  for (let x = parseFloat(xMin); x <= parseFloat(xMax); x += 50) {
    for (let y = parseFloat(yMax); y >= parseFloat(yMin); y -= 1) {
      // if the inductive sensor detects a metal at the current position
      // then push the found metal to the array

      const foundMetal = dummyMetals.find(item => item.position.x == x && item.position.y == y)

      if (foundMetal) detectedMetals.push(foundMetal)

      await moveTo({ x, y })
    }
  }

  return detectedMetals
}
