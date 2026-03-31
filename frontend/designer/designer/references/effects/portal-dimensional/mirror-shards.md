# Mirror Shards

**Keywords:** Reflection, Broken, Floating, Glass, Fragments.

**Description:**
Angular pieces of "glass" floating in space, each reflecting the scene (or a different scene) from a different angle.

## Usage

### 1. CSS 3D Transforms
Multiple `div`s with `clip-path: polygon(...)` and specific rotation.
Inside each shard, use `background-attachment: fixed` to simulate a reflection that stays still as the shard moves (simple reflection hack).

```css
.shard {
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  background: url('scene.jpg') fixed;
  animation: float 3s ease-in-out infinite;
}
```
