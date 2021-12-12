import gerbilCnc from 'gerbil-cnc'
import fs from 'fs'

const config = fs.readFileSync('./config.json')
const { port, stepSize, feedRate } = JSON.parse(config)

const gerbil = gerbilCnc(port)

export const position = { x: 0, y: 0 }

export const moveLeft = async () => {
  const machineReady = await gerbil.machineReady

  if (machineReady) {
    try {
      const response = await gerbil.writeLine(`$J=G21G91X-${stepSize}Y-${stepSize}F${feedRate}`)

      position.x -= parseInt(stepSize)

      console.log('Response: ', response + 'Machine moved left')
      return response
    } catch (err) {
      console.log(err)
      return err.message
    }
  }
}

export const moveRight = async () => {
  const machineReady = await gerbil.machineReady

  if (machineReady) {
    try {
      const response = await gerbil.writeLine(`$J=G21G91X${stepSize}Y${stepSize}F${feedRate}`)

      position.x += parseInt(stepSize)

      console.log('Response: ', response + 'Machine moved right')
      return response
    } catch (err) {
      console.log(err)
      return err.message
    }
  }
}

export const moveForward = async () => {
  const machineReady = await gerbil.machineReady

  if (machineReady) {
    try {
      const response = await gerbil.writeLine(`$J=G21G91X-${stepSize}Y${stepSize}F${feedRate}`)

      position.y += parseInt(stepSize)

      console.log('Response: ', response + 'Machine moved forward')
      return response
    } catch (err) {
      console.log(err)
      return err.message
    }
  }
}

export const moveBackward = async () => {
  const machineReady = await gerbil.machineReady

  if (machineReady) {
    try {
      const response = await gerbil.writeLine(`$J=G21G91X${stepSize}Y-${stepSize}F${feedRate}`)

      position.y -= parseInt(stepSize)

      console.log('Response: ', response + 'Machine moved backward')
      return response
    } catch (err) {
      console.log(err)
      return err.message
    }
  }
}

export const moveLeftForward = async () => {
  const machineReady = await gerbil.machineReady

  if (machineReady) {
    try {
      const response = await gerbil.writeLine(`$J=G21G91X-${stepSize}F${feedRate}`)

      position.x -= parseInt(stepSize)
      position.y += parseInt(stepSize)

      console.log('Response: ', response + 'Machine moved left-forward')
      return response
    } catch (err) {
      console.log(err)
      return err.message
    }
  }
}

export const moveRightForward = async () => {
  const machineReady = await gerbil.machineReady

  if (machineReady) {
    try {
      const response = await gerbil.writeLine(`$J=G21G91Y${stepSize}F${feedRate}`)

      position.x += parseInt(stepSize)
      position.y += parseInt(stepSize)

      console.log('Response: ', response + 'Machine moved right-forward')
      return response
    } catch (err) {
      console.log(err)
      return err.message
    }
  }
}

export const moveLeftBackward = async () => {
  const machineReady = await gerbil.machineReady

  if (machineReady) {
    try {
      const response = await gerbil.writeLine(`$J=G21G91Y-${stepSize}F${feedRate}`)

      position.x -= parseInt(stepSize)
      position.y -= parseInt(stepSize)

      console.log('Response: ', response + 'Machine moved left-backward')
      return response
    } catch (err) {
      console.log(err)
      return err.message
    }
  }
}

export const moveRightBackward = async () => {
  const machineReady = await gerbil.machineReady

  if (machineReady) {
    try {
      const response = await gerbil.writeLine(`$J=G21G91X${stepSize}F${feedRate}`)

      position.x += parseInt(stepSize)
      position.y -= parseInt(stepSize)

      console.log('Response: ', response + 'Machine moved right-backward')
      return response
    } catch (err) {
      console.log(err)
      return err.message
    }
  }
}
