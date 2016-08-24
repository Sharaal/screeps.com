'use strict';

const build = require('./room.build');
const harvestSourceAmount = require('./statistic.harvestSourceAmount');
const spawn = require('./room.spawn');
const towerController = require('./tower.controller');

module.exports = (roles, ticksToSleep) => room => {
  if (ticksToSleep(10)) {
    build(room);
    spawn(roles)(room);

    harvestSourceAmount.show(room);
    harvestSourceAmount.remove(room);
  }
  const towers = room.find(FIND_STRUCTURES, { filter: structure => structure.structureType === STRUCTURE_TOWER });
  _.each(towers, towerController);
};
