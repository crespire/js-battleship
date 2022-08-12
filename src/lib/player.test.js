import { PlayerBuilder } from './player.js';

describe('computer player', () => {
  test('computer player can generate random moves', () => {
    const computer = PlayerBuilder('HAL', true);
    let move;
    for(let i = 0; i < 10; i++) {
      move = computer.makeRandomMove();
      expect(move).toMatch(/\b([a-jA-J]){1}([1-9]|10)\b/);
    };    
  });

  test('After 100 moves, the computer should have no more moves left', () => {
    const computer = PlayerBuilder("HAL", true);

    for(let i = 0; i < 100; i ++) {
      computer.makeRandomMove();
    }

    expect(() => {
      computer.makeRandomMove();
    }).toThrow('No more moves left.');
  });
});

describe('human player', () => {
  test('cannot use random move', () => {
    const player = PlayerBuilder('Jim');
    expect(() => {
      player.makeRandomMove();
    }).toThrow('Method unavailable');
  });
});
