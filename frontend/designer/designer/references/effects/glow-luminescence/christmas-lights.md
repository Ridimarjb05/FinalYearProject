# Christmas Lights

**Keywords:** String Lights, Festive, Holiday, Bulb, Fairy Lights.

**Description:**
A string of multi-colored glowing dots that blink or chase.

## Usage

### 1. CSS Border Images (Dashed)
A clever hack using dashed borders where each dash is a "light".

### 2. Flex Row with Children
A row of small circles with staggered animation delays.

```css
.string-light {
   background: red;
   animation: flash-red 1s infinite;
}
.string-light:nth-child(even) {
   background: green;
   animation: flash-green 1s infinite;
   animation-delay: 0.5s;
}
```
