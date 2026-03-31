# Parallax Scroll

Elements moving at different speeds to create depth.

### Mechanics
- **Technique**: Background moves slower than foreground.
- **Ratio**:
    - **Background**: `translateY(0.5 * scrollY)`
    - **Foreground**: `translateY(0)`
    - **Floating elements**: `translateY(-0.2 * scrollY)` (move faster)
- **Warning**: Can cause motion sickness if too aggressive; disable on reduced-motion.
