/**
 * Represents a ship in the game Battleship.
 * @param {string} origin - The origin point of a ship.
 * @param {*} length - How many cells long a ship is.
 * @param {bool} horizontal - Horizontal? Defaults to true.
 * @returns {Ship}
 */
const ShipBuilder = (origin, length, horizontal = true) => {
  const getAnchor = () => origin;
  const getLength = () => length;

  const buildCells = () => {
    let result = {};

    const nextEntry = (x) => {
      let nextCode = x.charCodeAt(0) + 1;
      return String.fromCharCode(nextCode);
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

    console.log('Ship initialized:', result);

    return result;
  }

  let shipInfo = buildCells();

  /**
   * Calculates if the ship is sunk
   * @returns {bool}
   */
  const isSunk = () => {
    let values = Object.values(shipInfo);
    return values.every(slot => slot === true);
  };

  /**
   * Updates the given spot to a hit.
   * @param {string} coord - Coordinate string (This design assumes some other object is doing input validation)
   */
  const receiveHit = (coord) => {
    shipInfo[coord] = true;
    console.log(`Received hit at ${coord}, ship status updated:`, shipInfo);
  }

  /**
   * Returns an array of hits to the ship.
   * @returns {array}
   */
  const showHits = () => {
    return Object.values(shipInfo);
  }

  return { 
    getAnchor,
    getLength,
    isSunk,
    receiveHit,
    showHits,
  };
};

export { ShipBuilder };