# Orchestration

Managing timelines across multiple independent components.

### Mechanics
- **Concept**: A "Director" controls the timing.
- **Sequence**:
    1. Header fades in.
    2. Sidebar slides in.
    3. Main content stages in.
- **Tools**: `motion.div` variants (Framer Motion), GSAP timelines.
- **Goal**: Prevent "popcorn" effect where things animate chaotically.
