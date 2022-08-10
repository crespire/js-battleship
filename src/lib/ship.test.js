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
    ship.setHit(1);
    expect(ship.getAllCells()).toStrictEqual([false, true]);
  });

  test('correctly returns true when asked about cell index 1', () => {
    expect(ship.getCell(1)).toStrictEqual(true);
  });

  test('correctly reports a ship still in play after a non-fatal hit', () => {
    expect(ship.isSunk()).toStrictEqual(false);
  });

  test('correctly reports a ship is sunk', () => {
    ship.setHit(0);
    expect(ship.getCell(0)).toStrictEqual(true);
    expect(ship.isSunk()).toStrictEqual(true);
  });
})

describe('when dealing with out of bounds values for #setHit', () => {
  const ship = ShipBuilder('c2', 1);

  test('handles out of bounds above limit gracefully', () => {
    expect(() => {
      ship.setHit(6);
    }).toThrow('Not in bounds');
  });

  test('handles out of bounds below limit gracefully', () => {
    expect(() => {
      ship.setHit(-1);
    }).toThrow('Not in bounds');
  });
})