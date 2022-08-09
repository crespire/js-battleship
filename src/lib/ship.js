const ShipBuilder = (origin, length, orientation = 'horizontal') => {
  let hitsRegistered = Array(length).fill(false);

  const getAnchor = () => origin;
  const getLength = () => length;
  const isSunk = () => {
    return hitsRegistered.every(slot => slot === true);
  }
  const showHits = () => {
    return hitsRegistered;
  }

  const hit = (index) => {
    if (hitsRegistered[index] === false) {
      hitsRegistered[index] = true;
    }
  }

  return { getAnchor, getLength, isSunk, showHits, hit };
};

export { ShipBuilder };