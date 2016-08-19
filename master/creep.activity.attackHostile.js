'use strict';

function findHostileTower(creep) {
  return creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES, {
    filter: structure => structure.structureType === STRUCTURE_TOWER
  });
}

function findHostileCreep(creep) {
  return creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS);
}

function findHostileSpawn(creep) {
  return creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES, {
    filter: structure => structure.structureType === STRUCTURE_SPAWN
  });
}

function findHostileStructures(creep) {
  return creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES, {
    filter: structure => structure.structureType !== STRUCTURE_CONTROLLER
  });
}

function find(creep) {
  return findHostileTower(creep) || findHostileCreep(creep) || findHostileSpawn(creep) || findHostileStructures(creep);
}

module.exports = next => creep => {
  const hostile = creep.getMemoryObject('attackHostile', find);
  if (!hostile) {
    return next;
  }
  creep.moveToAnd('attack', hostile);
};
