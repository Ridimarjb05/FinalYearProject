# Optimistic UI

**Description:**
Updating the UI to show the *expected* success state immediately after the user performs an action, before the server confirms it.

**Key Principles:**
- **Confidence**: Only use for actions that rarely fail (e.g., "Like", "Save to List").
- **Rollback**: You must have a robust mechanism to revert the UI change if the server request fails (and inform the user).

**Common Patterns:**
- **Instant Like**: Heart turns red immediately on click.
- **Todo List**: Item is added to the list instantly.
