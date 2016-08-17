'use strict';

Creep.prototype.error = function (text, data) {
  this.say('!');
  console.log(`creep "${this.name}": ${text}`);
  if (data) {
    console.log(JSON.stringify(data));
  }
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
  return this.carryCapacity > 0 && _.sum(creep.carry) === this.carryCapacity;
};
