'use strict';

module.exports = {
  'flagClaimer': {
    startActivity: 'flagClaimNeutralController',
    activities: _.merge(
      {},
      require('./creep.activity.flagClaimNeutralController')('flagClaimNeutralController')
    ),
    roomConditions: () => {
      if (!Game.flags.claim) {
        return false;
      }
      var flagClaimer = _.filter(Game.creeps, creep => creep.memory.role === 'flagClaimer').length;
      if (flagClaimer > 0) {
        return false;
      }
      var rooms = _.filter(Game.rooms, room => room.controller.my).length;
      if (rooms >= Game.gcl.level) {
        return false;
      }
      return true;
    }
  }
};
