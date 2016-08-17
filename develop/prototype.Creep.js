'use strict';

Creep.prototype.error = function (text, data) {
  this.say('!');
  console.log(`creep "${this.name}": ${text}`);
  if (data) {
    console.log(JSON.stringify(data));
  }
};

Creep.prototype.getMemoryObject = function (key, validate, find) => {
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

Creep.prototype.isEmpty = function (resource, rest) {
  if (typeof resource === 'number') {
    rest = resource;
    resource = undefined;
  }
  resource = resource || RESOURCE_ENERGY;
  return this.carry[resource] <= rest;
};

Creep.prototype.isFull = function () {
  return this.carryCapacity > 0
         &&
         _.sum(this.carry) === this.carryCapacity;
};