# Web Font Loading

**Keywords:** FOUT, FOIT, Performance, Preload, Swap, CLS.

**Description:**
Loading custom fonts from the web (Google Fonts or self-hosted) takes time. How the browser handles the text while waiting for the font file determines the user experience. Poor loading strategies lead to invisible text (FOIT) or jarring layout shifts (CLS).

## Strategies

### 1. `font-display: swap`
The gold standard for most sites. Shows the fallback font immediately, then swaps in the custom font when loaded.
*   **Result:** Text is always visible (FOUT - Flash of Unstyled Text).
*   **CSS:**
    ```css
    @font-face {
      font-family: 'MyFont';
      src: url('myfont.woff2');
      font-display: swap;
    }
    ```

### 2. `font-display: fallback` / `optional`
*   **Fallback:** Gives a short (100ms) block period, then swaps.
*   **Optional:** Gives a short block period. If font isn't loaded by then, it stays with the fallback forever (for that page load). Zero layout shift after initial render.

### 3. Preloading
Tell the browser to prioritize the font file.

```html
<link rel="preload" href="/fonts/my-font.woff2" as="font" type="font/woff2" crossorigin>
```

### 4. Next.js `next/font`
If using Next.js, always use `next/font`. It automatically handles optimization, preloading, and zero-layout-shift (by matching fallback metrics).

```javascript
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
```
