'use strict';

const VERSION = 3;

module.exports = roles => {
  Memory.version = Memory.version || 0;
  if (Memory.version === VERSION) {
    return;
  }
  for (; Memory.version < VERSION; ++Memory.version) {
    require(`./migration.version.${Memory.version}`)(roles);
  }
};
