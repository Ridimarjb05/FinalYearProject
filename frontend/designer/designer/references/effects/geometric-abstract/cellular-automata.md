# Cellular Automata

**Keywords:** Game of Life, Evolution, Grid, Simulation, Living.

**Description:**
A grid of cells that evolve based on the state of their neighbors (Conway's Game of Life).

## Usage

### 1. JS / Canvas
Double-buffered grid (current state, next state).
Apply rules:
- Live cell < 2 neighbors: dies.
- Live cell 2 or 3 neighbors: lives.
- Live cell > 3 neighbors: dies.
- Dead cell == 3 neighbors: born.

Render live cells as white squares. Alternatively, render the "trail" or "history" of cells for a fading effect.
