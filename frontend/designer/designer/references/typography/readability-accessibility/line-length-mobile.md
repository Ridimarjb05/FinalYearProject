# Line Length on Mobile

**Keywords:** Measure, Viewport, Side Padding, Safe Area.

**Description:**
On desktop, we constrain line length to prevent it getting too wide. On mobile, the screen is already narrow, so the risk is text getting too *close* to the edge, making the eye work hard to turn back.

## Usage

### 1. Side Padding
Always leave sufficient padding on the sides of the text. Text touching the screen edge (0px padding) helps no one.
*   **Minimum:** `1rem` (16px).
*   **Better:** `1.5rem` (24px).

### 2. Font Size Relationship
If use a huge font size on mobile (e.g., 20px body), you get very few words per line (e.g., 4-5 words). This creates a "choppy" reading rhythm.
*   **Balance:** Reduce font size slightly on mobile (e.g., 18px -> 16px) to maintain a healthy word count per line (approx 7-10 words on mobile).

### 3. Notch & Safe Areas
Ensure text doesn't get cut off by curved corners or notches.
```css
padding-left: env(safe-area-inset-left);
padding-right: env(safe-area-inset-right);
```
