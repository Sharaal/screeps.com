'use strict';

function find(creep) {
  return creep.pos.findClosestByPath(FIND_DROPPED_ENERGY);
}

module.exports = (next, harvest) => creep => {
  if (creep.isFull()) {
    return next;
  }
  var droppedEnergy = creep.getMemoryObject('harvestDroppedEnergy', find);
  if (!droppedEnergy) {
    return harvest;
  }
  if (creep.pickup(droppedEnergy) === ERR_NOT_IN_RANGE) {
    creep.moveTo(droppedEnergy);
  }
};
