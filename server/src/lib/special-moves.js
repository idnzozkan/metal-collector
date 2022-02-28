import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const config = fs.readFileSync(path.resolve(__dirname, '../config.json'))
const { xMax, xMin, yMax, yMin } = JSON.parse(config)
const dummyMetalsData = fs.readFileSync(path.resolve(__dirname, '../fake-data/dummy-metals.json'))
const dummyMetals = JSON.parse(dummyMetalsData)

export const moveTo = async (robot, target) => {
  let { x, y } = target
  x = parseFloat(x) - robot.getPosition().x
  y = parseFloat(y) - robot.getPosition().y

  if (x && !y) {
    if (x < 0) return await robot.moveLeft(Math.abs(x))

    await robot.moveRight(x)
  }

  if (!x && y) {
    if (y < 0) return await robot.moveBackward(Math.abs(y))

    await robot.moveForward(y)
  }

  if (x && y) {
    if (x < 0 && y > 0) await robot.moveLeftForward(Math.abs(x), y)

    if (x < 0 && y < 0) await robot.moveLeftBackward(Math.abs(x), Math.abs(y))

    if (x > 0 && y > 0) await robot.moveRightForward(x, y)

    if (x > 0 && y < 0) await robot.moveRightBackward(x, Math.abs(y))
  }

  if (!x && !y) {
    return console.log("Don't move")
  }
}

export const scan = async robot => {
  const detectedMetals = []

  for (let x = parseFloat(xMin); x <= parseFloat(xMax); x += 50) {
    for (let y = parseFloat(yMax); y >= parseFloat(yMin); y -= 1) {
      const foundMetal = dummyMetals.find(item => item.position.x == x && item.position.y == y)

      if (foundMetal) detectedMetals.push(foundMetal)

      await robot.moveTo({ x, y })
    }
  }

  return detectedMetals
}
