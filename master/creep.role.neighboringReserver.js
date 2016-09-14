'use strict';

module.exports = {
  activities: {
    'moveToFlag':        require('./creep.activity.moveToFlag')       ('reserveController', 'moveToFlag'),
    'reserveController': require('./creep.activity.reserveController')('reserveController')
  },
  spawn: room => {
    const spawns = [];
    const exits = Game.map.describeExits(room.name);
    _.each(exits, roomName => {
      const neighboringRoom = Game.rooms[roomName];
      if (neighboringRoom && neighboringRoom.isMy()) {
        return;
      }
      _.each(Game.flags, flag => {
        if (flag.pos.roomName !== roomName || !/^reserve/.test(flag.name)) {
          return;
        }
        let claimParts = 2;
        if (room.energyCapacityAvailable < 1250) {
          claimParts = 1;
        }
        if (neighboringRoom) {
          const reservation = neighboringRoom.getMyReservation();
          if (reservation && reservation.ticksToEnd >= 1000) {
            claimParts = 1;
          }
        }
        spawns.push({
          body: { move: 1, claim: claimParts },
          mapAmount: 1,
          memory: { flagName: flag.name },
          filter: creep => creep.memory.flagName === flag.name
        });
      });
    });
    return spawns;
  }
};
