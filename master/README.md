# Features

## Creeps

### Spawning

- The room controller runs the spawn script only every 10 ticks to save
  CPU usage
- Every room use the highest 'room.spawn.level-*' which fulfill the
  conditions to determine how much and which creeps must be available
- Every role can have also dependencies must be fulfill to be
  needed (e.g. a builder is only needed if there are construction sites)
- If there is a missing creep, one of the spawn structures will build it

### Controlling

- A creep have a role which describes the chain of activities to do
- A creep have one activity which he currently do. This activity runs
  one time per tick. If its finished (activity script returns true) it
  defines some scenarios to decide the next activity. The role describes 
  which is the next actual activity to do in the different scenarios
  
### Activities

- buildConstructionSite: search the closest construction site, move to 
  and build it
  - next if there is no more construction site
  - harvest if energy of creep is empty
- buildSpawn: search a construction site which is a spawn, move to and 
  build it
  - next if there is no more construction site which is a spawn
  - harvest if energy of creep is nearly empty
- harvestEnergyStorage: search the next storage with energy available,
  move to it and draw energy
  - next if the energy of the creep is full
  - harvest if there is no more energy in a storage
- harvestSource: search a random source (and save it forever in the 
  creep memory to split the creeps more or less to all sources), move to 
  it and harvest 
  - next if the energy of the creep is full
  - harvest if there is no more energy in the source
- transferEnergyStorage: search the next storage with store capacity 
  available, move to it and transfer energy 
  - next if there is no more capacity in a storage available
  - harvest if energy of creep is empty
- transferStructure: search the next structure (spawn/extension > tower) 
  with capacity available, move to it and transfer energy 
  - next if there is no more capacity in a structure available
  - harvest if energy of creep is empty
- upgradeController: Move to the room controller and upgrade it
  - next after the controller is upgraded one time
  - harvest if energy of creep is empty
  
## Towers

- A tower decides in every tick the best thing to do in this order:
  - Attack a hostile creep
  - Repair a structure (only if energy > 50%)
  - Repair a wall (only if energy > 75%)
  
## Memory

- The memory will be cleaned up every 100 ticks from old creep and spawn
  data

# ToDos

- Add "claim" functionality:
  - Activity "claim" which selects an adjoining room with a neutral
    controller and move to / claim it
  - Role "claim" with condition only to build if the gcl is higher as
    the amount of own rooms including to count the creeps which are
    already on the way to claim and only if there is an adjoining room
    with a neutral controller
  - Add the role to all room spawn level which have enough energy to
    build a creep with "claim" and "move" body parts

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
