# Territory Painter - 2-Player Grid Battle Game

A JavaScript-based 2-player browser arcade game where players race to paint the grid while cutting off their opponent.

## How to Play

Open [index.html](file:///d:/fatima/fireman/index.html) in any modern web browser.

### Rules & Mechanics
- **Characters:** Two 20×20 px boxes.
  - **Player 1 (Light Blue):** Starts in the **Top-Right** corner.
  - **Player 2 (Light Purple):** Starts in the **Bottom-Left** corner.
- **Movement:** Move in 4 directions (Up, Down, Left, Right). Each move advances by 20 pixels. **Holding down a key allows continuous, fluid movement** across the grid without having to repeatedly tap. Single taps still execute precise single-step moves.
- **Painting:** Every move over an unpainted square paints that area in the player's color.
- **Points:** Players receive **+10 points** for each newly painted tile. The more territory you claim, the higher your score.
- **Walls & Obstacles:** **A player cannot step onto or cross any tile painted by the other player!** (Players can re-traverse their own painted territory).
- **Dynamic Drops & Power-ups:** Consumable items spawn at random times and locations on the board and remain for 8 seconds before disappearing (flickering in their last 2 seconds):
  - 👟 **Speed Shoes:** Boosts movement speed by +70% for 6 seconds.
  - 🧪 **Haste Potion:** Turbo speed burst (>2x speed) for 5 seconds.
  - ☕ **Energy Coffee:** +50% speed increase for 6 seconds.
  - 🍔 **Heavy Burger:** Food coma debuff! Slows movement down by ~60% for 5 seconds.
  - 🍏 **Golden Apple (Rare):** 🌟 **Territory Breach!** For **3 seconds**, grants complete immunity to opponent walls, allowing the player to enter, conquer, and steal the other player's painted territory!
- **Maximized Playfield:** The painting arena automatically fills the entire browser window/viewport with 20×20 px tiles for the largest possible playing surface.
- **Minimalist Floating HUD:** Non-intrusive floating pills display essential scores, coverage %, controls hints, and active power-up timers over the corners without taking up any play space.
- **Match Start / Restart Countdown:** When a match begins or restarts, a dynamic **3 → 2 → 1 → GO!** countdown sequence displays over the arena. Controls remain locked until countdown finishes, ensuring a fair simultaneous start for both players.
- **Game Over:** The match ends once the entire grid is painted (or if both players are completely blocked). The player with the highest score / territory wins!

### Controls

| Player | Keys | On-Screen | Color | Start Position |
|---|---|---|---|---|
| **Player 1** | <kbd>W</kbd> <kbd>A</kbd> <kbd>S</kbd> <kbd>D</kbd> | Blue D-Pad | Light Blue (`#7dd3fc`) | Top-Right |
| **Player 2** | <kbd>▲</kbd> <kbd>▼</kbd> <kbd>◄</kbd> <kbd>►</kbd> | Purple D-Pad | Light Purple (`#d8b4fe`) | Bottom-Left |

- Press <kbd>R</kbd> to restart match anytime.
- Press <kbd>M</kbd> to toggle audio effects (Web Audio synthesizer).
- Select different grid dimensions (15×15, 20×20, 25×25, 30×30) from the dropdown.
- Adjust movement speed (Relaxed, Normal, Fast, Turbo) using the speed selector.

## Files
- [index.html](file:///d:/fatima/fireman/index.html) - Main markup, scoreboard, arena canvas, and modals
- [style.css](file:///d:/fatima/fireman/style.css) - Modern arcade UI styling, neon glows, and responsive layout
- [game.js](file:///d:/fatima/fireman/game.js) - Complete game engine, grid collision system, audio synth, and particle effects
