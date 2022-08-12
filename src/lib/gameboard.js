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
    console.log(boardData);
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
    validateCoordinate(location);
    if (attackHistory.includes(location)) throw new Error('Already attacked:', location);

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
      throw new Error('Something went wrong, data is not expected', data);
    }

    return true;
  };

  /**
   * Returns the amount of misses recorded on the board.
   * @returns {num}
   * @access public
   */
  const getMisses = () => {
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
    cells.every((coordinate) => validateCoordinate(coordinate));
    cells.every((coordinate) => validateCellEmpty(coordinate));

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
    if (!colValidation.includes(col)) throw new Error('Coordinate not in bounds.');
    if (!rowValidation.includes(row)) throw new Error('Coordinate not in bounds.');

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
    if (typeof target == 'function') throw new Error('Already occupied at', coord);

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

    if (x > 9 || x < 0) throw new Error(`Offset out of bounds, x is ${x}`);
    if (y > 9 || y < 0) throw new Error(`Offset out of bounds, y is ${y}`);

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