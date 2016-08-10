'use strict';

var harvest = 'harvestHomeEnergyStorage';
module.exports = {
  startActivity: harvest,
  activities: {
    'harvestHomeEnergyStorage': require('./creep.activity.harvestHomeEnergyStorage')('buildSpawn',        harvest),
    'buildSpawn':               require('./creep.activity.buildSpawn')              ('upgradeController', harvest),
    'upgradeController':        require('./creep.activity.upgradeController')       ('upgradeController', harvest)
  },
  roomConditions: room => {
    var spawn;
    _.each(Game.rooms, room => {
      if (spawn) {
        return;
      }
      if (!room.controller.my) {
        return;
      }
      var spawns = room.find(FIND_MY_CONSTRUCTION_SITES, {
        filter: constructionSite => constructionSite.structureType == STRUCTURE_SPAWN
      });
      if (spawns.length > 0) {
        spawn = spawns[0];
      }
    });
    if (!spawn) {
      return;
    }
    if (!_.find(Game.map.describeExits(room.name), room => room.name === spawn.room.name)) {
      return;
    }
    return true;
  }
};
