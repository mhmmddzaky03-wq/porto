---
description: Rules for frontend code generation and review to prevent generic AI slop and ensure production craftsmanship.
globs: ["**/*.tsx", "**/*.jsx", "**/*.html", "**/*.vue", "**/*.svelte", "**/*.css", "**/*.scss"]
---

# Anti-AI-Slop Frontend Engineering Rules

Whenever generating, modifying, or reviewing frontend code (HTML, CSS, React, Vue, Svelte, Tailwind, etc.):

1. **Reject Cliché AI Aesthetics**:
   - Do NOT default to dark purple/indigo gradients (`bg-gradient-to-r from-purple-600 to-indigo-600`) or glowing neon cyan/purple borders unless explicitly requested by the user.
   - Do NOT drop decorative blurred glowing backdrop blobs (`blur-3xl opacity-30`) without purposeful brand design.
   - Avoid generic 3-card "feature bento boxes" with identical Lucide icons and meaningless marketing placeholder text.

2. **Mandatory Interactive States**:
   - Every clickable element MUST specify: `:hover`, `:active`, `:focus-visible`, and disabled state styling.
   - Ensure all interactive elements are reachable and operable via keyboard (`Tab`, `Enter`, `Space`).

3. **Strict Semantic HTML & Accessibility**:
   - Never use `div` or `span` for buttons or links. Use `<button type="button">` or `<a href="...">`.
   - Ensure all icon-only buttons include `aria-label="Description"`.
   - Adhere to WCAG AA contrast standards (minimum 4.5:1 for body copy).

4. **Defensive Layout & Edge Handling**:
   - Handle text overflow gracefully (`truncate`, `line-clamp`, or responsive wrapping).
   - Always supply meaningful empty states and loading/skeleton fallbacks.

