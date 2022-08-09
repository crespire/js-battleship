import { ShipBuilder } from './ship';

test('creates a ship with the right anchor property', () => {
  const ship = ShipBuilder('c2', 4);

  expect(ship.getAnchor()).toBe('c2');
});