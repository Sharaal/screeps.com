'use strict';

module.exports = (next, opts) => creep => {
  const flag = Game.flags[opts.flagName];
  if (!flag) {
    return;
  }
    creep.moveTo(flag);
    return;
  }
  return next;
};
