import { observable, action } from "mobx"

import { GameState } from "state"
import { Particle } from "./_types"

export default class Snake {
  private _game: GameState

  @observable particles: Array<Particle>
  moving: boolean = false
  direction: "u" | "r" | "d" | "l" = "r" // go right at first

  constructor(game: GameState) {
    this._game = game

    const { field } = this._game
    const centerField = {
      x: Math.floor(field.width / 2),
      y: Math.floor(field.height / 2)
    }

    this.particles = [
      { ...centerField, color: "red" }, // head
      { x: centerField.x - 1, y: centerField.y, color: "black" } // tail
    ]
  }

  @action move() {
    const head = this.particles[0]
    const headCopy = { ...head } // store a copy to move the tail to the old head position

    switch (this.direction) {
      case "u":
        head.y++
        break
      case "r":
        head.x++
        break
      case "d":
        head.y--
        break
      case "l":
        head.x--
        break
    }

    // check if snake hit itself
    this._checkSelfCollision()

    if (this._collidedWithApple(head)) {
      this.particles.splice(1, 0, { ...headCopy, color: "black" })
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
    if (this._game.field.apples.find(apple => apple.x === head.x && apple.y === head.y)) {
      return true
    }

    return false
  }
}

/**
 * Move an item in an array to a new 0-based index
 */
function moveArrayItem<T>(array: Array<T>, item: T, newIndex: number) {
  array.splice(array.indexOf(item), 1)
  array.splice(newIndex, 0, item)
}
