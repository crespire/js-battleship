import { BoardBuilder } from './gameboard.js';
import { ShipBuilder } from './ship.js';
import { PlayerBuilder } from './player.js';

const Battleship = () => {
  let player = getPlayerInfo();
  let computer = PlayerBuilder('HAL', true);

  const getPlayerInfo = () => {
    // Generate a React modal to get player Information
  }

  const play = () => {
  };

  return { play };
};

export { Battleship };