# Angle Divider

## Diagonal Section Breaks
Dynamic, modern, and energetic transitions.

### Implementation
- **CSS Clip-path**: `clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);`
- **Skew**: Transforming a container with `skew-y` (requires compensating for the content skew).
- **SVG**: Triangular SVG shape at the section boundary.

### Usage
- **Direction**:
  - Down-Right: Leads the eye naturally in LTR reading.
  - Alternating: Creates a "zig-zag" flow down the page.
- **Steepness**: subtle (2-5 degrees) is usually sufficient. heavy angles can make content layout difficult.
