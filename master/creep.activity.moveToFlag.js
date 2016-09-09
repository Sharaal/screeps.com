'use strict';

module.exports = (next, noPath, opts) => creep => {
  opts = opts || {};
  
  let flags;
  if (opts.flagName) { 
    flags = _.filter(Game.flags, flag => 
      opts.flagName.test(flag.name) && 
      (!creep.memory.flagName || flag.name > creep.memory.flagName));
    flags = _.sortBy(flags, flag => flag.name);
  }
  console.log(JSON.stringify(flags));
  if (!creep.memory.flagName && flags.length > 0) {
    creep.memory.flagName = flags.shift().name;
  }
  
  let flag = Game.flags[creep.memory.flagName];
  if (!flag) {
    creep.error('missing flag', { flagName: creep.memory.flagName });
    return;
  }
  if (flag.pos.inRangeTo(creep, 3)) {
    if (flags.length > 0) {
      creep.memory.flagName = flags.shift().name;
    } else {
      return next;
    }
  }
  if (creep.moveTo(flag) === ERR_NO_PATH) {
    return noPath;
  }
};
