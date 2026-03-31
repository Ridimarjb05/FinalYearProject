# Z-Index System

**Description:**
Managing the vertical stacking order of elements (what appears on top of what).

**Key Principles:**
- **Systematic Scale**: Don't use random numbers like `9999`. Use a scale (e.g., 100, 200, 300...).
- **Context**: Remember that z-index is relative to the stacking context (usually the parent).

**Common Patterns:**
- **Dropdowns**: 100
- **Sticky Headers**: 200
- **Modals**: 300
- **Tooltips**: 400
- **Toast Notifications**: 500 (highest)
