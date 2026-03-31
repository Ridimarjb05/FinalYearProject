# Button Loading

**Description:**
Handling the state of a button when the action it triggered is processing.

**Key Principles:**
- **Preserve Width**: The button should not change width when the text is replaced by a spinner. This prevents layout jumps.
- **Disable Interaction**: The button must be disabled to prevent double submissions.
- **Retention**: Often good to keep the original text visible but dimmed, or replaced entirely by the spinner.

**Common Patterns:**
- **Spinner Replacement**: Text is hidden, spinner appears in center.
- **Spinner Alongside**: Spinner appears to the left or right of the text.
