import { ShipBuilder } from './ship';


describe('when creating a ship', () => {
  test('correctly throws an error when provided a negative length', () => {
    expect(() => {
      ShipBuilder('c1', -1)
    }).toThrow('must be at least 1 cell long');
  });

  describe('when creating a horizontally oriented ship', () => {
    test('a ship of length 1 is created correctly', () => {
      const ship = ShipBuilder('c2');
      expect(ship.getAnchor()).toBe('c2');
      expect(ship.getLength()).toBe(1);
      expect(ship.getCells()).toEqual(['c2']);
      expect(ship.isHorizontal()).toEqual(true);
      expect(ship.getHits().every((slot) => { return slot === false })).toBeTruthy();
    });

    test('a ship of length 3 is created correctly', () => {
      const ship = ShipBuilder('c2', 3);
      expect(ship.getAnchor()).toBe('c2');
      expect(ship.getLength()).toBe(3);
      expect(ship.getCells()).toEqual(['c2', 'd2', 'e2']);
      expect(ship.isHorizontal()).toEqual(true);
      expect(ship.getHits().every((slot) => { return slot === false })).toBeTruthy();
    });
  });

  describe('when creating a vertically oriented ship', () => {
    test('s ship of length 1 is created correctly', () => {
      const ship = ShipBuilder('c2', 1, false);
      expect(ship.getAnchor()).toBe('c2');
      expect(ship.getLength()).toBe(1);
      expect(ship.getCells()).toEqual(['c2']);
      expect(ship.isHorizontal()).toEqual(false);
      expect(ship.getHits().every((slot) => { return slot === false })).toBeTruthy();
    })
    test('a ship of length 5 is created correctly', () => {
      const ship = ShipBuilder('c2', 5, false);
      expect(ship.getAnchor()).toBe('c2');
      expect(ship.getLength()).toBe(5);
      expect(ship.getCells()).toEqual(['c2', 'c3', 'c4', 'c5', 'c6']);
      expect(ship.isHorizontal()).toBe(false);
      expect(ship.getHits().every((slot) => { return slot === false })).toBeTruthy();
    })
  })
})

describe('after a ship is created', () => {
  const ship = ShipBuilder('c2', 2);
  
  test('updates a ship when a hit is registered', () => {
    ship.receiveHit('c2');
    expect(ship.getHits()).toStrictEqual([true, false]);
  });

  test('correctly reports a ship still in play after a non-fatal hit', () => {
    expect(ship.isSunk()).toStrictEqual(false);
  });

  test('correctly reports a ship is sunk', () => {
    ship.receiveHit('d2');
    expect(ship.getHits()).toStrictEqual([true, true]);
    expect(ship.isSunk()).toStrictEqual(true);
  });
});