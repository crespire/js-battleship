/**
 * Represents a game board for Battleship.
 * @param {Player} owner - Player object that owns game board
 * @returns {Board}
 */

const BoardBuilder = (owner) => {
  let boardData = Array.from(Array(10).fill(0), () => new Array(10).fill(0));
  let ships = [];
  let attackHistory = [];
  
  const _getData = () => {
    return boardData;
  }

  const _logState = () => {
    let jsonstring;
    let string = '\n';
    for (let row in boardData) {
      jsonstring = JSON.stringify(boardData[row]).replaceAll('null', 'S');
      string += jsonstring + '\n';
    }
    console.log(owner.name);
    console.log(string);
    console.log(ships);
  }

  /**
   * Resets the board.
   * @returns {true} after completion.
   * @access public
   */
  const clearBoard = () => {
    boardData = Array.from(Array(10).fill(0), () => new Array(10).fill(0));
    return true;
  }

  /**
   * Takes a location and updates the board data based on what was there.
   * @param {string} location - in format 'a1'
   * @returns {true} when complete
   * @access public
   */
  const receiveAttack = (location) => {
    let valid = validateCoordinate(location);
    if (!valid) { 
      console.warn('Coordinate not valid', location);
      return false;
    }

    if (attackHistory.includes(location)) { 
      console.warn('Already attacked:', location);
      return false;
    }

    attackHistory.push(location);
    let data = getCell(location);
    if ( data == 0 ) {
      console.log('Miss:', location);
      setCell(location, 1)
    } else if ( typeof data == 'function') {
      console.log('Hit:', location)
      data(location);
      setCell(location, 'x');
    } else {
      console.warn('Something went wrong, data is not expected', data);
      return false;
    }

    return true;
  };

  /**
   * Returns the amount of misses recorded on the board.
   * @returns {num}
   * @access public
   */
  const getMisses = () => { // 83 misses for every 10x10 board.
    return boardData.flat().filter(element => element == 1).length
  }

  /**
   * Returns the amount of hits recorded on the board.
   * @returns {num}
   * @access public
   */
  const getHits = () => {
    return boardData.flat().filter(element => element == 'x').length
  }

  /**
   * Calculates whether all ships on the board are sunk.
   * @returns {bool}
   * @access public
   */
  const allSunk = () => {
    return ships.every((ship) => { return ship.isSunk() });
  }
  
  /**
   * Returns an array of all ship objects
   * @returns {array}
   * @access public
   */
  const allShips = () => {
    return ships;
  }

  /**
   * Places a ship on the board if the ship is in bounds and does not
   * intersect another ship.
   * @param {Ship} ship 
   * @returns {true} on success
   * @access public
   */
  const placeShip = (ship) => {
    let origin = ship.getAnchor();
    let horizontal = ship.isHorizontal();
    let shipLength = ship.getLength();
    let cells = ship.getCells();

    let valid = cells.every((coordinate) => validateCoordinate(coordinate));
    if (!valid) return false;

    valid = cells.every((coordinate) => validateCellEmpty(coordinate));
    if (!valid) return false;

    if (horizontal) {
      for (let i = 0; i < shipLength; i++) {
        setCell(origin, ship.receiveHit, i, 0);
      }
    } else {
      for (let i = 0; i < shipLength; i++) {
        setCell(origin, ship.receiveHit, 0, i);
      }
    }

    ships.push(ship);
    return true;
  };

  /**
   * A method to check if the coordinate is in bounds.
   * @param {string} coord - Coordinate in format 'a1'
   * @throws Will throw error if coordinate is not in bounds.
   * @returns {true} provided guard conditions pass.
   * @access public
   */
  const validateCoordinate = (coord) => {
    let [col, row] = [...coord];
    const colValidation = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    const rowValidation = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    if (!colValidation.includes(col)) {
      console.warn('Out of bounds.');
      return false;
    }

    if (!rowValidation.includes(row)) {
      console.warn('Out of bounds.');
      return false;
    }

    return true;
  }

  /**
   * A method to check if the coordinate is empty
   * @param {string} coord - Coordinate in format 'a1'
   * @throws Will throw error if coordinate contains a function.
   * @returns {true} provided guard conditions pass.
   * @access private
   */
  const validateCellEmpty = (coord) => {
    let target = getCell(coord);
    if (typeof target == 'function') {
      console.warn('Already occupied at', coord);
      return false;
    }

    return true;
  }

  /**
   * A method to set the value of a given cell
   * @param {string} location - A1 through J10
   * @param {*} value - Value for cell
   * @param {int} colOffset - Number of columns to offset
   * @param {int} rowOffset - Number of rows to offset
   * @returns {true} if update was successful
   * @access public
   */
  const setCell = (location, value, colOffset = 0, rowOffset = 0) => {
    let [x, y] = getIndex(location);
    x += rowOffset;
    y += colOffset;

    if (x > 9 || x < 0) {
      console.warn(`Offset out of bounds, x is ${x}`);
      return false;
    }

    if (y > 9 || y < 0) {
      console.warn(`Offset out of bounds, y is ${y}`);
      return false;
    }

    boardData[x][y] = value;
    return true;
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
    if (!col?.match(regexLetter)) {
      console.warn('Invalid column input.');
      return [];
    }

    if (!row?.match(regexDigit)) {
      console.warn('Invalid row input.');
      return [];
    } 
    
    let colIndex = colKey[col];
    let rowIndex = Number(row) - 1;

    return [rowIndex, colIndex];
  };

  return {
    receiveAttack,
    getCell,
    setCell,
    getMisses,
    getHits,
    placeShip,
    clearBoard,
    allSunk,
    allShips,
    _getData,
    _logState,
  };
};

export { BoardBuilder };