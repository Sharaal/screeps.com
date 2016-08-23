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
      if (Game.rooms[roomName] && Game.rooms[roomName].isMy()) {
        return;
      }
      _.each(Game.flags, flag => {
        if (flag.pos.roomName !== roomName || !/^reserve/.test(flag.name)) {
          return;
        }
        spawns.push({
          body: { move: 1, claim: 1 },
          mapAmount: 1,
          memory: { flagName: flag.name },
          filter: creep => creep.memory.flagName === flag.name
        });
      });
    });
    return spawns;
  }
};
