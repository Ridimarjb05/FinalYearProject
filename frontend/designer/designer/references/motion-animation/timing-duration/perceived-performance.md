# Perceived Performance

Using animation to mask load times and make the app feel faster.

### Strategies
- **Skeleton Screens**: Animate placeholder shapes immediately while content loads.
- **Exit Animations**: Start the exit animation of the current view *before* the new data is fully ready.
- **Pre-emptive Feedback**: Show the "success" state (e.g., like heart) instantly, then sync with server in background.
