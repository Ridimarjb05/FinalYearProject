# Sidebar Collapse

**Keywords:** Drawer, Hamburger Menu, Off-canvas, Navigation.

**Description:**
Transforming a permanent sidebar navigation into a collapsible drawer or hamburger menu on smaller screens to save horizontal space.

## Usage

### 1. Off-Canvas CSS
Moving the sidebar out of the viewport.

```css
.sidebar {
  position: fixed;
  left: -250px; /* Hide off-screen */
  top: 0;
  width: 250px;
  height: 100%;
  transition: transform 0.3s ease;
}

.sidebar.is-open {
  transform: translateX(250px);
}

@media (min-width: 1024px) {
  .sidebar {
    position: static; /* Permanent on desktop */
    width: 20%;
  }
}
```
