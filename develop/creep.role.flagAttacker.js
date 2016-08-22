'use strict';

module.exports = {
  activities: {
    'moveToFlag':    require('./creep.activity.moveToFlag')   ('attackHostile', 'attackWall', { flagName: 'attack target' }),
    'attackWall':    require('./creep.activity.attackWall')   ('moveToFlag'),
    'attackHostile': require('./creep.activity.attackHostile')('moveToFlag')
  },
  spawn: room => {
    if (!room.hasFlag(/^attack spawn/)) {
      return;
    }
    return {
      body: { attack: 5, move: 5 },
      disableNotifyWhenAttacked: true
    };
  }
};
