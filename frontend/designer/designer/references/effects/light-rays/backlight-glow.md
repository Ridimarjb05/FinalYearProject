# Backlight Glow

**Keywords:** Rim Light, Silhouette, Halo, Eclipse.

**Description:**
Illumination coming from behind an object, creating a glowing outline or "rim light" while leaving the center darker.

## Usage

### 1. CSS Box Shadow / Drop Shadow
Use a colored shadow with no offset.

```css
.backlight {
  filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.8));
}
/* OR */
.box-backlight {
  box-shadow: 0 0 20px 5px rgba(255, 200, 100, 0.6);
}
```
