import * as React from "react"

import { Environment } from "./environment"
import { Snake } from "./snake"

export interface IGameState {
  environment: Environment
  snake: Snake
}

export class GameState implements IGameState {
  environment = new Environment()
  snake = new Snake(this)
}

const State = new GameState()

export default State
export const StateContext = React.createContext(State)
