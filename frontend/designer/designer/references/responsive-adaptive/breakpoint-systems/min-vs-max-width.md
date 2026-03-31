# Min vs Max Width

**Keywords:** Mobile-First, Desktop-First, Responsive Strategy, Media Queries.

**Description:**
The strategy of defining styles. `min-width` (mobile-first) starts with mobile styles and adds complexity for larger screens. `max-width` (desktop-first) starts with desktop and simplifies for smaller screens.

## Usage

### 1. Mobile-First (Recommended)
Uses `min-width`. Browser defaults to mobile styles, making it faster on mobile devices.

```css
/* Base (Mobile) */
.card { padding: 1rem; }

/* Tablet */
@media (min-width: 768px) {
  .card { padding: 2rem; }
}

/* Desktop */
@media (min-width: 1024px) {
  .card { padding: 3rem; }
}
```

### 2. Desktop-First
Uses `max-width`. Good for retrofitting desktop-only sites.

```css
/* Base (Desktop) */
.sidebar { display: block; }

/* Mobile */
@media (max-width: 767px) {
  .sidebar { display: none; }
}
```
