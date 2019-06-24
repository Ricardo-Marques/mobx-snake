import { GameState } from "state"

describe("Field", () => {
  beforeAll(() => {
    jest.useFakeTimers()
  })

  const Game = new GameState()
  const Field = Game.field

  it("spawns random apple after a delay if the game is ongoing", () => {
    Game.state = "ongoing"
    jest.advanceTimersByTime(5000)
    expect(Field.apple).not.toBe(null)
  })

  it("does not respawn an apple if there is one already on the field", () => {
    const apple = { ...Field.apple }
    jest.advanceTimersByTime(5000)
    expect(Field.apple).toEqual(apple)
  })
})
