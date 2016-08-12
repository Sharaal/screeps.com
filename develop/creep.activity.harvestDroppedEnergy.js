'use strict';

var memoryObject = require('util.memoryObject');

function find(creep) {
  return creep.pos.findClosestByPath(FIND_DROPPED_ENERGY);
}

module.exports = (next, harvest) => creep => {
  if (creep.carry.energy === creep.carryCapacity) {
    return next;
  }
  var droppedEnergy = memoryObject(creep, 'harvestDroppedEnergy', find);
  if (!droppedEnergy) {
    return harvest;
  }
  if (creep.pickup(droppedEnergy) === ERR_NOT_IN_RANGE) {
    creep.moveTo(droppedEnergy);
  }
};
