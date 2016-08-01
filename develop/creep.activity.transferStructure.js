'use strict';

var renew = require('./creep.activity.renew');

module.exports = creep => {
  var transferStructure = Game.getObjectById(creep.memory.transferStructure);
  creep.transfer(transferStructure, RESOURCE_ENERGY);
  if (transferStructure.structureType === STRUCTURE_SPAWN) {
    renew(creep, transferStructure);
  }
  return true;
};
