'use strict';

module.exports = {
  activities: {
    'flagClaimNeutralController': require('./creep.activity.flagClaimNeutralController')('suicide'),
    'suicide':                    require('./creep.activity.suicide')
  },
  spawn: room => {
    const claimFlag = Game.flags['claim'];
    if (!claimFlag) {
      return;
    }
    const rooms = _.filter(Game.rooms, room => room.controller.my);
    if (rooms.length >= Game.gcl.level) {
      return;
    }
    const exits = Game.map.describeExits(room.name);
    if (!_.find(exits, roomName => roomName === claimFlag.room.name)) {
      return;
    }
    return {
      body: { claim: 1, move: 3 },
      mapAmount: 1
    };
  }
};
