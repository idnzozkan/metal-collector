import {
  moveBackward,
  moveForward,
  moveLeft,
  moveLeftBackward,
  moveLeftForward,
  moveRight,
  moveRightBackward,
  moveRightForward
} from './basic-moves.js'
import { moveTo, scan } from './special-moves.js'

class Robot {
  constructor() {
    this.position = { x: 0, y: 0 }
  }

  getPosition() {
    return this.position
  }

  setPosition({ x, y }) {
    if (x !== undefined) this.position.x = x
    if (y !== undefined) this.position.y = y
  }

  moveLeft(amount) {
    return Robot.moveLeft(this, amount)
  }

  moveRight(amount) {
    return Robot.moveRight(this, amount)
  }

  moveForward(amount) {
    return Robot.moveForward(this, amount)
  }

  moveBackward(amount) {
    return Robot.moveBackward(this, amount)
  }

  moveLeftForward(amountOfLeft, amountOfRight) {
    return Robot.moveLeftForward(this, amountOfLeft, amountOfRight)
  }

  moveRightForward(amountOfRight, amountOfForward) {
    return Robot.moveRightForward(this, amountOfRight, amountOfForward)
  }

  moveLeftBackward(amountOfLeft, amountOfBackward) {
    return Robot.moveLeftBackward(this, amountOfLeft, amountOfBackward)
  }

  moveRightBackward(amountOfRight, amountOfBackward) {
    return Robot.moveRightBackward(this, amountOfRight, amountOfBackward)
  }

  moveTo(target) {
    return Robot.moveTo(this, target)
  }

  scan() {
    return Robot.scan(this)
  }
}

Robot.moveLeft = moveLeft
Robot.moveRight = moveRight
Robot.moveForward = moveForward
Robot.moveBackward = moveBackward
Robot.moveLeftForward = moveLeftForward
Robot.moveRightForward = moveRightForward
Robot.moveLeftBackward = moveLeftBackward
Robot.moveRightBackward = moveRightBackward
Robot.moveTo = moveTo
Robot.scan = scan

export default Robot
