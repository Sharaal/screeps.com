'use strict';

module.exports = (creep, key, validate, find) => {
  if (!find) {
    find = validate;
    validate = undefined;
  }
  var object;
  if (!(creep.memory[key])
      ||
      !(object = Game.getObjectById(creep.memory[key]))
      ||
      !(validate && validate(object, creep))) {
    object = find(creep);
  }
  if (object) {
    creep.memory[key] = object.id;
  } else {
    delete creep.memory[key];
  }
  return object;
};
