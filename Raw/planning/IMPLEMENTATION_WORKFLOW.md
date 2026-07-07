# Implementation Workflow

This file is the first document to follow when coding the portfolio.

The goal is to build the portfolio cleanly, test-first, and reviewable. Do not rush into visual effects before the base app, content model, layout, and tests are stable.

## 1. Read Before Coding

Read these files in order:

1. `Raw/planning/README.md`
2. `Raw/planning/DESIGN_RULES.md`
3. `Raw/planning/TECH_STACK.md`
4. `Raw/planning/00-analysis.md`
5. Section docs: `01-hero.md` through `06-contact.md`

Then inspect the reference design:

1. `refernce design/DESIGN.md`
2. `refernce design/screen.png`
3. `refernce design/code.html`

Do not copy messy generated HTML directly. Use it only as visual reference.

## 2. Build Order

Follow this order:

1. Install/scaffold the app from the terminal. Do not ask Rani to install packages manually.
2. Scaffold the app with Next.js, TypeScript, and Tailwind CSS.
3. Add project tooling: ESLint, formatting, and test scripts.
4. Create typed data files for navigation, projects, experience, skills, and contact links.
5. Create design tokens: colors, fonts, spacing, borders, shadows, masks, and motion timing.
6. Build the static layout first without complex animation.
7. Add tests for core content rendering and links.
8. Add simple motion with Motion for React.
9. Add advanced GSAP animation only after the static UI is correct.
10. Run review checks.
11. Fix issues before moving to the next section.

## 2.1 Terminal Setup Responsibility

The coding agent must run all install and setup commands in the terminal. Rani should not need to install Next.js, Tailwind, TypeScript, animation packages, or test packages by hand.

Before installing, inspect the folder:

```txt
pwd
dir
```

If there is no app scaffold yet, create the Next.js app in the current project folder or in a clearly named app folder. Prefer using the current folder if it is empty enough for a clean app. If the scaffold command refuses because the folder is not empty, use a temporary scaffold folder, then move the generated app files carefully without deleting `Raw/` or `refernce design/`.

Recommended scaffold command:

```txt
npx create-next-app@latest . --ts --tailwind --eslint --app --src-dir --import-alias "@/*"
```

If using npm prompts, choose:

- TypeScript: yes
- ESLint: yes
- Tailwind CSS: yes
- `src/` directory: yes
- App Router: yes
- Turbopack: acceptable
- import alias: `@/*`

After scaffolding, install the core portfolio packages:

```txt
npm install motion gsap @gsap/react lucide-react clsx tailwind-merge
```

Install test tooling if it is not already present:

```txt
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

Optional packages should be installed only when needed by the implementation:

```txt
npm install @radix-ui/react-tooltip @radix-ui/react-tabs @radix-ui/react-dialog
npm install sonner
npm install lenis
npm install @vercel/analytics @vercel/speed-insights
```

Do not install React Three Fiber, Three.js, form libraries, or MDX until there is a clear design or content reason.

After installation, verify:

```txt
npm run lint
npm run build
```

Add or update `npm run test` before feature work begins.

## 3. TDD Loop

Every feature or section must follow this loop:

1. Plan
2. Write or update tests
3. Execute the smallest implementation
4. Run tests and lint
5. Review in browser
6. Fix if needed
7. Repeat until clean

Do not build five sections and test later. Finish one section slice at a time.

## 4. Section TDD Checklist

For each section:

1. Define expected content in typed data.
2. Add tests that confirm the important text, buttons, and links render.
3. Implement the component without animation.
4. Verify responsive layout.
5. Add animation.
6. Verify reduced-motion behavior.
7. Review for visual bugs, text overlap, and broken links.

## 5. Testing Expectations

Use tests for:

- page renders without crashing
- hero contains name, role, and primary CTA
- projects render from typed data
- contact does not show phone number
- LinkedIn and GitHub links are visible
- navigation items point to valid sections
- no placeholder project links are accidentally shown as real links

Use browser/visual checks for:

- desktop layout
- mobile layout
- animation does not hide content
- no overlapping text
- no broken masks
- no horizontal overflow
- dark mode only

## 6. Review Rules

After each meaningful change, run:

```txt
npm run lint
npm run test
npm run build
```

If a command does not exist yet, add it or document why it is not available.

Before marking a section done:

- inspect it in the browser
- check mobile and desktop
- check keyboard focus for buttons/links
- check reduced motion
- remove dead code
- remove unused imports
- remove placeholder text unless intentionally tracked

## 7. Code Quality Rules

Code must be clean, readable, and reviewable later.

Required:

- TypeScript everywhere
- shared types live in dedicated type files, not inside large `.tsx` components
- component-local types are allowed only when tiny and used by one small component
- meaningful names
- small focused components
- split big files into smaller components before they become hard to review
- follow clear design patterns: typed data, presentational components, section containers, shared UI primitives, and reusable animation helpers
- typed data models
- no random strings
- no mojibake or broken characters
- no emoji/icons as accidental text
- no generated garbage classes copied blindly from Stitch
- no unused files
- no commented-out old code
- no console logs in final code
- no fake metrics or fake coordinates
- no phone number shown publicly
- no unsafe HTML injection
- no secrets, tokens, API keys, or private URLs committed to the client code

Allowed:

- lucide-react icons
- purposeful technical labels
- intentional decorative CSS textures
- placeholder project screenshots only if clearly named as placeholders

## 7.1 File Structure Rules

Keep the project easy to review.

Recommended structure:

```txt
src/
  app/
  components/
    layout/
    sections/
    ui/
    motion/
  data/
  lib/
  styles/
  types/
```

Rules:

- Put shared types in `src/types/`.
- Put typed content/data in `src/data/`.
- Put reusable helpers in `src/lib/`.
- Put reusable animation utilities in `src/components/motion/` or `src/lib/animation`.
- Keep section components in `src/components/sections/`.
- Keep generic UI pieces in `src/components/ui/`.
- Avoid files that mix data, types, UI, animation timelines, and business logic together.
- If a file becomes hard to scan, split it.

## 7.2 Security Rules

The portfolio is mostly static, but still treat security seriously.

Required:

- Do not use `dangerouslySetInnerHTML` unless there is no alternative and the content is sanitized.
- Do not render untrusted user input as HTML.
- External links must use safe attributes when opening a new tab: `target="_blank"` with `rel="noreferrer noopener"`.
- Do not expose secrets, tokens, API keys, service credentials, private endpoints, or hidden admin URLs.
- Do not add tracking scripts without approval.
- Do not load unknown third-party scripts for visual effects.
- Validate URLs in project/contact data before rendering as links.
- Keep contact actions simple and safe: mailto, LinkedIn, GitHub, CV download when approved.
- Avoid dynamic script injection.

Before final review, search for:

```txt
dangerouslySetInnerHTML
process.env
console.log
TODO
FIXME
api_key
secret
token
password
```

Anything found must be reviewed and either removed, fixed, or intentionally documented.

## 8. Animation Rules

Start simple, then add complexity.

Use Motion for React for:

- component entry
- hover/tap states
- basic reveal masks
- layout transitions

Use GSAP for:

- hero timeline
- scroll-linked mask sequences
- pinned project reveals
- experience timeline drawing

Animation must not break readability. If animation causes layout jumps, overlaps, or hidden content, fix the layout first.

Always support reduced motion.

## 9. No Old Code Rule

Do not keep old experiments inside the production app.

If trying an approach:

1. Try it in a small branch/component.
2. Keep it only if it is used.
3. Delete failed experiments before moving on.

The final codebase should look intentional, not like a history of attempts.

## 10. Suggested Implementation Slices

### Slice 1: Foundation

- Next.js + TypeScript + Tailwind
- terminal-installed dependencies
- fonts
- global CSS variables
- layout shell
- lint/test/build scripts

### Slice 2: Data

- navigation data
- project data
- experience data
- skills data
- contact data
- tests for required content

### Slice 3: Static Sections

- hero
- about
- projects
- experience
- stack
- contact

### Slice 4: Responsive Polish

- desktop layout
- tablet layout
- mobile layout
- no overflow
- readable spacing

### Slice 5: Motion Layer

- Motion for React reveals
- hover interactions
- mask transitions
- reduced-motion fallback

### Slice 6: Advanced Motion

- GSAP hero sequence
- GSAP project/experience scroll choreography
- performance review

### Slice 7: Final Review

- tests
- lint
- build
- browser review
- link review
- content review
- cleanup

## 11. Definition Of Done

A section is done only when:

- tests pass
- lint passes
- build passes
- files are split into readable components
- shared types are in dedicated type files
- desktop and mobile look good
- content is clear
- animation works and has reduced-motion fallback
- no broken text or mojibake
- no placeholder links pretending to be real
- no obvious XSS/security issues
- code is clean enough to review later

The whole portfolio is done only when every section meets this definition.
