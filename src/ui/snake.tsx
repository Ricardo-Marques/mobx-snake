import * as React from "react"
import { observer } from "mobx-react"
import styled from "styled-components"

import { GameContext } from "state"
import { Particle } from "state/_types"

export default observer(function Snake() {
  const { snake } = React.useContext(GameContext)

  React.useEffect(() => {
    document.addEventListener("keydown", e => {
      switch (e.code) {
        case "ArrowUp":
          snake.switchDirection("u")
          break
        case "ArrowRight":
          snake.switchDirection("r")
          break
        case "ArrowDown":
          snake.switchDirection("d")
          break
        case "ArrowLeft":
          snake.switchDirection("l")
          break
      }
    })
  }, [false])

  const [head, ...tail] = snake.particles
  return (
    <>
      <StyledSnakeHead style={{ bottom: (head.y - 1) * 8, left: (head.x - 1) * 8 }} />
      <SnakeTail tail={tail} />
    </>
  )
})

const StyledSnakeHead = styled.div`
  position: absolute;
  width: 8px;
  height: 8px;
  background-color: pink;
`

type SnakeTailProps = {
  tail: Array<Particle>
}

function SnakeTail(props: SnakeTailProps) {
  return (
    <>
      {props.tail.map(tailParticle => (
        <StyledSnakeTailParticle
          key={`${tailParticle.x}-${tailParticle.y}`}
          style={{ bottom: (tailParticle.y - 1) * 8, left: (tailParticle.x - 1) * 8 }}
        />
      ))}
    </>
  )
}

const StyledSnakeTailParticle = styled.div`
  position: absolute;
  width: 8px;
  height: 8px;
  background-color: black;
`
