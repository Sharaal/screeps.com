'use strict';

module.exports = (creep, key, list) => {  
  if (!list.length) {
    return;
  }

  if (creep.memory[key] && !list[creep.memory[key]]) {
    delete creep.memory[key];
  }
  if (!creep.memory[key]) {
    creep.memory[key] = _.sample(_.keys(list));
  }

  return list[creep.memory[key]];
};
