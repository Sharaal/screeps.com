'use strict';

module.exports = creep => {
  var sources = creep.room.find(FIND_SOURCES);
  if (sources.length === 0) {
    creep.say('missing source');
    return;
  }
  creep.memory.source = _.sample(sources).id;
  return true;
};
