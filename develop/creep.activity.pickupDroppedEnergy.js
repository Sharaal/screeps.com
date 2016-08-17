'use strict';

function find(creep) {
  return creep.pos.findClosestByPath(FIND_DROPPED_ENERGY);
}

module.exports = (next, empty) => creep => {
  if (creep.isFull()) {
    return next;
  }
  var droppedEnergy = creep.getMemoryObject('pickupDroppedEnergy', find);
  if (!droppedEnergy) {
    return empty;
  }
  creep.moveToAnd('pickup', droppedEnergy);
};
