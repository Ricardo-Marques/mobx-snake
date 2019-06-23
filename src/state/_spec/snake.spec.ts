import { GameState } from "state"

describe("Snake", () => {
  const Game = new GameState()
  const Snake = Game.snake
  const Field = Game.field

  const center = {
    x: Math.floor(Field.width / 2),
    y: Math.floor(Field.height / 2)
  }

  describe("when created", () => {
    it("has 2 particles at the center of the field", () => {
      expect(Snake.particles).toEqual([
        { ...center, color: "red" }, // the head at the middle of the field
        { x: center.x - 1, y: center.y, color: "black" } // the tail just to the left of the head
      ])
    })

    it("is stopped", () => {
      expect(Snake.moving).toBe(false)
    })

    it("will go right once it begins moving", () => {
      expect(Snake.direction).toBe("r")
    })
  })

  describe("when told to move", () => {
    beforeAll(() => {
      Snake.move()
    })

    it("moves the head in the right direction", () => {
      expect(Snake.particles[0]).toEqual({
        color: "red",
        x: center.x + 1,
        y: center.y
      })
    })

    it("moves the tail in the right direction", () => {
      expect(Snake.particles[1]).toEqual({
        color: "black",
        x: center.x,
        y: center.y
      })
    })

    it("dies if it hits itself", () => {
      // @ts-ignore no colors needed for this test
      Snake.particles = [{ x: 1, y: 2 }, { x: 2, y: 2 }, { x: 2, y: 1 }, { x: 1, y: 1 }]

      Snake.direction = "d"
      Snake.move()

      expect(Game.state).toBe("over")
    })
  })

  describe("when it eats an apple", () => {
    it("grows", () => {
      Field.apples = [{ x: 1, y: 1, color: "green" }]
      Snake.particles = [{ x: 2, y: 1, color: "red" }]
      Snake.direction = "l"
      Snake.move()

      expect(Snake.particles.length).toBe(2)
    })
  })
})
