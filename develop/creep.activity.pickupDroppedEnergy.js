'use strict';

function find(creep) {
  return creep.pos.findClosestByPath(FIND_DROPPED_ENERGY);
}

module.exports = (next, needEnergy) => creep => {
  if (creep.isFull()) {
    return next;
  }
  var droppedEnergy = creep.getMemoryObject('pickupDroppedEnergy', find);
  if (!droppedEnergy) {
    return needEnergy;
  }
  creep.moveToOr('pickup', droppedEnergy);
};
