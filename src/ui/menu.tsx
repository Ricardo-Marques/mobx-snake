import * as React from "react"
import { observer } from "mobx-react"

import { GameContext } from "state"
import styled from "styled-components"

export default observer(function Menu() {
  const game = React.useContext(GameContext)

  if (game.state !== "menu") {
    return
  }

  return (
    <StyledMenu>
      <button onClick={() => (game.state = "ongoing")}>Start game!</button>
    </StyledMenu>
  )
})

const StyledMenu = styled.div`
  z-index: 2;
  position: absolute;
  top: 50%;
  left: 50%;
  padding: 20px;
  background: teal;
  transform: translate(-50%, -50%);
`
