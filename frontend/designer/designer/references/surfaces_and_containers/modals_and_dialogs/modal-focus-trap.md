# Modal Focus Trap

## Accessibility Requirement
When a modal is open, focus should be contained within it. Users should not be able to tab to elements behind the modal.

### Behavior
1.  **Initial Focus**: When opened, focus moves to the first focusable element (often the 'Close' button or the first input field).
2.  **Tabbing**: Pressing `Tab` cycles through focusable elements inside the modal.
3.  **Looping**: Reaching the last element and pressing `Tab` moves focus back to the first element. Shift+Tab from the first moves to the last.
4.  **Restoration**: When closed, focus returns to the element that triggered the modal opening.

### Libraries
- Use established primitives for this. Do not reinvent the wheel as it is complex to handle edge cases.
- **Radix UI**: `Dialog` primitive handles this automatically.
- **Headless UI**: `Dialog` component handles this automatically.
- **React Aria**: `useDialog` and `FocusScope`.
