import * as React from "react"

import Menu from "./menu"
import Field from "./field"
import Snake from "./snake"
import Wasted from "./wasted"

export default function GameUI() {
  return (
    <>
      <Menu />
      <Field>
        <Snake />
      </Field>
      <Wasted />
    </>
  )
}
