# Modal Scrolling

## Content Overflow
When modal content exceeds the viewport height.

### 1. Body Scroll (Modal Locks)
- The page body `<body>` should have `overflow: hidden` applied when the modal is open to prevent the background page from scrolling.
- Only the modal container should scroll.

### 2. Internal Scroll (Scrollable Body)
- **Header & Footer Fixed**: The header and footer remain pinned to the top and bottom of the modal.
- **Body Scrolls**: Only the middle content area scrolls.
- **Visuals**: Add dividers (border or shadow) that appear only when scrolling indicates overflowing content.

### 3. Basic Page Scroll
- The entire modal container scrolls within the viewport.
- Clicking outside to close can be harder if the modal is taller than the screen.
- **Recommendation**: Avoid this for complex web apps; prefer Internal Scroll or limiting modal height.
