# Progress Bar

**Description:**
A specialized indicator for determinate loading, showing exactly how much of the task is complete (0% to 100%).

**Key Principles:**
- **Accuracy**: Should reflect real progress. Stalling at 99% is frustrating.
- **Smoothing**: Animate the transition between values so the bar doesn't jump jaggedly.
- **Labeling**: Often helpful to show the percentage text or "3 of 5 uploaded".

**Common Patterns:**
- **Linear Bar**: Standard horizontal bar.
- **Circular Progress**: Ring filling up (like an Apple Watch ring).
- **Stepped Progress**: Discrete segments filling up.
