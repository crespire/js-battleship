/**
 * Represents a ship in the game Battleship.
 * @param {string} origin - The origin point of a ship.
 * @param {*} length - How many cells long a ship is.
 * @param {*} orientation - Orientation away from the origin
 * @returns {Ship}
 */
const ShipBuilder = (origin, length, orientation = 'horizontal') => {
  let hitsRegistered = Array(length).fill(false);

  const getAnchor = () => origin;
  const getLength = () => length;

  /**
   * Calculates if the ship is sunk
   * @returns {bool}
   */
  const isSunk = () => {
    return hitsRegistered.every(slot => slot === true);
  };

  /**
   * Returns all ship spots hit status
   * @returns {array}
   */
  const getAllCells = () => {
    return hitsRegistered;
  };

  /**
   * Queries a particular spot for hit
   * @param {int} index 
   * @returns {bool}
   */
  const getCell = (index) => {
    if (index > (length - 1) || index < 0 ) {
      throw new Error('Not in bounds');
    }

    return hitsRegistered[index];
  };

  /**
   * Updates the given spot to a hit
   * @param {int} index 
   */
  const setHit = (index) => {
    if (index > (length - 1) || index < 0 ) {
      throw new Error('Not in bounds');
    }
    if (hitsRegistered[index] === false) {
      hitsRegistered[index] = true;
    }
  };

  return { 
    getAnchor,
    getLength,
    isSunk,
    getAllCells,
    getCell,
    setHit,
  };
};

export { ShipBuilder };