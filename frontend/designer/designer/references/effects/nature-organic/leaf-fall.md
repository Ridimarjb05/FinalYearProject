# Leaf Fall

**Keywords:** Autumn, Tree, Wind, Sway, Tumbling.

**Description:**
Leaves falling from the top, swaying side-to-side and rotating as they fall.

## Usage

### 1. CSS Keyframes
Combine vertical movement with horizontal sine-wave movement and 3D rotation.

```css
@keyframes leaf-fall {
  0% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(20px, 100px) rotate(45deg); }
  50% { transform: translate(0, 200px) rotate(90deg); }
  75% { transform: translate(-20px, 300px) rotate(135deg); }
  100% { transform: translate(0, 400px) rotate(180deg); }
}
```
