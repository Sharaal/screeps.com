'use strict';

module.exports = next => creep => {
  if (creep.moveToAnd('claimController', creep.room.controller)) {
    return next;
  }
};
