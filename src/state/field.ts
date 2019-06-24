import { observable, reaction, action } from "mobx"

import { GameState } from "state"
import { Particle } from "./_types"

export default class Field {
  public width: number
  public height: number
  private _game: GameState
  private _appleSpawnTime: number = 5 // seconds
  private _appleSpawnTimeout: number

  @observable apple: Particle = null

  constructor(width: number, height: number, game: GameState) {
    this.width = width
    this.height = height
    this._game = game

    reaction(
      () => [this._game.state, this.apple],
      ([gameState, apple]) => {
        if (gameState === "ongoing" && apple == null) {
          this._startAppleSpawn()
        } else {
          this._stopAppleSpawn()
        }
      }
    )
  }

  private _startAppleSpawn() {
    this._appleSpawnTimeout = setTimeout(() => this._spawnApple(), this._appleSpawnTime * 1000)
  }

  private _stopAppleSpawn() {
    clearTimeout(this._appleSpawnTimeout)
  }

  @action private _spawnApple() {
    const x = getRandomNumber(1, this.width)
    const y = getRandomNumber(1, this.height)

    // if there's a snake particle here try again
    if (
      this._game.snake.particles.find(
        snakeParticle => snakeParticle.x === x && snakeParticle.y === y
      )
    ) {
      this._spawnApple()
      return
    }

    this.apple = { x, y }
  }
}

function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (+max - +min)) + +min
}
