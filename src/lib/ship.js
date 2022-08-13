import _ from "lodash";

/**
 * Represents a ship in the game Battleship.
 * @param {string} origin - The origin point of a ship.
 * @param {*} length - How many cells long a ship is, defaults to 2.
 * @param {bool} horizontal - Horizontal? Defaults to true.
 * @throws Will throw error unless ship is at least 2 cells long.
 * @returns {Ship}
 */
const ShipBuilder = (origin, length = 2, horizontal = true) => {

  /**
   * Initializes the internal data representation of the ship
   * { coordinate: hit boolean, etc }
   * 
   * This object is not validated, and will create coordinates out of bounds.
   * 
   * @returns {object}
   * @access private
   */
  const buildData = () => {
    if (length < 2) throw new Error('Ship must be at least 2 cells long.');

    let result = {};

    // Helper to get next coord entry
    const nextEntry = (x) => {
      return String.fromCharCode(x.charCodeAt(0) + 1);
    }
    
    // If orientation is horizontal, we're modifying index 0 of ['a', '1']
    let changeIndex = horizontal ? 0 : 1;
    let stableIndex = horizontal ? 1 : 0;

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

  let shipInfo = buildData();

  /**
   * Calculates if the ship is sunk
   * @returns {bool}
   */
  const isSunk = () => {
    let values = Object.values(shipInfo);
    return values.every(slot => slot === true);
  };

  /**
   * Returns an array of hits to the ship.
   * @returns {array}
   */
  const getHits = () => {
    return Object.values(shipInfo);
  }

  /**
   * Returns an array of cells the ship occupies.
   * @returns {array}
   */
  const getCells = () => {
    return Object.keys(shipInfo);
  }

  /**
   * Getters for ship properties.
   */
  const getAnchor = () => { return origin };
  const getLength = () => { return length };
  const isHorizontal = () => { return horizontal };

  /**
   * Updates the given spot to a hit.
   * @param {string} coord - Coordinate string (This design assumes some other object is doing input validation)
   */
  const receiveHit = (coord) => {
    shipInfo[coord] = true;
    console.log(`Received hit at ${coord}, ship status updated:`, shipInfo);
  }

  return { 
    getAnchor,
    getLength,
    isHorizontal,
    isSunk,
    receiveHit,
    getHits,
    getCells,
  };
};

export { ShipBuilder };