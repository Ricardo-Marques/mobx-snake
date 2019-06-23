import _Field from "../field"
import _Snake from "../snake"

describe("Snake", () => {
  const Field = new _Field(200, 200)
  const Snake = new _Snake(Field)

  describe("when created", () => {
    it("has 2 particles at the center of the field", () => {
      const center = {
        x: Math.floor(Field.width / 2),
        y: Math.floor(Field.height / 2)
      }

      expect(Snake.particles).toEqual([
        { ...center, color: "red" }, // the head at the middle of the field
        { x: center.x - 1, y: center.y, color: "black" } // the tail just to the left of the head
      ])
    })

    it("is stopped", () => {})

    it("will go right once it begins moving", () => {})
  })

  describe("when told to move", () => {
    it("moves the head", () => {})

    it("moves the tail", () => {})

    it("dies if it hits itself", () => {})
  })

  describe("when it eats an apple", () => {
    it("grows", () => {})
  })
})
