# Press Duration

**Description:**
The length of time to show the pressed state. This is crucial for making the interface feel responsive but not "sticky".

**Key Principles:**
- **Instant On**: The pressed state should trigger immediately on `mousedown` or `touchstart` (0ms delay).
- **Fast Off**: On release (`mouseup` or `touchend`), the state should revert quickly but with a very brief transition (e.g., 150ms) to ensure the user sees the feedback even on quick taps.
- **Minimum Hold**: Sometimes it's useful to hold the pressed state for a minimum duration (e.g., 200ms) so the flash of color isn't missed on extremely fast clicks.

**Common Patterns:**
- **Tap Highlight**: Mobile browsers often have a built-in delay/duration for tap highlights.
- **Botton Bounce**: A quick scale-down and scale-up animation that has a fixed duration regardless of how long the user holds.
