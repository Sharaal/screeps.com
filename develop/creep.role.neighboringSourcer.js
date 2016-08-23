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
    const exits = Game.map.describeExits(room.name);
    _.each(exits, roomName => {
      const neighboringRoom = Game.rooms[roomName];
      if (neighboringRoom && neighboringRoom.isMy()) {
        return;
      }
      _.each(Game.flags, flag => {
        if (flag.pos.roomName !== roomName || !/^source/.test(flag.name)) {
          return;
        }
        let mapAmount = 5;
        if (neighboringRoom && neighboringRoom.isMyReserved()) {
          mapAmount = 10;
        }
        spawns.push({
          body: { carry: 1, move: 1, work: 2 },
          mapAmount: mapAmount,
          memory: { flagName: flag.name, transferEnergyStorage: room.storage.id },
          filter: creep => creep.memory.flagName === flag.name
        });
      });
    });
    return spawns;
  }
};
