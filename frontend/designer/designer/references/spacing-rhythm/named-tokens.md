# Named Tokens

**Concept:** Semantic names for spacing (xs, sm, md, lg, xl)

Using t-shirt sizing or semantic names helps abstract the actual pixel value, allowing the theme to change without breaking the layout logic.

## Semantic Levels

| Token | Semantic Meaning | Common Pixel Mapping |
|-------|------------------|----------------------|
| **xxs** | Minimal separation | 2px / 4px |
| **xs**  | Tight grouping | 4px / 8px |
| **sm**  | Related items | 8px / 12px |
| **md**  | Default component gap | 16px |
| **lg**  | Loose component gap | 24px / 32px |
| **xl**  | Section separation | 32px / 48px |
| **2xl** | Major separation | 64px |
| **3xl** | Layout separation | 96px |

## Benefits
- **Themable:** Change `md` from 16px to 20px globally.
- **Cognitive Load:** Easier to think "I need a medium gap here" than "I need 16px here".
- **Consistency:** Enforces using the defined steps rather than magic numbers.
