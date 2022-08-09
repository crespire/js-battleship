const ShipBuilder = (origin, length, orientation = 'horizontal') => {
  let hitsRegistered = Array(length).fill(false);

  const getAnchor = () => anchor;
  const getLength = () => length;
  const isSunk = () => {
    hitsRegistered.every(slot => slot === true);
  }

  const hit = (index) => {
    if (hitsRegistered[index] === false) {
      hitsRegistered[index] = true;
    }
  }

  return { getAnchor, getLength, isSunk, hit };
};

export { ShipBuilder };