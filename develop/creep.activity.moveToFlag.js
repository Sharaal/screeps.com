'use strict';

module.exports = (next, noPath, opts) => creep => {
  opts = opts || {};
  const flagName = creep.memory.flagName || opts.flagName;
  const flag = Game.flags[flagName];
  if (!flag) {
    creep.error('missing flag', { flagName: flagName });
    return;
  }
  if (flag.pos.inRangeTo(creep, 3)) {
    return next;
  }
  if (creep.moveTo(flag) === ERR_NO_PATH) {
    return noPath;
  }
};
