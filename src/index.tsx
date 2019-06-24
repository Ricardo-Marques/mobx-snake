import * as React from "react"
import * as ReactDOM from "react-dom"

import GameUI from "ui"
import GameState, { GameContext } from "state"

const renderApp = (root: Element, _GameUI: typeof GameUI, _GameContext: typeof GameContext) => {
  ReactDOM.render(
    <_GameContext.Provider value={GameState}>
      <_GameUI />
    </_GameContext.Provider>,
    root
  )
}

const root = document.getElementById("root")
renderApp(root, GameUI, GameContext)

if (module.hot) {
  module.hot.accept("./ui", function() {
    const GameUI = require("./ui")
    renderApp(root, GameUI, GameContext)
  })

  module.hot.accept("./state", function() {
    const GameContext = require("./state")
    renderApp(root, GameUI, GameContext)
  })
}
