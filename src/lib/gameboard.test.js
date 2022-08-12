import { BoardBuilder } from './gameboard';
import { ShipBuilder } from './ship';
import { jest } from '@jest/globals'

describe('when creating a gameboard', () => {
  const mockPlayer = jest.fn();

  test('it returns a board with the appropriate methods', () => {
    let board = BoardBuilder(mockPlayer);
    expect(board).toHaveProperty('getCell');
    expect(board).toHaveProperty('setCell');
    expect(board).toHaveProperty('receiveAttack');
  });
});

describe('after creating a board', () => {
  const mockPlayer = jest.fn();
  const board = BoardBuilder(mockPlayer);

  describe('when sending #setCell', () => {
    test('it correctly sets a1 to the given value', () => {
      board.setCell('a1', 'x');
      expect(board.getCell('a1')).toBe('x');
      expect(board.getCell('a2')).toBe(0);
      expect(board.getCell('b1')).toBe(0);
    });

    test('it correctly sets h5 to the given value', () => {
      board.setCell('h5', 'y');
      expect(board.getCell('h5')).toBe('y');
    });

    describe('when #setCell is provided with offset values', () => {
      test('it correctly sets b1 with offset from a1 given', () => {
        board.setCell('a1', 'z', 1);
        expect(board.getCell('b1')).toBe('z');
      });

      test('it correctly sets a2 with offset from a1 given', () => {
        board.setCell('a1', 'v', 0, 1);
        expect(board.getCell('a2')).toBe('v');
      });

      test('it correctly sets b2 with offset from a1 given', () => {
        board.setCell('a1', 'g', 1, 1);
        expect(board.getCell('b2')).toBe('g');
      });

      test('it correctly throws error with out of bound offsets', () => {
        expect(() => {
          board.setCell('j10', 'q', 1, 0);
        }).toThrow('Offset out of bounds');

        expect(() => {
          board.setCell('a1', 'q', 1, 99);
        }).toThrow('Offset out of bounds');
      });
    });
  });

  describe('when sending #placeShip', () => {
    const board = BoardBuilder(mockPlayer);
    afterEach(() => {
      board.clearBoard();
    });    

    test('it correctly places a ship with horizontal length 2', () => {
      let ship = ShipBuilder('a1', 2, true);
      board.placeShip('a1', ship);
      board._logState();
      expect(board.getCell('a1')).toBeInstanceOf(Function);
    });

    test('it correctly places a ship with vertical length 2', () => {
      let ship = ShipBuilder('a1', 2, false);
      board.placeShip('a1', ship);
      board._logState();
      expect(board.getCell('a2')).toBeInstanceOf(Function);
    });

    test('it correctly throws an error when a ship is out of bounds', () => {
      let ship = ShipBuilder('j10', 2, true);
      expect(() => {
        board.placeShip('j10', ship);
      }).toThrow('not in bounds');
      board._logState();
    })
  });
});