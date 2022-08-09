import { ShipBuilder } from './ship';

test('creates a ship with the right anchor property', () => {
  const ship = ShipBuilder('c2', 4);

  expect(ship.getAnchor()).toBe('c2');
});

test('updates a ship when a hit is registered', () => {
  const ship = ShipBuilder('c2', 2);

  ship.hit(1);
  expect(ship.getHits()).toStrictEqual([false, true]);
});

test('correctly reports a ship is sunk', () => {
  const ship = ShipBuilder('c2', 1);

  ship.hit(0);
  expect(ship.isSunk()).toBeTruthy();
});

test('correctly reports a ship still in play after a non-fatal hit', () => {
  const ship = ShipBuilder('c2', 2);
  ship.hit(0);

  expect(ship.isSunk()).toBeFalsy();
})

test('handles out of bounds above limit gracefully', () => {
  const ship = ShipBuilder('c2', 1);
  expect(() => {
    ship.hit(6);
  }).toThrow('Not in bounds');
})

test('handles out of bounds below limit gracefully', () => {
  const ship = ShipBuilder('c2', 1);
  expect(() => {
    ship.hit(-1);
  }).toThrow('Not in bounds');
})