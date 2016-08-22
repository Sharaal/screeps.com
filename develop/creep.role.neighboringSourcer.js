'use strict';

module.exports = {
  activities: {
    'moveToFlag':            require('./creep.activity.moveToFlag')           ('harvestSource',         'moveToFlag'),
    'harvestSource':         require('./creep.activity.harvestSource')        ('transferEnergyStorage', 'harvestSource'),
    'transferEnergyStorage': require('./creep.activity.transferEnergyStorage')('transferEnergyStorage', 'moveToFlag')
  },
  spawn: room => {
    if (!room.storage) {
      return;
    }
    const spawns = [];
    _.each(exits, roomName => {
      if (Game.rooms[roomName] && Game.rooms[roomName].isMy()) {
        return;
      }
      _.each(Game.flags, flag => {
        if (flag.pos.roomName !== roomName || !/^source/.test(flag.name)) {
          return;
        }
        spawns.push({
          body: { carry: 1, move: 1, work: 2 },
          mapAmount: 5,
          memory: { flagName: flag.name, transferEnergyStorage: room.storage.id },
          filter: creep => creep.memory.flagName === flag.name
        });
      });
    });
    return spawns;
  }
};
