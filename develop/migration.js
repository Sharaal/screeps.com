'use strict';

var currentVersion = 1;

module.exports = roles => {
  if (!Memory.version) {
    Memory.version = currentVersion;
    return;
  }
  if (Memory.version === currentVersion) {
    return;
  }
  for (; Memory.version < currentVersion; ++Memory.version) {
    require(`./migration.${Memory.version}`)(roles);
  }
};
