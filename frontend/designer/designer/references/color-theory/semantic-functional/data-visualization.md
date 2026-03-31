# Data Visualization

**Keywords:** Charts, graphs, distinction, accessibility, scale.

**Description:**
Color used to represent data values. This is distinct from UI color because it needs to support many more distinct hue steps.

## Usage

### 1. Categorical (Qualitative)
Distinct colors for distinct categories (e.g., Apple, Banana, Orange).
*   **Requirement:** Hues must be easy to tell apart.
*   **Safe:** Blue, Orange, Purple, Pink, Green.

### 2. Sequential
Low to High values (e.g., Population density).
*   **Technique:** One hue (Blue) fading from Light (Low) to Dark (High).

### 3. Diverging
Values deviation from a median (e.g., Temperature, Vote swing).
*   **Technique:** Two contrasting hues meeting in the middle at a neutral color.
*   *Example:* Blue (Cold) -> White (Neutral) -> Red (Hot).

### 4. Accessibility Check
*   Ensure chart segments have white borders so they don't blend together for color-blind users.
*   Always define a legend.
