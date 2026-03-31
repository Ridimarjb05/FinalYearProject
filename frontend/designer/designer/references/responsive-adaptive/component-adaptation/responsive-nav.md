# Responsive Nav

**Keywords:** Navigation Bar, Hamburger Menu, Dropdowns, Mega Menu.

**Description:**
Navigational structures that morph entire patterns between breakpoints (e.g., Row of links → Hamburger menu → Bottom bar).

## Usage

### 1. Desktop to Hamburger
The standard pattern.

```css
/* Desktop */
.nav-links { display: flex; gap: 2rem; }
.hamburger { display: none; }

/* Mobile */
@media (max-width: 768px) {
  .nav-links { display: none; } /* Show in drawer instead */
  .hamburger { display: block; }
}
```

### 2. Desktop to Bottom Bar
Popular for mobile apps.

```css
@media (max-width: 600px) {
  .nav {
    position: fixed;
    bottom: 0;
    width: 100%;
    /* Icons arranged horizontally */
  }
}
```
