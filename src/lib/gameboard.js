/**
 * Represents a game board for Battleship.
 * @param {Player} owner - Player object that owns game board
 * @returns {Board}
 */

const BoardBuilder = (owner) => {
  const boardData = Array.from(Array(10).fill(0), () => new Array(10).fill(0));
  
  const _getData = () => {
    return boardData;
  }

  const receiveAttack = (location) => {
    let data = getCell(location);
    if ( data == 0 ) {
      console.log('Miss!');
      data = 1;
    } else if ( data == 1 ) {
      console.log('Already marked miss.');
    } else if ( typeof data == 'function') {
      console.log('Ship found');
    }
  };

  const placeShip = (origin, ship, orientation) => {
    let shipLength = ship.getLength();

    if (orientation == 'horizontal') {
      for (let i = 0; i < shipLength; i++) {
        setCell(origin, () => {
          ship.setHit(i)
        }, i, 0);
      }

    } else if (orientation == 'vertical') {

    }
  };

  /**
   * A method to set the value of a given cell
   * @param {string} location - A1 through J10
   * @param {*} value - Value for cell
   * @param {int} colOffset - Number of columns to offset
   * @param {int} rowOffset - Number of rows to offset
   */
  const setCell = (location, value, colOffset = 0, rowOffset = 0) => {
    let [x, y] = getIndex(location);
    x += rowOffset;
    y += colOffset;

    if (x > 9 || x < 0) throw new Error(`Offset out of bounds, x is ${x}`);
    if (y > 9 || y < 0) throw new Error(`Offset out of bounds, y is ${y}`);

    boardData[x][y] = value;
  };

  const getCell = (location) => {
    let [x, y] = getIndex(location);
    return boardData[x][y]
  };

  const getIndex = (location) => {
    // a1 = [0, 0] row, col
    // h5 = [4, 7] row, col
    // c9 = [8, 2]
    // i10 = [9, 8]
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
    _getData,
  };
};

export { BoardBuilder };