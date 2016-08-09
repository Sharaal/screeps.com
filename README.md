# ToDos:

- Add "claim" functionality:
  - Activity "claim" which selects an adjoining room with a neutral
    controller and move to / claim it
  - Role "claim" with condition only to build if the gcl is higher as
    the amount of own rooms including to count the creeps which are
    already on the way to claim and only if there is an adjoining room
    with a neutral controller
  - Add the role to all room spawn level which have enough energy to
    build a creep with "claim" and "move" body parts

# Ideas:

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
