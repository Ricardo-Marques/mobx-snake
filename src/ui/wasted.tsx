import * as React from "react"
import { observer } from "mobx-react"
import styled from "styled-components"

import { GameContext } from "state"

// @ts-ignore don't feel like adding a .d.ts file for this
import * as wastedPng from "./wasted.png"

export default observer(function Menu() {
  const game = React.useContext(GameContext)

  if (game.state !== "over") {
    return null
  }

  return <Wasted src={wastedPng} />
})

const Wasted = styled.img`
  z-index: 3;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 300px;
  height: 300px;
  transform: translate(-50%, -50%);
`
