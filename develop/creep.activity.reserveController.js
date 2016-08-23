'use strict';

module.exports = next => creep => {
  if (creep.moveToAnd('reserveController', creep.room.controller)) {
    return next;
  }
};
