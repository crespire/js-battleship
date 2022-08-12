/**
 * Represents a game board for Battleship.
 * @param {Player} owner - Player object that owns game board
 * @returns {Board}
 */

const BoardBuilder = (owner) => {
  let boardData = Array.from(Array(10).fill(0), () => new Array(10).fill(0));
  
  const _getData = () => {
    return boardData;
  }

  const _logState = () => {
    console.log(boardData);
  }

  const clearBoard = () => {
    console.log('Re-initializing board.');
    boardData = Array.from(Array(10).fill(0), () => new Array(10).fill(0));
  }

  const receiveAttack = (location) => {
    let inBounds = validCoordinate(location);
    if (!inBounds) throw new Error('Coordinates out of bounds.');

    let data = getCell(location);
    if ( data == 0 ) {
      console.log('Miss!');
      data = 1;
    } else if ( data == 1 ) {
      console.log('Already marked miss.');
    } else if ( typeof data == 'function') {
      // we found a ship, but I have to figure out how to get which part of the ship
    }
  };

  const placeShip = (origin, ship) => {
    let horizontal = ship.isHorizontal();
    let shipLength = ship.getLength();
    let cells = ship.getCells();
    let validPlacement = cells.every((coordinate) => validCoordinate(coordinate));
    if (!validPlacement) return false;

    if (horizontal) {
      for (let i = 0; i < shipLength; i++) {
        setCell(origin, ship.receiveHit, i, 0);
      }
    } else {
      for (let i = 0; i < shipLength; i++) {
        setCell(origin, ship.receiveHit, 0, i);
      }
    }

    return true;
  };
  
  const validCoordinate = (coord) => {
    let [col, row] = [...coord];
    const colValidation = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    const rowValidation = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    if (!colValidation.includes(col)) throw new Error('Coordinate not in bounds.');
    if (!rowValidation.includes(row)) throw new Error('Coordinate not in bounds.');

    return true;
  }
  /**
   * A method to set the value of a given cell
   * @param {string} location - A1 through J10
   * @param {*} value - Value for cell
   * @param {int} colOffset - Number of columns to offset
   * @param {int} rowOffset - Number of rows to offset
   * @access public
   */
  const setCell = (location, value, colOffset = 0, rowOffset = 0) => {
    let [x, y] = getIndex(location);
    x += rowOffset;
    y += colOffset;

    if (x > 9 || x < 0) throw new Error(`Offset out of bounds, x is ${x}`);
    if (y > 9 || y < 0) throw new Error(`Offset out of bounds, y is ${y}`);

    boardData[x][y] = value;
  };

  /**
   * A method to retrieve cell contents
   * @param {string} location 
   * @returns {int || function}
   * @access public
   */
  const getCell = (location) => {
    let [x, y] = getIndex(location);
    return boardData[x][y]
  };

  /**
   * A method to convert location to array indices
   * @param {string} location 
   * @returns {array} [row_index, column_index]
   * @access private
   */
  const getIndex = (location) => {
    const colKey = {
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
    
    const regexDigit = /\b([1-9]|10)\b/; // matches '1' through '10' only
    const regexLetter = /\b[A-Ja-j]\b/; // matches single character in range only

    let [col, row] = [...location];
    if (!col?.match(regexLetter)) throw new Error('Invalid column input.');
    if (!row?.match(regexDigit)) throw new Error('Invalid row input.');
    
    let colIndex = colKey[col];
    let rowIndex = Number(row) - 1;

    return [rowIndex, colIndex];
  };

  return {
    receiveAttack,
    getCell,
    setCell,
    placeShip,
    clearBoard,
    _getData,
    _logState,
  };
};

export { BoardBuilder };