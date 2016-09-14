'use strict';

function find(creep) {
  return creep.pos.findClosestByPath(FIND_DROPPED_ENERGY);
}

module.exports = (full, next) => creep => {
  if (creep.isFull()) {
    return full;
  }
  const droppedEnergy = creep.getMemoryObject('pickupDroppedEnergy', find);
  if (!droppedEnergy) {
    return next;
  }
  creep.moveToAnd('pickup', droppedEnergy);
};
