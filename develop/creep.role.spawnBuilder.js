'use strict';

module.exports = {
  startActivity: 'harvestEnergyStorage',
  activities: {
    'harvestEnergyStorage': require('./creep.activity.harvestEnergyStorage')('buildSpawn',        'harvestEnergyStorage'),
    'harvestDroppedEnergy': require('./creep.activity.harvestDroppedEnergy')('buildSpawn',        'harvestSource'),
    'harvestSource':        require('./creep.activity.harvestSource')       ('buildSpawn',        'harvestDroppedEnergy'),
    'buildSpawn':           require('./creep.activity.buildSpawn')          ('upgradeController', 'harvestDroppedEnergy'),
    'upgradeController':    require('./creep.activity.upgradeController')   ('upgradeController', 'harvestDroppedEnergy')
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
        filter: constructionSite => constructionSite.structureType === STRUCTURE_SPAWN
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
