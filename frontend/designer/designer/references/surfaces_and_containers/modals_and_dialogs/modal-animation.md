# Modal Animation

## Entrance & Exit
Smooth animations make modals feel less intrusive and more like a natural part of the interface.

### Standard Scale & Fade
- **Entrance**: Start `opacity-0 scale-95`. End `opacity-100 scale-100`.
- **Exit**: Start `opacity-100 scale-100`. End `opacity-0 scale-95`.
- **Timing**: Quick and snappy. Entrance ~200ms-300ms. Exit ~150ms-200ms. Easy-out typically feels best.

### Slide In
- **From Bottom**: Common for mobile bottom sheets. `translate-y-full` -> `translate-y-0`.
- **From Side**: Common for drawers/panels. `translate-x-full` -> `translate-x-0`.

### Physicality
- **Springs**: Using spring physics (bounciness) adds a playful or "app-like" feel but should be subtle for professional tools.

## Implementation (Tailwind/Framer Motion)
```jsx
// Framer Motion Example
<motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0, scale: 0.95 }}
  transition={{ duration: 0.2 }}
>
  {/* Content */}
</motion.div>
```
