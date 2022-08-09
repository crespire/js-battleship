const ShipBuilder = (origin, length, orientation = 'horizontal') => {
  let hitsRegistered = Array(length).fill(false);

  const getAnchor = () => origin;
  const getLength = () => length;
  const isSunk = () => {
    return hitsRegistered.every(slot => slot === true);
  }
  const getHits = () => {
    return hitsRegistered;
  }

  const hit = (index) => {
    if (index > (length - 1) || index < 0 ) {
      throw new Error('Not in bounds');
    }
    if (hitsRegistered[index] === false) {
      hitsRegistered[index] = true;
    }
  }

  return { getAnchor, getLength, isSunk, getHits, hit };
};

export { ShipBuilder };