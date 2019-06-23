import { observable } from "mobx"

import Field from "./field"
import { Particle } from "./_types"

export default class Snake {
  private _field: Field

  @observable public particles: Array<Particle>

  constructor(field: Field) {
    this._field = field

    const centerField = {
      x: Math.floor(this._field.width / 2),
      y: Math.floor(this._field.height / 2)
    }

    this.particles = [
      { ...centerField, color: "red" }, // head
      { x: centerField.x - 1, y: centerField.y, color: "black" } // tail
    ]
  }
}
