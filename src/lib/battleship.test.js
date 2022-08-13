import { Battleship } from './battleship.js';

describe('When creating a game', () => {
  const game = Battleship();

  test('it has the right properties', () => {
    expect(game).toHaveProperty('play');
  });

  test('correctly sets up the boards when sent #play', () => {
    game.play();
  })
})