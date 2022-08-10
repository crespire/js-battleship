import { BoardBuilder } from './gameboard';
import { jest } from '@jest/globals'

describe('when creating a gameboard', () => {
  const mockPlayer = jest.fn();

  test('it returns the right internal data representation', () => {
    let board = BoardBuilder(mockPlayer);
    let data = board._getData();
    expect(data.length).toEqual(10);
    expect(data[9].length).toEqual(10);
    expect(data.flat().length).toEqual(100);
  });
});

describe('after creating a board', () => {
  const mockPlayer = jest.fn();
  const board = BoardBuilder(mockPlayer);

  describe('when sending #setCell', () => {
    // index of row * 10 + index of column = flat index

    test('it correctly sets a1 to the given value', () => {
      board.setCell('a1', 'x');
      let data = board._getData();
      expect(data.flat()[0]).toBe('x');
      expect(data.flat().filter(value => value != 0).length).toEqual(1);
      expect(data.flat().filter(value => value == 0).length).toEqual(99);
    });

    test('it correctly sets h5 to the given value', () => {
      board.setCell('h5', 'y');
      let data = board._getData();
      expect(data.flat()[47]).toBe('y');
      expect(data.flat().filter(value => value != 0).length).toEqual(2);
      expect(data.flat().filter(value => value == 0).length).toEqual(98);
    });

    test('it correctly sets c9 to the given value', () => {
      board.setCell('c9', 'z');
      let data = board._getData();
      console.log(data.flat());
      expect(data.flat()[82]).toBe('z');
      expect(data.flat().filter(value => value != 0).length).toEqual(3);
      expect(data.flat().filter(value => value == 0).length).toEqual(97);
    })
  });
})