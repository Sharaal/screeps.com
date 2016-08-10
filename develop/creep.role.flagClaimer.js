'use strict';

module.exports = {
  startActivity: 'flagClaimNeutralController',
  activities: {
    'flagClaimNeutralController': require('./creep.activity.flagClaimNeutralController')('flagClaimNeutralController')
  },
  roomConditions: () => {
    if (!Game.flags.claim) {
      return false;
    }
    var rooms = _.filter(Game.rooms, room => room.controller.my);
    if (rooms.length >= Game.gcl.level) {
      return false;
    }
    return true;
  }
};
