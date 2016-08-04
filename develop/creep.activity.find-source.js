'use strict';

module.exports = (creep, results) => {
  var sources = creep.room.find(FIND_SOURCES);
  if (sources.length === 0) {
    creep.say('missing source');
    return results.NEXTTICK;
  }
  creep.memory.source = _.sample(sources).id;
  return results.FINISHED;
};
