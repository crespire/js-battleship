import { BoardBuilder } from './gameboard.js';
import { ShipBuilder } from './ship.js';
import { PlayerBuilder } from './player.js';

const Battleship = () => {
  const getPlayerInfo = () => {
    let name = 'Test';
    return PlayerBuilder(name);
  }

  let player = getPlayerInfo();
  let computer = PlayerBuilder('HAL', true);

  const setupBoard = (owner) => {
    let board = BoardBuilder(owner);

    // Generate ships randomly and place them.
    const randomCell = () => {
      let cols = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
      let rows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      let choices = [];
      for(let i = 0; i < 10; i++) {
        for(let j = 0; j < 10; j++) {
          choices.push([cols[i], rows[j]].join(''));
        };
      };
  
      let choiceIndex = Math.floor(Math.random() * choices.length);
      let result = choices[choiceIndex];
  
      return result;
    }

    let shipLength = 5;
    let ship;
    let success = false;

    while(!success) { // Add one 3 length ship.
      ship = ShipBuilder(randomCell(), 3, (Math.random() < 0.5));
      success = board.placeShip(ship);
    }

    while(shipLength > 1) { // Add the rest.
      ship = ShipBuilder(randomCell(), shipLength, (Math.random() < 0.5));
      success = board.placeShip(ship);    
      if (success) { shipLength--; }
    }

    return board;
  }

  const playRound = () => {
    // Player goes
    // Computer goes
    return true;
  }

  const play = () => {
    let playerBoard = setupBoard(player);
    let computerBoard = setupBoard(computer);

    // Boards are set up, let's play the rounds!
    // Loop until either board reports allSunk or full.
    
    return true;
  };

  return { play };
};

export { Battleship };