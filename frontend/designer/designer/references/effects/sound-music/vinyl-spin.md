# Vinyl Spin

**Keywords:** Record, Retro, Music, Player, Turn.

**Description:**
A record disc rotating at constant speed (33/45 RPM).

## Usage

### 1. CSS Rotation
The most basic rotation animation.
Important detail: The "label" in the center spins, but highlight reflections should ideally stay static (requires shiny overlay layer).

```css
.record {
  animation: spin 3s linear infinite;
}
.highlight {
  position: absolute;
  /* static reflection texture */
}
```
