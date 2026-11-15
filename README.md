# Territory Painter

A JavaScript-based, two-player browser arcade game where players race to paint the grid and cut off their opponent.

## Play

**Game:** https://farazshuja.github.io/territory-painter/

- Player 1 moves with **W A S D**; Player 2 uses the **arrow keys**.
- Xbox controllers move with the left stick or D-pad. Use **Menu** for settings and **View** to restart.
- Paint unclaimed tiles for 10 points. Opponent territory blocks movement unless you have a Golden Apple.
- Enclose an area with your paint (arena walls count as a boundary) and it auto-fills with your color — rival tiles inside are captured too.
- Junk food slows your **opponent** down and repeated pickups stack; fresh food, shoes, and a skateboard boost speed, also stacking. A snowflake freezes your opponent.
- The **NEXT** strip in the top HUD previews the next 10 incoming pickups.
- Press **R** to restart or **M** to toggle sound.

## Development

Open `index.html` in a modern browser. This static game has no build step. Pushing to `master` deploys the root site via `.github/workflows/pages.yml`.
