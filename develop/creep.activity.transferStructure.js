'use strict';

module.exports = creep => {
  var transferStructure = Game.getObjectById(creep.memory.transferStructure);
  creep.transfer(transferStructure, RESOURCE_ENERGY);
  return true;
};
