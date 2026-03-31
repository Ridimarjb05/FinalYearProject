---
name: frontend-design-agents
description: Frontend design skill for AI agents that generates production-ready React + Tailwind + shadcn interfaces through archetype-driven design. Use when building web components, pages, dashboards, landing pages, or applications. Generates a design spec first, then immediately produces code. Identifies product archetype (user persona + product type + brand personality) from user prompt, applies it to every design decision, and self-critiques for boldness before delivery. Avoids generic, boring, static-feeling designs.

---

# Frontend Design for AI Agents

Generate distinctive, production-ready frontend interfaces through archetype-driven design. Flow: infer archetype → generate spec → immediately produce code.

## Workflow

1. **Infer archetype** from user's prompt (user persona + product type + brand personality)
2. **Consult Reference Library**: MUST check `references/index.md` to explore all available categories. ALWAYS follow these references to align with established patterns and avoid reinventing the wheel.
3. **Generate design spec** (Markdown) with archetype definition, layout structure, tokens, interactions, references used, and anti-patterns
4. **Immediately proceed to code** — no approval gate, user can interrupt if needed
5. **Self-critique before delivery** — ask "is this too safe?" with bias toward boldness
6. **Deliver code** — small projects all at once, large projects incrementally (layout first, then components)

## Archetype Identification

Infer from user's prompt without asking. Combine three dimensions:

- **User persona**: Who uses this? (developers, executives, teenagers, parents, etc.)
- **Product type**: What is it? (SaaS dashboard, marketing site, e-commerce, blog, etc.)  
- **Brand personality**: What character? (trusted advisor, bold challenger, friendly helper, luxury curator, etc.)

Name the archetype in structured format: `[Personality] [Product Type] for [Persona]`  
Example: "Bold Challenger SaaS Dashboard for Growth-Stage Startups"

## Design Spec Format (Markdown)

```markdown
# Design Spec: [Project Name]

## Archetype
**[Personality] [Product Type] for [Persona]**

[2-3 sentences on the character/soul this archetype embodies]

## Anti-Patterns for This Archetype
- [Specific things to avoid based on archetype]
- [e.g., "Avoid playful illustrations — this is serious fintech"]

## References Considered
- [Which patterns from the reference library did you check?]
- [e.g. "Checked composition/hero-landing/split-screen-hero.md - adopting structure"]
- [e.g. "Checked effects/light-glow/neon-pulse.md - adopting for buttons"]

## Layout Structure
- **[Section Name]**: [Purpose] — [Layout approach, e.g., "asymmetric grid with overlapping hero image"]
- **[Section Name]**: [Purpose] — [Layout approach]
[Include reasoning for layout choices]

## Design Tokens (Minimal)
- **Primary**: [color] — [rationale tied to archetype]
- **Accent**: [color] — [rationale]
- **Neutrals**: [2-3 values]
- **Typography**: [display font] / [body font] — [rationale tied to archetype]
- **Border radius**: [value tied to archetype — sharp for corporate, rounded for friendly]
- **Shadows**: [approach — dramatic for depth, subtle for minimal]

## Interactions & Animation
**Principles**: [1-2 sentences on motion philosophy for this archetype]

**Specifics**:
- [Element]: [animation, e.g., "hero text fades in on load with 0.3s delay"]
- [Element]: [interaction, e.g., "cards lift 4px on hover with subtle shadow increase"]
```

## Design Decisions

All decisions flow from archetype. Apply these lenses:

### Typography
- Match archetype character — serious = refined serif or clean sans, playful = rounded or display fonts
- Strong hierarchy — display font for headlines, clean body font for text
- Use typography as a design element — large display text, mixed weights create visual interest

### Color
- Minimal palette derived from archetype emotional tone: 1 primary + 1 accent + neutrals
- Bold strategic pops outperform timid, evenly-distributed palettes
- Dark mode: infer from prompt or archetype (luxury, tech, gaming often suggest dark)

### Layout
- Unexpected choices create interest — asymmetry, overlapping elements, broken grids
- Create visual tension, then resolve it — don't leave it feeling unfinished
- Rhythm through the scroll journey — alternate section styles, vary visual weight
- Content density matches product type — marketing pages breathe, dashboards can be denser

### Whitespace
- Matches archetype: luxury = generous space, SaaS dashboard = balanced density
- Always maintain visual hierarchy regardless of density

### Containers & Cards
- Shape matches archetype — sharp corners for corporate, rounded for friendly
- Consistent shadow/border treatment
- Use depth and layering to create hierarchy

### Navigation
- Style matches archetype — minimal for luxury, feature-rich for SaaS
- Consider sticky/fixed based on page length and product type

### CTAs
- Style according to archetype — subtle for luxury, bold for SaaS
- Visually prominent through contrast, size, position
- Limit to 1 primary CTA per viewport

### Forms & Inputs
- Style to match archetype
- Include validation states (error, success) by default
- Clear labels, inline validation, helpful microcopy

### Hover & Focus States
- Subtle but noticeable — users know something is interactive
- Energy matches archetype — bold product = bold hovers, minimal = subtle
- Consistent across all interactive elements

### Images & Icons
- Suggest image styles matching archetype (photography vs illustration, mood)
- Provide aspect ratio and placement guidance
- Recommend Unsplash search terms for fitting placeholders
- Lucide icons by default (user can override)

### Animation
- Default to tasteful motion — things should feel alive, not static
- Hover transitions on all interactive elements
- Scroll-triggered animations (fade in, slide up) for engagement
- Micro-interactions (button press feedback, input focus effects)
- Use Framer Motion for complex animations
- Respect `prefers-reduced-motion` by default
- Don't overdo it — motion supports the design, doesn't dominate

## Self-Critique Checklist

Before delivering, evaluate:

- [ ] **Visual contrast**: Enough variation in color, size, density, shape?
- [ ] **Color usage**: Archetype-appropriate? Strategic pops or too muted?
- [ ] **Layout**: Visual rhythm or just stacked sections?
- [ ] **Typography**: Interplay between sizes/weights? Typography as design element?
- [ ] **Whitespace**: Matches archetype? Creates hierarchy?
- [ ] **Squint test**: Do CTAs and key elements stand out at a glance?
- [ ] **Static feel**: Does it have life? Motion? Hover states?
- [ ] **Generic feel**: Would this be mistaken for a template?

**Bias toward boldness** — if uncertain, make the bolder choice. Break rules intentionally when it serves the design.

## Technical Defaults

- **Stack**: React + Tailwind CSS + shadcn patterns (as base to expand on, not copy directly)
- **Approach**: Desktop-first, responsive by default
- **Spacing**: Tailwind's default scale (4px base)
- **Breakpoints**: Tailwind defaults (sm, md, lg, xl, 2xl)
- **Icons**: Lucide
- **Images**: Unsplash placeholders with archetype-appropriate search terms
- **Animation**: CSS transitions default, Framer Motion for complex
- **References**: Check `.agent/skills/frontend-design/references/index.md` for implementation patterns. **Always follow the references** found in this library.
- **Themes**: Generate light/dark variants automatically when appropriate
- **States**: Include loading, empty, error states for SaaS/dashboards; skip for landing pages

## Folder Structure

**New projects** — opinionated structure:
```
/components    - UI components
/lib           - Utilities
/styles        - Global styles, tokens
```

**Existing projects** — adapt to user's structure

## Code Delivery

- **Small projects**: All components at once
- **Large projects**: Main layout/page first, then supporting components incrementally
- **Dependencies**: Include install commands for new projects, note unusual additions for existing
- **Documentation**: Minimal by default — just code. Explain only if user asks.

## Adaptive Communication

- Infer user skill level from their language (mentions "components" or "Tailwind" → developer)
- Default to accessible language, get more technical if user does
- Concise responses — explain design rationale only when asked "why?"
- Clarify on significant ambiguity, make reasonable assumptions for small ambiguities

## Anti-Patterns (Always Avoid)

- Generic "bootstrap-looking" or "template-y" designs
- Inconsistent spacing or alignment  
- Overusing gradients, shadows, or decorative elements
- Too static — pages should feel alive
- Timid, evenly-distributed color palettes
- Cookie-cutter layouts without archetype character
- shadcn components used as-is without expansion

## After Delivery

- Offer next steps: "Want more components? A new page?"
- Offer to export the design spec for future consistency
- Easy reset: user can say "start over" to clear and begin fresh
