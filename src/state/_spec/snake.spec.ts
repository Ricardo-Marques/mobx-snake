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
        { ...center }, // the head at the middle of the field
        { x: center.x - 1, y: center.y } // the tail just to the left of the head
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
        x: center.x + 1,
        y: center.y
      })
    })

    it("moves the tail in the right direction", () => {
      expect(Snake.particles[1]).toEqual({
        x: center.x,
        y: center.y
      })
    })

    it("breaks the 4th wall", () => {
      Snake.particles = [{ x: 1, y: 1 }, { x: 2, y: 1 }]
      Snake.direction = "l"

      Snake.move() // go through left wall

      expect(Snake.particles).toEqual([{ x: Field.width, y: 1 }, { x: 1, y: 1 }])
    })

    it("dies if it hits itself", () => {
      Snake.particles = [{ x: 1, y: 2 }, { x: 2, y: 2 }, { x: 2, y: 1 }, { x: 1, y: 1 }]

      Snake.direction = "d"
      Snake.move()

      expect(Game.state).toBe("over")
    })
  })

  describe("when told to switch directions", () => {
    it("immediately moves in that direction", () => {
      Snake.particles = [{ x: 1, y: 1 }, { x: 2, y: 1 }]
      Snake.direction = "l"

      Snake.switchDirection("u")
      expect(Snake.particles).toEqual([{ x: 1, y: 2 }, { x: 1, y: 1 }])
    })

    it("does not switch direction if told to go backwards", () => {
      Snake.particles = [{ x: 1, y: 1 }, { x: 2, y: 1 }]
      Snake.direction = "u"

      Snake.switchDirection("d")
      expect(Snake.direction).toBe("u")
    })
  })

  describe("when it eats an apple", () => {
    beforeEach(() => {
      Field.apple = { x: 1, y: 1 }
      Snake.particles = [{ x: 2, y: 1 }]
      Snake.direction = "l"
      Snake.move()
    })

    it("grows", () => {
      expect(Snake.particles.length).toBe(2)
    })

    it("eats the apple", () => {
      expect(Field.apple).toBe(null)
    })
  })
})
