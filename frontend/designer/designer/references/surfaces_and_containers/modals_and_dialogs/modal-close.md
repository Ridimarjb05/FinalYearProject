# Modal Close Actions

## Closing Mechanisms
Multiple ways to dismiss a modal ensure good usability.

### 1. Close Button (X)
- **Position**: Top-right corner of the modal header.
- **Style**: Subtle ghost button, accessible sizing (min 44x44px target).
- **Icon**: Standard 'X' icon.

### 2. Click Outside (Backdrop Click)
- **Behavior**: Clicking the dark overlay effectively "cancels" the action.
- **Exception**: "Persistent" modals (data loss potential) should disable this or warn the user.

### 3. Escape Key
- **Behavior**: Pressing `Esc` should always close the top-most modal.

### 4. Cancel Button
- **Position**: Footer, usually secondary style.
- **Label**: "Cancel", "Close", or "Not Now".

## Destructive Confirmation
- If the modal contains unsaved changes, attempting to close it (via any method) should trigger a confirmation alert: "Discard changes?".
