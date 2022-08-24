import { BoardBuilder } from './gameboard.js';
import { ShipBuilder } from './ship.js';
import { PlayerBuilder } from './player.js';

const Battleship = () => {
  const getPlayerInfo = () => {
    let name = 'Player';
    return PlayerBuilder(name);
  }

  let player = getPlayerInfo();
  let computer = PlayerBuilder('HAL', true);

  const setupBoard = (owner) => {
    let board = BoardBuilder(owner);

    // Generate ships randomly and place them.
    let shipLength = 5;
    let ship;
    let anchor;
    let horizontal;
    let success = false;

    /**
     * 1 x ship with 5 length
     * 1 x ship with 4 length
     * 2 x ships with 3 length
     * 1 x ship with 2 length
     * 17 hits total to win
     * 83 misses for full
     */
    while(!success) { // Add one 3 length ship.
      anchor = board.randomCell();
      horizontal = Math.random() < 0.5;
      ship = ShipBuilder(anchor, 3, horizontal);
      success = board.placeShip(ship);
    }

    success = false;
    while(shipLength > 1) { // Add the rest.
      anchor = board.randomCell();
      horizontal = Math.random() < 0.5;
      ship = ShipBuilder(anchor, shipLength, horizontal);
      success = board.placeShip(ship);
      if (success) { shipLength--; }
    }

    return board;
  }

  const renderBoard = (board, showShips = true) => {
    // generate HTML representation of the board and return the parent of the grid
    let parentDiv = document.createElement('div');
    parentDiv.classList.add('playGrid');
    let cell;
    const colKey = {
      0: 'a',
      1: 'b',
      2: 'c',
      3: 'd',
      4: 'e',
      5: 'f',
      6: 'g',
      7: 'h',
      8: 'i',
      9: 'j',
    }
    let cellAddress;

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        cell = document.createElement('div');
        cell.classList.add('cell');
        cellAddress = `${colKey[j]}${i+1}`;
        cell.dataset.index = `${i}${j}`;
        cell.dataset.name = cellAddress;
        switch(board.getCell(cellAddress)) {
          case 0:
            cell.classList.add('cell--empty');
            break;
          case 1:
            cell.classList.add('cell--miss');
            break;
          case 'x':
            cell.classList.add('cell--hit');
            break;
          default:
            (showShips) ? cell.classList.add('cell--ship') : cell.classList.add('cell--empty');
            break;
        }
        parentDiv.appendChild(cell);
      }
    }

    return parentDiv;
  }

  const play = () => {
    function playRound(event) {
      if(!event.target.classList.contains('cell')) { return; }

      let playerMovesHistory = computerBoard.getAttackHistory();
      let computerMovesHistory = playerBoard.getAttackHistory();
      let computerMove = playerBoard.randomCell();

      if (playerMovesHistory.includes(event.target.dataset.name)) {
        console.warn('Try again, already attacked', event.target.dataset.name);
        return;
      }

      computerBoard.receiveAttack(event.target.dataset.name);

      while(computerMovesHistory.includes(computerMove)) {
        computerMove = playerBoard.randomCell();
      }

      playerBoard.receiveAttack(computerMove);

      let newPlayerDisplay = renderBoard(playerBoard);
      let newComputerDisplay = renderBoard(computerBoard, false);
      playerContainer.replaceChild(newPlayerDisplay, playerDisplay);
      computerContainer.replaceChild(newComputerDisplay, computerDisplay);
      playerDisplay = newPlayerDisplay;
      computerDisplay = newComputerDisplay;

      if (playerBoard.allSunk() || computerBoard.allSunk()) {
        let winner = playerBoard.allSunk() ? 'Computer' : 'Player';
        alert(`${winner} won! Refresh to play again!`);
      }
    }

    let playerBoard = setupBoard(player);
    let computerBoard = setupBoard(computer);
    const root = document.getElementById('root');

    let playerDisplay = renderBoard(playerBoard);
    let title = document.createElement('span');
    let playerContainer = document.createElement('div');
    playerContainer.id = 'player-container';
    title.innerText = "Player's Board";
    playerContainer.appendChild(title);
    playerContainer.appendChild(playerDisplay);
    root.appendChild(playerContainer);

    let computerDisplay = renderBoard(computerBoard, false);
    let computerContainer = document.createElement('div');
    computerContainer.id = 'computer-container';
    title = document.createElement('span');
    title.innerText = "Computer's Board";
    computerContainer.appendChild(title);
    computerContainer.appendChild(computerDisplay);
    root.appendChild(computerContainer);
 
    computerContainer.addEventListener('click', playRound);

    return true;
  };

  return { play };
};

export { Battleship };