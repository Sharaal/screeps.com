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

- flagAttacker: Will be built in the room with the "attack spawn" flat, 
  move to the "attack target" flag and attack hostile towers, creeps,
  spawns and structures
  
- flagClaimer: Will be built in the room with the "claim spawn" flat, 
  move to the "claim target" flag and claim the neutral controller

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

- attackHostile: Search and attack the closest hostile tower, creep, 
  spawn or structure 
  - next if there is no more hostile target

- buildConstructionSite: Search the closest construction site, move to 
  and build it (if the creep stays on a harvest position of a source, it
  will first go away from it bevor start to build)
  - next if there is no more construction site
  - empty if energy of creep is empty
  
- buildSpawn: Search a construction site which is a spawn, move to and 
  build it
  - next if there is no more construction site which is a spawn
  - nearlyEmpty if energy of creep is nearly empty
  
- claimController: claim the neutral controller in the room
  - next if the controller is claimed
  
- dropEnergy: Drop all the energy of the creep
  - empty after dropping the energy
  
- harvestSource: Search a random source (and save it forever in the 
  creep memory to split the creeps depending on the amount of creeps and 
  harvest positions), move to it and harvest 
  - full if the energy of the creep is full
  - next if there is no more energy in the source
  
- moveToFlag: Move into the range of the flag with the given name
  - next if the creep is in range of the flag
  
- pickupDroppedEnergy: Search the next dropped energy, move to it and 
  pick it up
  - full if the energy of the creep is full
  - next if there is no more dropped energy
  
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
  - full if the energy of the creep is full
  - next if there is no more energy in a container
  
- withdrawEnergyStorage: Search the next storage with energy available,
  move to it and draw energy
  - full if the energy of the creep is full
  - next if there is no more energy in a storage
  
  
### Claiming

1. Set a flag named "claim spawn" in the room which should built the
   flagClaimer 
   
2. Set a flag named "claim target" in the room which should 
   be claimed 
   
3. After claim the neutral controller of the room, create a spawn and a 
   room besides which is able to build a spawnBuilder will build it
  
  
### Attacking

1. Set a flag named "attack spawn" in the room which should built the
   flagAttacker 

2. Set a flag named "attack target" in the room which 
   should be attacked
   
  
## Towers

- A tower decides in every tick the best thing to do in this order:
  - Attack a hostile creep
  - Repair a structure (only if tower energy >= 50%)
  - Repair a rampart/wall (only if tower energy >= 75% and storage 
    energy >= 75%)
  
  
## Structures

- The room controller runs the build script only every 10 ticks to save
  CPU usage
  
- If there is a missing structures, depending on the controller level 
  and the amount of sources, they will be outputted in the console
