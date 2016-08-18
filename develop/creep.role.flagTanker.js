'use strict';

const spawnFlagName = 'tank spawn';
const targetFlagName = 'tank target';

module.exports = {
  activities: {
    'moveToFlagRoom': require('./creep.activity.moveToFlagRoom')('moveToFlagRoom', { flagName: targetFlagName })
  },
  spawn: room => {
    const flag = Game.flags[spawnFlagName];
    if (!flag) {
      return;
    }
    if (!flag.room) {
      return;
    }
    const exits = Game.map.describeExits(room.name);
    if (!_.find(exits, roomName => roomName === flag.room.name)) {
      return;
    }
    return {
      body: { tough: 49, move: 1 },
      mapAmount: 1
    };
  }
};
