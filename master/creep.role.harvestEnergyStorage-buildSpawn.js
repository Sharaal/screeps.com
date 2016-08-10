'use strict';

var harvest = 'harvestHomeEnergyStorage';
module.exports = {
  'harvestEnergyStorage-buildSpawn': {
    startActivity: harvest,
    activities: _.merge(
      {},
      require('./creep.activity.harvestHomeEnergyStorage')('buildSpawn',        harvest),
      require('./creep.activity.buildSpawn')              ('upgradeController', harvest),
      require('./creep.activity.upgradeController')       ('upgradeController', harvest)
    ),
    roomConditions: () => {
      var spawnBuilder = _.filter(Game.creeps, creep => creep.memory.role === 'harvestEnergyStorage-buildSpawn').length;
      if (spawnBuilder > 0) {
        return false;
      }
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
  }
};
