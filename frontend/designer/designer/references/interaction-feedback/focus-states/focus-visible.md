# Focus Visible

**Description:**
Showing focus styles *only* when the user is navigating via keyboard, while hiding them for mouse clicks. This prevents the "ugly" focus ring from appearing when a user simply clicks a button.

**Key Principles:**
- **User Intent**: Differentiates between pointer interaction (mouse/touch) and keyboard navigation.
- **CSS Selector**: Use the `:focus-visible` pseudo-class (modern standard) instead of just `:focus`.

**Common Patterns:**
- **Buttons**: Clicked buttons show `active` state but no focus ring. Tabbed-to buttons show a focus ring.
- **Text Inputs**: Usually *always* show focus state regardless of input method, because the user needs to know they can type.
