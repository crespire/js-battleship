import { BoardBuilder } from './gameboard.js';
import { ShipBuilder } from './ship.js';
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

      test('it correctly returns false with out of bound offsets', () => {
        expect(board.setCell('j10', 'q', 1, 0)).toBeFalsy();
        expect(board.setCell('a1', 'q', 1, 99)).toBeFalsy();
      });
    });
  });

  describe('when sending #placeShip', () => {
    afterEach(() => {
      board.clearBoard();
    });    

    test('it correctly places a ship with horizontal length 2', () => {
      let ship = ShipBuilder('a1', 2, true);
      board.placeShip(ship);
      expect(board.getCell('a1')).toBeInstanceOf(Function);
    });

    test('it correctly places a ship with vertical length 2', () => {
      let ship = ShipBuilder('a1', 2, false);
      board.placeShip(ship);
      expect(board.getCell('a2')).toBeInstanceOf(Function);
    });

    test('it correctly throws an error when a ship is out of bounds', () => {
      let ship = ShipBuilder('j10', 2, true);
      expect(board.placeShip(ship)).toBeFalsy();
      expect(board.getCell('j10')).toBe(0);
    });

    test('it correctly throws error when there is an overlap', () => {
      let ship_1 = ShipBuilder('a1', 3, true);
      let ship_2 = ShipBuilder('c1', 2, true);
      board.placeShip(ship_1);
      expect(board.placeShip(ship_2)).toBeFalsy();
      expect(board.getCell('c2')).toBe(0);
    })
  });

  describe('when sending #receiveAttack', () => {
    const board = BoardBuilder(mockPlayer);

    test('it correctly updates the board representation on hit', () => {
      let ship_1 = ShipBuilder('f3', 4, true);
      board.placeShip(ship_1);
      board.receiveAttack('i3');
      expect(board.getCell('i3')).toBe('x');
      expect(board.getHits()).toBe(1);
    });

    test('it correctly updates the board representation on a miss', () => {
      board.receiveAttack('a1');
      expect(board.getCell('a1')).toBe(1);
      expect(board.getMisses()).toBe(1)
    });
  });

  describe('when sending #allSunk', () => {
    const board = BoardBuilder(mockPlayer);

    afterEach(() => {
      board.clearBoard();
    })

    test('when provided only 1 ship that is sunk', () => {
      let ship_1 = ShipBuilder('c3', 4, true);
      board.placeShip(ship_1);
      board.receiveAttack('c3');
      board.receiveAttack('d3');
      board.receiveAttack('e3');
      board.receiveAttack('f3');
      expect(ship_1.isSunk()).toBe(true);
      expect(board.allSunk()).toBe(true);
      expect(board.getHits()).toBe(4);
    });

    test('when provided a board with two ships', () => {
      let ship_1 = ShipBuilder('a1', 2, true);
      let ship_2 = ShipBuilder('a3', 2, false);
      board.placeShip(ship_1);
      board.placeShip(ship_2);
      board.receiveAttack('a3');
      expect(board.allSunk()).toBe(false);
      board.receiveAttack('a4');
      expect(ship_2.isSunk()).toBe(true);
      expect(board.allSunk()).toBe(false);
      expect(board.getHits()).toBe(2);
      board.receiveAttack('j10');
      expect(board.allSunk()).toBe(false);
      board.receiveAttack('a1');
      board.receiveAttack('b1');
      expect(board.allSunk()).toBe(true);
      expect(board.getHits()).toBe(4);
      expect(board.getMisses()).toBe(1);
    })
  });
});