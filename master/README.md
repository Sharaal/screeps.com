# Features


## Creeps


### Spawning

- The room controller runs the spawn script only every 10 ticks to save
  CPU usage
  
- Every role defines the amount and the body of the needed creeps for 
  every room
  
- If there is a missing creep, one of the spawn structures will build it


### Controlling

- A creep have a role which describes the chain of activities to do

- A creep have one activity which he currently do. This activity runs
  one time per tick. If a run returns the name of the next activity it
  will set to the creep
  
  
#### Roles

- carrier: Pick up energy or draw it from the energy container/storage 
  to transfer it to a spawn, extension, tower or energy storage

- flagClaimer: Move to the "claim" flag and claim the room. Only one 
  will be built if there is a flag 

- rescuer: Pick up energy, draw it from the energy container/storage or
  harvest it from a source to rescue the controller or transfer it to a 
  spawn, extension or tower

- sourcer: Harvest the source, transfer the energy to a near energy 
  storage/container or drop it

- spawnBuilder: Draw energy from the energy storage, search and build 
  the spawn in a room besides the own. To get new energy the creep will 
  use dropped energy or harvest sources in the room of the spawn

- worker: Draw energy from the energy storage/container and rescue the
  controller, build a construction site or upgrade the controller
  
  
#### Activities

- buildConstructionSite: Search the closest construction site, move to 
  and build it (if the creep stays on a harvest position of a source, it
  will first go away from it bevor start to build)
  - next if there is no more construction site
  - empty if energy of creep is empty
  
- buildSpawn: Search a construction site which is a spawn, move to and 
  build it
  - next if there is no more construction site which is a spawn
  - nearlyEmpty if energy of creep is nearly empty
  
- dropEnergy: Drop all the energy of the creep
  - empty after dropping the energy
  
- flagClaimNeutralController: Search the flag named "claim" move to it
  and claim the controller of that room
  - next if the controller is claimed
  
- harvestSource: Search a random source (and save it forever in the 
  creep memory to split the creeps depending on the amount of creeps and 
  harvest positions), move to it and harvest 
  - next if the energy of the creep is full
  - empty if there is no more energy in the source
  
- pickupDroppedEnergy: Search the next dropped energy, move to it and 
  pick it up
  - next if the energy of the creep is full
  - empty if there is no more dropped energy
  
- suicide: The creep suicide
  
- transferEnergyContainer: Search the next container with store capacity 
  available, move to it and transfer energy
  - next if there is no more capacity in a container available
  - empty if energy of creep is empty
  - opts.range if only containers in a specific range should be used 
  
- transferEnergyStorage: Search the next storage with store capacity 
  available, move to it and transfer energy
  - next if there is no more capacity in a storage available
  - empty if energy of creep is empty
  - opts.range if only storages in a specific range should be used 
  
- transferStructure: Search the next structure (spawn/extension > tower) 
  with capacity available, move to it and transfer energy 
  - next if there is no more capacity in a structure available
  - empty if energy of creep is empty
  
- upgradeController: Move to the room controller and upgrade it (if the 
  creep stays on a harvest position of a source, it will first go away 
  from it bevor start to upgrade)
  - next after the controller is upgraded one time
  - empty if energy of creep is empty
  
- withdrawEnergyContainer: Search the next container with energy 
  available, move to it and draw energy
  - next if the energy of the creep is full
  - empty if there is no more energy in a container
  
- withdrawEnergyStorage: Search the next storage with energy available,
  move to it and draw energy
  - next if the energy of the creep is full
  - empty if there is no more energy in a storage
  
  
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
  
- If there is a missing structures, depending on the controller level 
  and the amount of sources, they will be outputted in the console

  
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
  
- Automatically "claim" functionality:
  - Activity "claim" which selects an adjoining room with a neutral
    controller and move to / claim it
  - Role "claim" with condition only to build if the gcl is higher as
    the amount of own rooms including to count the creeps which are
    already on the way to claim and only if there is an adjoining room
    with a neutral controller
  - Add the role to all room spawn level which have enough energy to
    build a creep with "claim" and "move" body parts
