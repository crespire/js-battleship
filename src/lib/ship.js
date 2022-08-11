import { result } from "lodash";

/**
 * Represents a ship in the game Battleship.
 * @param {string} origin - The origin point of a ship.
 * @param {*} length - How many cells long a ship is.
 * @param {*} orientation - Orientation away from the origin
 * @returns {Ship}
 */
const ShipBuilder = (origin, length, orientation = 'horizontal') => {
  let shipInfo = buildCells();

  const getAnchor = () => origin;
  const getLength = () => length;

  const buildCells = () => {
    let result = {};
    const colMap = {
      'a': 0,
      'b': 1,
      'c': 2,
      'd': 3,
      'e': 4,
      'f': 5,
      'g': 6,
      'h': 7,
      'i': 8,
      'j': 9,
    }

    
    // If orientation is horizontal, we're modifying index 0 of ['a', '1']
    let changeIndex = orientation == 'horizontal' ? 0 : 1;
    let stableIndex = changeIndex == 0 ? 1 : 0;

    let nextCell;
    let currentCell = origin;

    for (let i = 0; i < length; i++) {
      result[currentCell] = false;
      nextCell = [...currentCell];
      nextCell[changeIndex] = nextEntry(currentCell[changeIndex]);
      nextCell[stableIndex] = currentCell[stableIndex];
      currentCell = nextCell.join('');
    }

    return result;
  }

  const nextEntry = (x) => {
    let nextCode = x.charCodeAt(0) + 1;
    return String.fromCharCode(nextCode);
  }

  /**
   * Calculates if the ship is sunk
   * @returns {bool}
   */
  const isSunk = () => {
    let values = Object.values(shipInfo);
    return values.every(slot => slot === true);
  };

  /**
   * Returns all ship spots hit status
   * @returns {array}
   */
  const getAllCells = () => {
    return shipInfo;
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

    let values = Object.values(shipInfo);
    return values[index];
  };

  /**
   * Updates the given spot to a hit
   * @param {int} index 
   */
  const receiveHit = (coord) => {
    console.log(`receiveHit: ${coord}`);
  }

  return { 
    getAnchor,
    getLength,
    isSunk,
    getAllCells,
    getCell,
    receiveHit,
  };
};

export { ShipBuilder };