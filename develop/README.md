# Features


## Creeps


### Spawning

- The room controller runs the spawn script only every 10 ticks to save
  CPU usage
  
- Every room use the highest 'room.spawn.level-*' which fulfill the
  conditions to determine how much and which creeps are needed
  
- Every role can have also dependencies must be fulfill to be needed 
  (e.g. a builder is only needed if there are construction sites)
  
- If there is a missing creep, one of the spawn structures will build it


### Controlling

- A creep have a role which describes the chain of activities to do

- A creep have one activity which he currently do. This activity runs
  one time per tick. If its finished (activity script returns true) it
  defines some scenarios to decide the next activity. The role describes 
  which is the next actual activity to do in the different scenarios
  
  
#### Roles

- Controller <= 2: 
    - sourceAllrounder: Harvest a source and use the energy to transfer
      it to a spawn, extension or tower, build a structure or upgrade
      the controller
      - amount: Harvest positions on the room * 2 
    - sourceUpgrader: Harvest a source and upgrade the controller
      - amount: 1
    
- Controller <= 4 with an energy container:
    - storageBuilder: Draw energy from the energy container and build a 
      construction site
      - amount: 1 (if there is a construction site)
    - storageCarrier: Pick up energy or draw it from the energy 
      container to transfer it to a spawn, extension or tower
      - amount: Sources in the room * 2 
    - storageSourcer: Harvest the source, transfer the energy to a near 
      energy container or drop it
      - amount: Depends on the amount of sources and harvest source 
      positions
    - storageUpgrader: Draw energy from the energy container and upgrade
      the controller
      - amount: 1
    
- Controller >= 4 with an energy storage:
    - flagClaimer: Move to the "claim" flag and claim the room. Only one 
      will be built if there is a flag 
      - amount: 1 (if there is a "claim" flag)
    - storageBuilder: Draw energy from the energy storage/container and 
      build a construction site
      - amount: 1 (if there is a construction site)
    - storageCarrier: Pick up energy or draw it from the energy 
      storage/container to transfer it to a spawn, extension, tower or 
      energy storage
      - amount: Sources in the room * 2 
    - storageSourcer: Harvest the source, transfer the energy to a near 
      energy storage/container or drop it
      - amount: Sources in the room * 1 
    - storageSpawnBuilder: Draw energy from the energy storage, keep it
      in mind and build the spawn in a room besides the own. To harvest
      new energy the creep will use local dropped energy or harvest 
      local sources
      - amount: 1 (if there is a spawn to built)
    - storageUpgrader: Draw energy from the energy storage/container and 
      upgrade the controller
      - amount: 1
  
  
#### Activities

- buildConstructionSite: Search the closest construction site, move to 
  and build it (if the creep stays on a harvest position of a source, it
  will first go away from it bevor start to build)
  - next if there is no more construction site
  - needEnergy if energy of creep is empty
  
- buildSpawn: Search a construction site which is a spawn, move to and 
  build it
  - next if there is no more construction site which is a spawn
  - needEnergy if energy of creep is nearly empty
  
- dropEnergy: Drop all the energy of the creep
  - needEnergy after dropping the energy
  
- flagClaimNeutralController: Search the flag named "claim" move to it
  and claim the controller of that room
  - next if the controller is claimed
  
- harvestSource: Search a random source (and save it forever in the 
  creep memory to split the creeps depending on the amount of creeps and 
  harvest positions), move to it and harvest 
  - next if the energy of the creep is full
  - needEnergy if there is no more energy in the source
  
- pickupDroppedEnergy: Search the next dropped energy, move to it and 
  pick it up
  - next if the energy of the creep is full
  - needEnergy if there is no more dropped energy
  
- suicide: The creep suicide
  
- transferEnergyContainer: Search the next container with store capacity 
  available, move to it and transfer energy
  - next if there is no more capacity in a container available
  - needEnergy if energy of creep is empty
  - opts.range if only containers in a specific range should be used 
  
- transferEnergyStorage: Search the next storage with store capacity 
  available, move to it and transfer energy
  - next if there is no more capacity in a storage available
  - needEnergy if energy of creep is empty
  - opts.range if only storages in a specific range should be used 
  
- transferStructure: Search the next structure (spawn/extension > tower) 
  with capacity available, move to it and transfer energy 
  - next if there is no more capacity in a structure available
  - needEnergy if energy of creep is empty
  
- upgradeController: Move to the room controller and upgrade it (if the 
  creep stays on a harvest position of a source, it will first go away 
  from it bevor start to upgrade)
  - next after the controller is upgraded one time
  - needEnergy if energy of creep is empty
  
- withdrawEnergyContainer: Search the next container with energy 
  available, move to it and draw energy
  - next if the energy of the creep is full
  - needEnergy if there is no more energy in a container
  
- withdrawEnergyStorage: Search the next storage with energy available,
  move to it and draw energy
  - next if the energy of the creep is full
  - needEnergy if there is no more energy in a storage
  
  
### Claiming

1. Set a flag named "claim" in a neutral room besides an own room able
   to build a flagClaimer
   
2. After claim the room create a spawn in that room besides an own room 
   able to build a storageSpawnBuilder
  
## Towers

- A tower decides in every tick the best thing to do in this order:
  - Attack a hostile creep
  - Repair a structure (only if energy > 50%)
  - Repair a wall (only if energy > 75%)
  
## Structures

- The room controller runs the build script only every 10 ticks to save
  CPU usage
  
- Every room use the highest 'room.build.level-*' which fulfill the
  conditions to determine how much and which structures are needed
  
- If there is a missing structures, there will be outputted in the 
  console

  
# Ideas

- Add "renew" functionality:
  - Finish implementation of the "renew" activity, run it for creeps, 
    which are currently besides the spawn
  - Creeps which can't be rebuild (body larger as the room can build)
    should go always to the spawn to "renew" 

- Automatically building structures possible?
  - Find out which structures are buildable (extensions, towers, 
    storage) depending on the room controller level
  - Find out which positions on the map are good to use (extensions and
    towers near to the source, storage directly beside the source)
  - Build roads between the buildings

- Automatically determine if its time to concentrate on leveling up the 
  controller and if yes, build more worker to do it?
  - If there is nothing anymore to build
  - If there is nothing anymore to transfer energy (tower)
  - Maybe only if the storage have a minimum of energy
  
- Automatically "claim" functionality:
  - Activity "claim" which selects an adjoining room with a neutral
    controller and move to / claim it
  - Role "claim" with condition only to build if the gcl is higher as
    the amount of own rooms including to count the creeps which are
    already on the way to claim and only if there is an adjoining room
    with a neutral controller
  - Add the role to all room spawn level which have enough energy to
    build a creep with "claim" and "move" body parts
