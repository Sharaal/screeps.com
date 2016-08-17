'use strict';

var currentVersion = 2;

module.exports = roles => {
  Memory.version = Memory.version || 0;
  if (Memory.version === currentVersion) {
    return;
  }
  for (; Memory.version < currentVersion; ++Memory.version) {
    require(`./migration.version.${Memory.version}`)(roles);
  }
};
