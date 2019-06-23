import * as React from "react"

import Field from "./field"
import Snake from "./snake"

export interface IGameState {
  field: Field
  snake: Snake
}

export class GameState implements IGameState {
  field = new Field(200, 200)
  snake = new Snake(this.field)
}

const State = new GameState()

export default State
export const StateContext = React.createContext(State)
