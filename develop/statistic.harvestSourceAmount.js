'use strict';

Memory.harvestSourceAmount = Memory.harvestSourceAmount || {};

module.exports.save = (creep, source, workAmount) => {
  if (creep.room.hasFlag(/^save statistics/)) {
    Memory.harvestSourceAmount[source.id] = Memory.harvestSourceAmount[source.id] || [];
    Memory.harvestSourceAmount[source.id].push({ time: Game.time, amount: workAmount });
  }
};

module.exports.show = room => {
  if (room.hasFlag(/^show statistics/)) {
    _.each(room.find(FIND_SOURCES), source => {
      if (!Memory.harvestSourceAmount[source.id]) {
        return;
      }
      const harvestSourceAmount = Memory.harvestSourceAmount[source.id]
        .filter(entry => entry.tick > Game.time - 1500)
        .reduce((entryA, entryB) => entryA.amount + entryB.amount);
      console.log(`${source.id} harvestSourceAmount: ${harvestSourceAmount}`);
    });
  }
};

module.exports.remove = room => {
  const flag = room.getFlag(/^remove statistics/);
  if (!flag) {
    return;
  }
  _.each(room.find(FIND_SOURCES), source => {
    delete Memory.harvestSourceAmount[source.id];
  });
  flag.remove();
};
