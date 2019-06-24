import { observable, action, reaction } from "mobx"

import { GameState } from "state"
import { Particle } from "./_types"

type Direction = "u" | "r" | "d" | "l"

export default class Snake {
  private _game: GameState
  private _snakeMoveDelay: number = 0.05 // move every .05 seconds
  private _moveInterval: number

  @observable particles: Array<Particle>
  moving: boolean = false
  direction: Direction = "r" // go right at first

  constructor(game: GameState) {
    this._game = game

    const { field } = this._game
    const centerField = {
      x: Math.floor(field.width / 2),
      y: Math.floor(field.height / 2)
    }

    this.particles = [
      { ...centerField }, // head
      { x: centerField.x - 1, y: centerField.y } // tail
    ]

    reaction(
      () => this._game.state,
      gameState => {
        if (gameState === "ongoing") {
          this._startMoveInterval()
        } else {
          this._stopMoveInterval()
        }
      }
    )
  }

  @action switchDirection(newDirection: Direction) {
    if (this.direction === newDirection) {
      return
    }

    if (this.direction === "u" && newDirection === "d") {
      return
    }

    if (this.direction === "d" && newDirection === "u") {
      return
    }

    if (this.direction === "l" && newDirection === "r") {
      return
    }

    if (this.direction === "r" && newDirection === "l") {
      return
    }

    this.direction = newDirection
    this.move()
  }

  @action move() {
    const head = this.particles[0]
    const headCopy = { ...head } // store a copy to move the tail to the old head position

    switch (this.direction) {
      case "u":
        head.y === this._game.field.height ? (head.y = 1) : head.y++
        break
      case "r":
        head.x === this._game.field.width ? (head.x = 1) : head.x++
        break
      case "d":
        head.y === 1 ? (head.y = this._game.field.height) : head.y--
        break
      case "l":
        head.x === 1 ? (head.x = this._game.field.width) : head.x--
        break
    }

    // check if snake hit itself
    this._checkSelfCollision()

    if (this._collidedWithApple(head)) {
      this._game.field.apple = null
      this.particles.splice(1, 0, { ...headCopy })
    } else {
      const tail = this.particles[this.particles.length - 1]
      tail.x = headCopy.x
      tail.y = headCopy.y
      moveArrayItem(this.particles, tail, 1) // move the old tail to the 2nd position of the array
    }
  }

  private _checkSelfCollision() {
    const [head, ...tail] = this.particles
    if (tail.find(particle => head.x === particle.x && head.y === particle.y)) {
      this._game.gameOver()
    }
  }

  private _collidedWithApple(head: Particle) {
    const apple = this._game.field.apple

    if (apple == null) {
      return false
    } else {
      return apple.x === head.x && apple.y === head.y
    }
  }

  private _startMoveInterval() {
    this._moveInterval = setInterval(() => this.move(), this._snakeMoveDelay * 1000)
  }

  private _stopMoveInterval() {
    clearInterval(this._moveInterval)
  }
}

/**
 * Move an item in an array to a new 0-based index
 */
function moveArrayItem<T>(array: Array<T>, item: T, newIndex: number) {
  array.splice(array.indexOf(item), 1)
  array.splice(newIndex, 0, item)
}
