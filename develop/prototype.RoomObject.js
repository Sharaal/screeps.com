'use strict';

RoomObject.prototype.isEmpty = function (resource, rest) {
  if (typeof resource === 'number') {
    rest = resource;
    resource = undefined;
  }
  resource = resource || RESOURCE_ENERGY;
  rest = rest || 0;
  if (this.carryCapacity) {
    return this.carry[resource] <= rest;
  }
  if (this.energyCapacity) {
    return this.energy <= rest;
  }
  if (this.storeCapacity) {
    return this.store[resource] <= rest;
  }
};

RoomObject.prototype.isFull = function (percentage) {
  percentage = percentage || 1;
  if (this.carryCapacity) {
    return (_.sum(this.carry) / this.carryCapacity) >= percentage;
  }
  if (this.energyCapacity) {
    return (this.energy / this.energyCapacity) >= percentage;
  }
  if (this.storeCapacity) {
    return (_.sum(this.store) / this.storeCapacity) >= percentage;
  }
};
