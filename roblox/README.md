# Roblox Infinity Field Script

`InfinityField.server.lua` is a Roblox Studio server-side example for a “무하한” defensive field: nearby physics objects slow down as they approach a player and are held outside a small stop radius.

## How to use

1. In Roblox Studio, create a `Script` in `ServerScriptService`.
2. Paste the contents of `InfinityField.server.lua` into that script.
3. Press Play and move an unanchored part/projectile toward a player.
4. Optional: if you only want selected objects affected, set `ONLY_AFFECT_TAGGED_OBJECTS = true` and tag those parts with `InfinityAffected` using `CollectionService`.

## Tuning values

- `FIELD_RADIUS`: distance where slowing begins.
- `STOP_RADIUS`: minimum distance the object is held from the player.
- `MAX_FORCE`: raise this if heavy objects are not being slowed or stopped.
- `FIELD_OWNER_ATTRIBUTE`: set a player's `InfinityEnabled` attribute to `false` to disable the field for that player.

## Notes

- Anchored parts and character parts are ignored.
- This is a physics-based gameplay script, not an exact recreation of any copyrighted character ability.
