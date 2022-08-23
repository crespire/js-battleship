import _ from 'lodash';
import { Battleship } from './lib/battleship.js';
import "./styles.css";

console.log('Loaded!');
let game = Battleship();
game.play();