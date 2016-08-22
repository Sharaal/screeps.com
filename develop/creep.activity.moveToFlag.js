'use strict';

module.exports = (next, noPath, opts) => creep => {
  const flag = Game.flags[opts.flagName];
  if (!flag) {
    creep.error('missing flag', { flagName: opts.flagName });
    return;
  }
  if (flag.pos.inRangeTo(creep, 3)) {
    return next;
  }
  if (creep.moveTo(flag) === ERR_NO_PATH) {
    return noPath;
  }
};
