/**
 * Generates a player object
 * @param {string} name 
 * @param {bool} ai - whether a player is a computer or not
 * @returns 
 */
const PlayerBuilder = (name, ai = false) => {
  const generateMoves = () => {
    let cols = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    let rows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let result = [];
    for(let i = 0; i < 10; i++) {
      for(let j = 0; j < 10; j++) {
        result.push([cols[i], rows[j]].join(''));
      };
    };

    return result;
  };

  let choices = ai ? generateMoves() : [];

  const makeRandomMove = () => {
    if (!ai) throw new Error('Method unavailable for a human.');
    if (choices.length == 0 && ai) throw new Error('No more moves left.');

    let choiceIndex = Math.floor(Math.random() * choices.length);
    let result = choices[choiceIndex];
    choices.splice(choiceIndex, 1)

    return result;
  }

  return { name, makeRandomMove }
}

export { PlayerBuilder }