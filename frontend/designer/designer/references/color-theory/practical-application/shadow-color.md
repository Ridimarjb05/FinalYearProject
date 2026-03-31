# Shadow Color

**Keywords:** Glow, reflection, realism, material.

**Description:**
In the real world, shadows are rarely pure black. They pick up the color of the object casting them.

## Usage

### 1. The "Dirty" Shadow
`box-shadow: 0 10px 20px #000000;`
*   This looks harsh and muddy on colored backgrounds.

### 2. The Colored Shadow
If you have a Blue button, give it a Blue shadow.
*   `box-shadow: 0 10px 20px rgba(59, 130, 246, 0.5);`
*   *Result:* A vibrant, glowing effect that feels much more lively.

### 3. Layering
Use two shadows for realism:
*   **Shadow 1 (Ambient):** Large blur, low opacity (The general occlusion).
*   **Shadow 2 (Direct):** Small blur, tighter, slightly darker (The contact point).
