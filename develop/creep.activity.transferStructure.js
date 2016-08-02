'use strict';

var renew = require('./creep.activity.renew');

module.exports = creep => {
  var transferStructure = Game.getObjectById(creep.memory.transferStructure);
  var energy = creep.carry.energy;
  if (creep.transfer(transferStructure, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
    creep.moveTo(transferStructure);
    return;
  }
  if (creep.carry.energy === energy || creep.carry.energy === 0) {
    return true;
  }
};
