'use strict';

module.exports = {
  startActivity: 'withdrawEnergyStorage',
  activities: {
    'withdrawEnergyStorage': require('./creep.activity.withdrawEnergyStorage')('buildSpawn',          'withdrawEnergyStorage'),
    'pickupDroppedEnergy':   require('./creep.activity.pickupDroppedEnergy')  ('buildSpawn',          'harvestSource'),
    'harvestSource':         require('./creep.activity.harvestSource')        ('buildSpawn',          'pickupDroppedEnergy'),
    'buildSpawn':            require('./creep.activity.buildSpawn')           ('upgradeController',   'rescueController'),
    'rescueController':      require('./creep.activity.upgradeController')    ('pickupDroppedEnergy', 'pickupDroppedEnergy', { ticksToDowngrade: 2500 }),
    'upgradeController':     require('./creep.activity.upgradeController')    ('upgradeController',   'pickupDroppedEnergy')
  },
  roomConditions: room => {
    var spawn;
    _.each(Game.rooms, room => {
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
