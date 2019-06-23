import { observable } from "mobx"

import { GameState } from "state"
import { Particle } from "./_types"

export default class Field {
  public width: number
  public height: number
  private _game: GameState

  @observable apples: Array<Particle> = []

  constructor(width: number, height: number, game: GameState) {
    this.width = width
    this.height = height
    this._game = game
  }
}
