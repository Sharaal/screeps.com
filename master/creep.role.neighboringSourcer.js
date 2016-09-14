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
        let mapAmount = 3;
        if (neighboringRoom && neighboringRoom.hasMyReservation()) {
          mapAmount = 6;
        }
        spawns.push({
          body: { carry: 3, move: 2, work: 1 },
          mapAmount: mapAmount,
          memory: { flagName: flag.name, transferEnergyStorage: room.storage.id },
          filter: creep => creep.memory.flagName === flag.name
        });
      });
    });
    return spawns;
  }
};
