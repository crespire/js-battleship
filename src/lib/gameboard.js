/**
 * Represents a game board for Battleship.
 * @param {number} length - Length of the play area
 * @param {*} owner - Player object that owns game board
 * @returns {Board}
 */

const BoardBuilder = (length, owner) => {
  let boardData = Array(length).fill(Array(length).fill(0));

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

  const setCell = (location, value) => {
    let x, y = getIndex(location);
    boardData[x][y] = value;
  };

  const getCell = (location) => {
    let x, y = getIndex(location);
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

    // check col and row inputs are valid
    let col, row = [...location];
    if (!col.match(regexDigit)) throw new Error('Invalid column input.');
    if (!row.match(regexLetter)) throw new Error('Invalid row input.');
    
    // the proceed with map    
    let colIndex = colKey[col];
    let rowIndex = Number(row) - 1;

    return [rowIndex, colIndex];
  };

  return {
    receiveAttack,
    getCell,
    setCell,
  };
};

export { BoardBuilder };