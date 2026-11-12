# Project Agent Instructions & Standards

All agent sessions for this workspace must adhere to the standards, rules, and skills located in `/Users/dzaky/Documents/Project/.agents`.

---

## 1. Skills Directory
- All specialized procedures, runbooks, and domain guidelines are cataloged in `/Users/dzaky/Documents/Project/.agents/skills/` (650+ domains).
- Skills are registered globally via `~/.gemini/config/skills.json` and locally linked via `.agents`.
- Before executing specialized tasks (e.g., antislop UI design, frontend styling, backend architecture, testing, accessibility, animations, performance optimization), consult and apply the corresponding skill's `SKILL.md`.

---

## 2. Core Operational Rules (from `.agents/rules`)

### A. Reliability & Execution (`agent-reliability.md`, `coding-guidelines.md`)
- **No Placeholders or Stubs**: Never generate code with `// TODO: Implement later` or empty stubs. Write full implementations.
- **Fail Fast & Loud**: Never swallow exceptions or return silent `null`/`-1` error states. Throw or propagate informative errors.
- **Verification First**: Verify every claim and code change with real checks, tests, or builds. Report failures transparently.
- **No Hallucinations**: Do not invent APIs, package names, flags, or configuration keys. Check documentation or codebase if unsure.

### B. Anti-AI-Slop Frontend Craftsmanship (`anti-ai-slop.md`, `antislop.md`)
- **No Generic AI Aesthetics**: Avoid default purple/indigo gradients (`bg-gradient-to-r from-purple-600 to-indigo-600`), floating blurred backdrop blobs, or generic 3-card bento grids with placeholder icons unless explicitly requested.
- **Full Interactive States**: Every interactive element must specify `:hover`, `:active`, `:focus-visible`, and disabled styles.
- **Semantic HTML & WCAG Accessibility**: Use proper `<button>` and `<a>` tags with keyboard navigability (`Tab`, `Enter`, `Space`) and WCAG AA contrast (≥ 4.5:1). Provide `aria-label` for icon-only controls.
- **Defensive Layout**: Handle text overflow (`truncate`, `line-clamp`, responsive wrapping) and provide graceful loading/empty states.

### C. Testing Standards (`testing-requirements.md`)
- **Zero-Prompt Testing**: Include unit tests proactively for critical logic without waiting to be asked.
- **Arrange-Act-Assert (AAA)**: Clearly structure tests into Arrange, Act, and Assert phases.
- **Edge Cases**: Always test bounds, empty/null states, and error handling. Mock external boundaries (network/DB/filesystem).

### D. Commit Standards (`commit-standards.md`)
- Adhere to Conventional Commits: `<type>(<scope>): <short summary>` (`feat`, `fix`, `refactor`, `perf`, `test`, `chore`, `docs`).

