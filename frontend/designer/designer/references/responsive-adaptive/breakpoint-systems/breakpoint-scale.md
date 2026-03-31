# Breakpoint Scale

**Keywords:** Breakpoints, Media Queries, Responsive Scale, Viewports.

**Description:**
A standard set of width thresholds used to adapt layouts across different device sizes. Consistent breakpoints ensure predictable behavior.

## Usage

### 1. Tailwind Default Scale
The most common breakpoint system.

```css
/*
  sm: 640px  (Mobile Landscape / Tablets)
  md: 768px  (Tablets)
  lg: 1024px (Laptops)
  xl: 1280px (Desktops)
  2xl: 1536px (Large Screens)
*/

@media (min-width: 640px) { ... }
@media (min-width: 768px) { ... }
@media (min-width: 1024px) { ... }
@media (min-width: 1280px) { ... }
@media (min-width: 1536px) { ... }
```

### 2. Custom Broad Scale
For simpler projects needing fewer distinct states.

```css
/* Small */
@media (max-width: 600px) { ... }

/* Medium */
@media (min-width: 601px) and (max-width: 1200px) { ... }

/* Large */
@media (min-width: 1201px) { ... }
```
