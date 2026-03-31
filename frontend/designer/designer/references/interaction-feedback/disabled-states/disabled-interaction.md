# Disabled Interaction

**Description:**
Technically preventing interaction using CSS (`pointer-events: none`) or JavaScript (`disabled` attribute). This ensures that even if the visual cues are missed, the action cannot be triggered.

**Key Principles:**
- **Security**: Don't rely solely on CSS for critical disable states (users can inspect element). Use HTML attributes (`disabled`) where possible.
- **Feedback**: Sometimes it's better to *allow* the click but show an error message or tooltip explaining *why* it's disabled, rather than silently blocking it.

**Common Patterns:**
- **CSS Pointer Events**: `pointer-events: none` makes the element click-through.
- **HTML Attribute**: `<button disabled>` is the semantic standard.
