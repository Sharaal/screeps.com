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

- Controller < 4: 
    - sourceAllrounder: Harvest a source and use the energy to transfer
      it to a spawn, extension or tower, build a structure or upgrade
      the controller
    - sourceUpgrader: Harvest a source and upgrade the controller
    
- Controller >= 4 with an energy storage:
    - flagClaimer: Move to the "claim" flag and claim the room
    - storageBuilder: Draw energy from the energy storage and build a
      structure
    - storageCarrier: Pick up energy or draw it from the energy storage
      to transfer it to a spawn, extension, tower or energy storage
    - storageSourcer: Harvest the source and drop the energy
    - storageSpawnBuilder: Draw energy from the energy storage, keep it
      in mind and build the spawn in a room besides the own
    - storageUpgrader: Draw energy from the energy storage and upgrade
      the controller
  
  
#### Activities

- buildConstructionSite: Search the closest construction site, move to 
  and build it
  - next if there is no more construction site
  - harvest if energy of creep is empty
  
- buildSpawn: Search a construction site which is a spawn, move to and 
  build it
  - next if there is no more construction site which is a spawn
  - harvest if energy of creep is nearly empty
  
- dropEnergy: Drop all the energy of the creep
  - harvest after dropping the energy
  
- flagClaimNeutralController: Search the flag named "claim" move to it
  and claim the controller of that room
  - next if the controller is claimed
  
- harvestDroppedEnergy: Search the next dropped energy, move to it and 
  pick it up
  - next if the energy of the creep is full
  - harvest if there is no more dropped energy
  
- harvestEnergyStorage: Search the next storage with energy available,
  move to it and draw energy
  - next if the energy of the creep is full
  - harvest if there is no more energy in a storage
  
- harvestHomeEnergyStorage: Search the next storage with energy 
  available, move to it, draw energy and keep it in memory
  - next if the energy of the creep is full
  - harvest if there is no storage
  
- harvestSource: Search a random source (and save it forever in the 
  creep memory to split the creeps more or less to all sources), move to 
  it and harvest 
  - next if the energy of the creep is full
  - harvest if there is no more energy in the source
  
- transferEnergyStorage: Search the next storage with store capacity 
  available, move to it and transfer energy 
  - next if there is no more capacity in a storage available
  - harvest if energy of creep is empty
  
- transferStructure: Search the next structure (spawn/extension > tower) 
  with capacity available, move to it and transfer energy 
  - next if there is no more capacity in a structure available
  - harvest if energy of creep is empty
  
- upgradeController: Move to the room controller and upgrade it
  - next after the controller is upgraded one time
  - harvest if energy of creep is empty
  
  
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
  
  
# TODOs
 
- Add container to "transferEnergyStorage" and define activity to draw
  energy from it for the carrier

- Limit the building and distribution of sourcer also by the amount of 
  available positions besides the sources 
  
- Never build a structure from the position directly beside a source to
  prevent blocking the harvesting

  
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
