'use strict';

Creep.prototype.error = function (text, data) {
  this.say('!');
  console.log(`creep "${this.name}": ${text}`);
  if (data) {
    console.log(JSON.stringify(data));
  }
};

Creep.prototype.removeMemoryObject = function (key) {
  delete this.memory[key];
};

Creep.prototype.getMemoryObject = function (key, validate, find) {
  if (!find) {
    find = validate;
    validate = undefined;
  }
  var object;
  if (!(this.memory[key])
    ||
    !(object = Game.getObjectById(this.memory[key]))
    ||
    !(validate && validate(object, this))) {
    object = find(this);
  }
  if (object) {
    this.memory[key] = object.id;
  } else {
    delete this.memory[key];
  }
  return object;
};

Creep.prototype.moveToOr = function (functionName, args) {
  if (!Array.isArray(args)) {
    args = [args];
  }
  if (this[functionName].apply(this, args) === ERR_NOT_IN_RANGE) {
    this.moveTo(args[0]);
  } else {
    return true;
  }
};
