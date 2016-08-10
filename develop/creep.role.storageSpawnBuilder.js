'use strict';

var harvest = 'harvestHomeEnergyStorage';
module.exports = {
  startActivity: harvest,
  activities: {
    'harvestHomeEnergyStorage': require('./creep.activity.harvestHomeEnergyStorage')('buildSpawn',        harvest),
    'buildSpawn':               require('./creep.activity.buildSpawn')              ('upgradeController', harvest),
    'upgradeController':        require('./creep.activity.upgradeController')       ('upgradeController', harvest)
  },
  roomConditions: () => {
    var spawn;
    _.each(Game.rooms, room => {
      if (spawn) {
        return;
      }
      if (!room.controller.my) {
        return;
      }
      _.each(room.find(FIND_CONSTRUCTION_SITES), constructionSite => {
        if (spawn) {
          return;
        }
        if (constructionSite.structureType === STRUCTURE_SPAWN) {
          spawn = constructionSite;
        }
      });
    });
    if (spawn) {
      return true;
    }
  }
};
