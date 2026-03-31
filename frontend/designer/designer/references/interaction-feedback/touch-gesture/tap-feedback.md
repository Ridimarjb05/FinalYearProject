# Tap Feedback

**Description:**
Visual confirmation of a touch event on mobile/touch interfaces.

**Key Principles:**
- **Responsiveness**: Must be instant (solve the 300ms delay issue).
- **State**: Differentiate between a "tap" (click) and a "scroll" start.

**Common Patterns:**
- **Highlight Color**: Webkit's standard grey overlay on tap.
- **Active State**: CSS `:active` styling applies to touch start.
