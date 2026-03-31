# Invisibility Fade

**Keywords:** Stealth, Vanish, Hide, Distortion, Predator.

**Description:**
The character becomes transparent, but leaves a slight refractive "shimmer" or outline.

## Usage

### 1. CSS Opacity & Filter
Animate `opacity` to 0.
Simultaneously animate `filter: blur(2px)` or `backdrop-filter: blur(5px)`.

### 2. Shader Refraction
Render the scene behind the character to a texture.
Distort the texture using the character's normal map.
