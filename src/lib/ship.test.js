import { ShipBuilder } from './ship';


describe('when creating a ship', () => {
  describe('when creating a horizontally oriented ship', () => {
    test('a ship is created correctly', () => {
      const ship = ShipBuilder('c2', 3);
      expect(ship.getAnchor()).toBe('c2');
      expect(ship.getLength()).toBe(3);
    });
  });

  describe('when creating a vertically oriented ship', () => {
    test('a ship is created correctly', () => {
      const ship = ShipBuilder('c2', 5, false);
      expect(ship.getAnchor()).toBe('c2');
      expect(ship.getLength()).toBe(5);
    })
  })
})

describe('after a ship is created', () => {
  const ship = ShipBuilder('c2', 2);
  
  test('updates a ship when a hit is registered', () => {
    ship.receiveHit('c2');
    expect(ship.showHits()).toStrictEqual([true, false]);
  });

  test('correctly reports a ship still in play after a non-fatal hit', () => {
    expect(ship.isSunk()).toStrictEqual(false);
  });

  test('correctly reports a ship is sunk', () => {
    ship.receiveHit('d2');
    expect(ship.showHits()).toStrictEqual([true, true]);
    expect(ship.isSunk()).toStrictEqual(true);
  });
});