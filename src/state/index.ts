import * as React from "react"
import { observable, action } from "mobx"

import Field from "./field"
import Snake from "./snake"

export class GameState {
  @observable state: "menu" | "ongoing" | "paused" | "over" = "menu"
  field: Field
  snake: Snake

  constructor() {
    this.field = new Field(50, 50, this)
    this.snake = new Snake(this)
  }

  @action gameOver() {
    this.state = "over"
  }
}

const _GameState = new GameState()

export default _GameState
export const GameContext = React.createContext(_GameState)
