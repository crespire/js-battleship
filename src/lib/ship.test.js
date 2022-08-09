import { ShipBuilder } from './ship';


describe('when creating a ship', () => {
  test('creates a ship with the right anchor property', () => {
    const ship = ShipBuilder('c2', 4);
  
    expect(ship.getAnchor()).toBe('c2');
  });
})

describe('when a ship is created', () => {
  const ship = ShipBuilder('c2', 2);
  
  test('updates a ship when a hit is registered', () => {
    ship.hit(1);
    expect(ship.getHits()).toStrictEqual([false, true]);
  });

  test('correctly reports a ship still in play after a non-fatal hit', () => {
    expect(ship.isSunk()).toBeFalsy();
  })

  test('correctly reports a ship is sunk', () => {
    ship.hit(0);
    expect(ship.isSunk()).toBeTruthy();
  });
})

describe('when dealing with out of bounds values for #hit', () => {
  const ship = ShipBuilder('c2', 1);

  test('handles out of bounds above limit gracefully', () => {
    expect(() => {
      ship.hit(6);
    }).toThrow('Not in bounds');
  });

  test('handles out of bounds below limit gracefully', () => {
    expect(() => {
      ship.hit(-1);
    }).toThrow('Not in bounds');
  });
})