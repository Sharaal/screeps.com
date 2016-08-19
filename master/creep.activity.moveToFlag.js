'use strict';

module.exports = (next, opts) => creep => {
  const flag = Game.flags[opts.flagName];
  if (!flag) {
    creep.error('missing flag', { flagName: opts.flagName });
    return;
  }
  if (!flag.pos.inRangeTo(creep, 3)) {
    creep.moveTo(flag);
    return;
  }
  return next;
};
