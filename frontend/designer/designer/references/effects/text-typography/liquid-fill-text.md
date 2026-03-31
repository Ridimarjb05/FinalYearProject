# Liquid Fill Text

**Keywords:** Wave fill, Water text, Container fill, Progress indicator.

**Description:**
Text acts as a mask / container, and a "liquid" wave animation fills it from bottom to top. Often used for loading states or "charging up" headlines.

## Usage

### 1. `background-clip: text` + Animation
The background image itself moves up.

```css
.liquid-text {
  font-size: 6rem;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.1); /* Ghost text */
  background-image: linear-gradient(to top, #0ea5e9 50%, transparent 50%);
  background-size: 100% 200%;
  background-position: 0% 0%; /* Start at top (transparent part) */
  -webkit-background-clip: text;
  background-clip: text;
  position: relative;
  /* Not fully shifting background-position because straight line is boring. 
     Usually used with a "wave" SVG overlay. */
}

/* Better approach: CSS "Wave" */
.wave-text {
  position: relative;
  color: #0ea5e9; /* Filled color */
  overflow: hidden;
}
.wave-text::before {
    content: attr(data-text);
    position: absolute;
    left: 0;
    top: 0;
    color: white; /* Empty color */
    overflow: hidden;
    width: 100%;
    height: 100%;
    /* Clip path wave animation */
    animation: fill-up 5s ease-in-out infinite;
    clip-path: polygon(0 50%, 100% 50%, 100% 100%, 0% 100%);
    /* Real sine wave requires SVG 'clipPath' or mask */
}
```

### 2. SVG Text Mask (Best Quality)
Using an animated path inside an SVG definition used as a mask.

```html
<svg viewBox="0 0 500 100">
  <defs>
    <mask id="text-mask">
      <text x="50%" y="50%" dy=".35em" text-anchor="middle" fill="white" font-size="60" font-weight="bold">LIQUID</text>
    </mask>
  </defs>
  
  <!-- Background (The "Empty" state) -->
  <rect width="100%" height="100%" fill="#333" mask="url(#text-mask)" />
  
  <!-- The Liquid Wave -->
  <rect width="100%" height="100%" fill="#0ea5e9" mask="url(#text-mask)">
     <animate attributeName="y" from="100" to="0" dur="3s" fill="freeze" />
  </rect>
  <!-- NOTE: For a wavy edge, animate a <path> wave moving up instead of a <rect> -->
</svg>
```
