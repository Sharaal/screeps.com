'use strict';

const build = require('./room.build');
const spawn = require('./room.spawn');
const towerController = require('./tower.controller');

module.exports = (roles, ticksToSleep) => room => {
  if (ticksToSleep(10)) {
    build(room);
    spawn(roles)(room);
  }
  const towers = room.find(FIND_STRUCTURES, { filter: structure => structure.structureType === STRUCTURE_TOWER });
  _.each(towers, towerController);
};
