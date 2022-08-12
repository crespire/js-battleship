import { ShipBuilder } from './ship';


describe('when creating a ship', () => {
  describe('when creating a horizontally oriented ship', () => {
    test('a ship is created correctly', () => {
      const ship = ShipBuilder('c2', 3);
      expect(ship.getAnchor()).toBe('c2');
      expect(ship.getLength()).toBe(3);
      expect(ship.getCells()).toEqual(['c2', 'd2', 'e2']);
      expect(ship.getHits().every((slot) => { return slot === false })).toBeTruthy();
    });
  });

  describe('when creating a vertically oriented ship', () => {
    test('a ship is created correctly', () => {
      const ship = ShipBuilder('c2', 5, false);
      expect(ship.getAnchor()).toBe('c2');
      expect(ship.getLength()).toBe(5);
      expect(ship.getCells()).toEqual(['c2', 'c3', 'c4', 'c5', 'c6']);
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