import * as React from "react"
import { observer } from "mobx-react"

import { GameContext } from "state"
import styled from "styled-components"

export default observer(function Field(props: { children: React.ReactNode }) {
  const game = React.useContext(GameContext)

  return (
    <StyledField
      width={game.field.width}
      height={game.field.height}
      blur={game.state === "menu"}
      greyScale={game.state === "over"}
    >
      {game.field.apple != null && (
        <Apple
          style={{ bottom: (game.field.apple.y - 1) * 8, left: (game.field.apple.x - 1) * 8 }}
        />
      )}
      {props.children}
    </StyledField>
  )
})

type StyledFieldProps = {
  width: number
  height: number
  blur: boolean
  greyScale: boolean
}

const StyledField = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  background: teal;
  transform: translate(-50%, -50%);
  width: ${(props: StyledFieldProps) => props.width * 8}px;
  height: ${(props: StyledFieldProps) => props.height * 8}px;
  filter: ${(props: StyledFieldProps) =>
    (props.blur && "blur(8px)") || (props.greyScale && "grayscale(100%)") || "none"};
`

const Apple = styled.div`
  position: absolute;
  width: 8px;
  height: 8px;
  background-color: red;
`
