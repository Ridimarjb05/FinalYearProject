# Frosted Panels

**Keywords:** Ice, Matte, Diffusion.

**Description:**
Heavier blur and more opaque whiteness/darkness to look like thick frosted plastic or ice.

## Usage

### 1. High Blur
Creating a "privacy glass" feel.

```css
.frosted-panel {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(20px) saturate(180%);
  /* Saturate boosts colors coming through */
}
```
