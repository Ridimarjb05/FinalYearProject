# Eclipse Glow

**Keywords:** Corona, Shadow, Ring of Fire, Alignment.

**Description:**
A dark circle obscuring a bright light source, resulting in a glowing rim or corona effect.

## Usage

### 1. CSS Box Shadow
Use multiple box-shadows to create the glow, and an inset shadow for inner depth.

```css
.eclipse {
  width: 150px;
  height: 150px;
  background: black;
  border-radius: 50%;
  box-shadow: 
    0 0 10px 2px rgba(255, 200, 100, 0.5), /* Inner Glow */
    0 0 30px 10px rgba(255, 100, 0, 0.3), /* Outer Corona */
    0 0 60px 20px rgba(255, 50, 0, 0.1);  /* Haze */
}
```
