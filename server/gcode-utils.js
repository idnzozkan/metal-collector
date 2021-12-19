import gerbilCnc from 'gerbil-cnc'
import fs from 'fs'

const config = fs.readFileSync('./config.json')
const { port, stepSize, feedRate } = JSON.parse(config)

const gerbil = gerbilCnc(port)

export const position = { x: 0, y: 0 }

export const moveLeft = async xToMove => {
  const machineReady = await gerbil.machineReady

  if (machineReady[0].connected) {
    try {
      const response = await gerbil.writeLine(
        `G21G91G1X-${xToMove ? xToMove : stepSize}F${feedRate}`
      )

      position.x -= parseFloat(xToMove ? xToMove : stepSize)

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

  if (machineReady[0].connected) {
    try {
      const response = await gerbil.writeLine(
        `G21G91G1X${xToMove ? xToMove : stepSize}F${feedRate}`
      )

      position.x += parseFloat(xToMove ? xToMove : stepSize)

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

  if (machineReady[0].connected) {
    try {
      const response = await gerbil.writeLine(
        `G21G91G1Y${yToMove ? yToMove : stepSize}F${feedRate}`
      )

      position.y += parseFloat(yToMove ? yToMove : stepSize)

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

  if (machineReady[0].connected) {
    try {
      const response = await gerbil.writeLine(
        `G21G91G1Y-${yToMove ? yToMove : stepSize}F${feedRate}`
      )

      position.y -= parseFloat(yToMove ? yToMove : stepSize)

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

  if (machineReady[0].connected) {
    try {
      const response = await gerbil.writeLine(
        `G21G91G1X-${xToMove ? xToMove : stepSize}Y${yToMove ? yToMove : stepSize}F${feedRate}`
      )

      position.x -= parseFloat(xToMove ? xToMove : stepSize)
      position.y += parseFloat(yToMove ? yToMove : stepSize)

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

  if (machineReady[0].connected) {
    try {
      const response = await gerbil.writeLine(
        `G21G91G1X${xToMove ? xToMove : stepSize}Y${yToMove ? yToMove : stepSize}F${feedRate}`
      )

      position.x += parseFloat(xToMove ? xToMove : stepSize)
      position.y += parseFloat(yToMove ? yToMove : stepSize)

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

  if (machineReady[0].connected) {
    try {
      const response = await gerbil.writeLine(
        `G21G91G1X-${xToMove ? xToMove : stepSize}Y-${yToMove ? yToMove : stepSize}F${feedRate}`
      )

      position.x -= parseFloat(xToMove ? xToMove : stepSize)
      position.y -= parseFloat(yToMove ? yToMove : stepSize)

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

  if (machineReady[0].connected) {
    try {
      const response = await gerbil.writeLine(
        `G21G91G1X${xToMove ? xToMove : stepSize}Y-${yToMove ? yToMove : stepSize}F${feedRate}`
      )

      position.x += parseFloat(xToMove ? xToMove : stepSize)
      position.y -= parseFloat(yToMove ? yToMove : stepSize)

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

  console.log('x: ', x + ' y: ', y)

  if (x && !y) {
    if (x < 0) {
      moveLeft(Math.abs(x))
    } else {
      moveRight(x)
    }
  }

  if (!x && y) {
    if (y < 0) {
      moveBackward(Math.abs(y))
    } else {
      moveForward(y)
    }
  }

  if (x && y) {
    if (x < 0 && y > 0) {
      moveLeftForward(Math.abs(x), y)
    } else if (x < 0 && y < 0) {
      moveLeftBackward(Math.abs(x), Math.abs(y))
    } else if (x > 0 && y > 0) {
      moveRightForward(x, y)
    } else if (x > 0 && y < 0) {
      moveRightBackward(x, Math.abs(y))
    }
  }

  if (!x && !y) {
    return console.log("Don't move")
  }
}
