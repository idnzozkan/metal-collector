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

      position.x -= parseFloat(stepSize)
      position.y += parseFloat(stepSize)

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

      position.x += parseFloat(stepSize)
      position.y -= parseFloat(stepSize)

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

      position.x += parseFloat(stepSize)
      position.y += parseFloat(stepSize)

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

      position.x -= parseFloat(stepSize)
      position.y -= parseFloat(stepSize)

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

      position.y += parseFloat(stepSize)

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

      position.x += parseFloat(stepSize)

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
      position.x -= parseFloat(stepSize)

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

      position.y -= parseFloat(stepSize)

      console.log('Response: ', response + 'Machine moved right-backward')
      return response
    } catch (err) {
      console.log(err)
      return err.message
    }
  }
}

export const moveTo = async target => {
  const xToMove = target.x ? parseFloat(target.x) - position.x : position.x
  const yToMove = target.y ? parseFloat(target.y) - position.y : position.y

  console.log('xToMove', xToMove)
  console.log('yToMove', yToMove)

  if (xToMove !== 0 && yToMove !== 0) {
    if (xToMove < 0 && yToMove > 0) {
      await moveLeftForward(xToMove, yToMove)
    } else if (xToMove > 0 && yToMove > 0) {
      await moveRightForward(xToMove, yToMove)
    } else if (xToMove < 0 && yToMove < 0) {
      await moveLeftBackward(xToMove, yToMove)
    } else {
      await moveRightBackward(xToMove, yToMove)
    }
  } else if (xToMove !== 0 && yToMove === 0) {
    if (xToMove < 0) {
      await moveLeft(xToMove)
    } else {
      await moveRight(xToMove)
    }
  } else if (xToMove === 0 && yToMove !== 0) {
    if (yToMove > 0) {
      await moveForward(yToMove)
    } else {
      await moveBackward(yToMove)
    }
  } else {
    // Don't move
    console.log("Don't move")
    return
  }
}
