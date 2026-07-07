# Project Tech Stack

This is the recommended stack for the actual portfolio implementation.

## Hard Requirements

- TypeScript
- Tailwind CSS
- Dark mode only
- Modern premium UI
- Advanced animation with masks, enter/exit transitions, zooms, and scroll reveals

## Recommended Core

### Next.js

Use Next.js App Router as the framework.

Why:

- Best fit for a serious portfolio with metadata, SEO, optimized images, and clean deployment.
- Strong React/TypeScript support.
- Easy to add future project pages or MDX case studies.

### TypeScript

Use TypeScript everywhere.

Why:

- Matches your full-stack/modern developer positioning.
- Keeps components, project data, animation configs, and content models safer.
- Looks good to dev leads reviewing the code.

### Tailwind CSS

Use Tailwind for the design system and layout.

Why:

- Fast to build custom UI.
- Good for responsive design and design tokens.
- Lets us preserve the Stitch design language without fighting a component library.

Use CSS variables for colors, spacing, shadows, masks, and motion timing.

## Animation Stack

### Motion for React

Use for normal React UI animation:

- component enter animations
- hover/tap states
- reusable reveal variants
- shared layout transitions
- small scroll-triggered reveals
- exit animations with `AnimatePresence`

This should be the default animation layer.

### GSAP + `@gsap/react`

Use for advanced portfolio moments:

- hero intro timeline
- section transition timelines
- scroll-linked masks
- pinned project reveals
- timeline drawing in the experience section
- coordinated image/text animations

GSAP is the "big gun" for the amazing animation moments.

### GSAP ScrollTrigger

Use only where scroll needs precise choreography:

- project panels opening with masks
- image zoom tied to scroll
- experience timeline drawing
- active section state

### Lenis

Optional.

Use Lenis if we want smooth premium scrolling with GSAP coordination. Skip it if it fights mobile behavior or makes the site feel scroll-jacked.

## UI / Components

### Custom Components First

Build the visible UI custom. The portfolio should not look like default shadcn or a template.

Needed custom components:

- section shell
- animated mask reveal
- hero wordmark
- project deployment panel
- capability module
- experience timeline record
- contact/uplink panel
- status lamp
- technical label
- CTA button

### Radix UI

Use Radix only for accessibility primitives:

- tooltip
- tabs
- dialog/modal if needed
- popover if needed

### shadcn/ui

Use selectively as reference or scaffolding, not as the design identity.

Good candidates:

- tabs structure
- tooltip
- dialog
- maybe button internals, heavily restyled

### lucide-react

Use for icons.

Likely icons:

- Mail
- Linkedin
- Github
- ExternalLink
- Download
- Copy
- Terminal
- Code
- Briefcase
- GraduationCap
- ArrowUpRight

## Styling Utilities

### `clsx`

Use for conditional class names.

### `tailwind-merge`

Use with `clsx` to safely merge Tailwind classes.

### `class-variance-authority`

Optional. Use if buttons, labels, chips, and panels develop several variants. Skip if the component set stays small.

## Content / Data

### TypeScript Data Files

Start with typed `.ts` data files for:

- projects
- experience
- stack groups
- navigation
- contact links

This is simpler than a CMS and better for a one-person portfolio.

### Dedicated Type Files

Shared types should live in `src/types/`, not inside large `.tsx` components.

Recommended examples:

- `src/types/project.ts`
- `src/types/experience.ts`
- `src/types/navigation.ts`
- `src/types/contact.ts`
- `src/types/skill.ts`

Small component-local types are acceptable only when they are tiny and used by that component alone.

### MDX

Optional later.

Use MDX if we want full case-study pages for Svarog Tracer, ZeroTwo, and FormAi.

## Visual Effects

### CSS Masks / Clip Paths

Use for the signature effect:

- text reveal masks
- image wipe masks
- section open/close masks
- hover reveal layers

### CSS Grid Texture

Use custom CSS backgrounds for subtle grid, scanlines, and surface texture.

### Canvas / WebGL

Optional only.

Do not add WebGL just to look fancy. Use React Three Fiber only if we design a meaningful interactive visual, like a live system core or project topology.

## Forms / Contact

Recommended first version:

- mailto email button
- LinkedIn button
- GitHub button
- CV download button when approved
- copy email button with a small status toast

Optional packages:

- `sonner` for polished toasts
- `react-hook-form` + `zod` only if we build a real contact form

For now, avoid a backend contact form unless you really want one.

## Analytics / Deployment

### Vercel

Recommended deployment target for Next.js.

### Vercel Analytics

Optional, useful to know which projects recruiters click.

### Vercel Speed Insights

Optional, useful because animation-heavy portfolios need performance checks.

## Testing / Quality

### ESLint

Use the Next.js defaults.

### Prettier

Use for formatting consistency.

### Playwright

Use for visual checks after implementation:

- desktop hero screenshot
- mobile hero screenshot
- animation elements render
- no overlapping text
- links/buttons visible and clickable

## Security

The app should avoid common frontend security problems:

- no unsafe `dangerouslySetInnerHTML`
- no secrets in client code
- no API keys committed
- safe external link attributes
- no unknown third-party scripts
- validate project/contact URLs before rendering

## Final Recommended Install Set

Start with:

```txt
next
react
react-dom
typescript
tailwindcss
motion
gsap
@gsap/react
lucide-react
clsx
tailwind-merge
```

The coding agent should install these from the terminal. Rani should not need to install packages manually.

Recommended scaffold command:

```txt
npx create-next-app@latest . --ts --tailwind --eslint --app --src-dir --import-alias "@/*"
```

Recommended core package command:

```txt
npm install motion gsap @gsap/react lucide-react clsx tailwind-merge
```

Recommended test package command:

```txt
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

Add if needed:

```txt
@radix-ui/react-tooltip
@radix-ui/react-tabs
@radix-ui/react-dialog
class-variance-authority
lenis
sonner
@vercel/analytics
@vercel/speed-insights
```

Only add for a real reason:

```txt
three
@react-three/fiber
@react-three/drei
react-hook-form
zod
```

## My Recommendation

Use this stack:

```txt
Next.js + TypeScript + Tailwind CSS
Motion for React for most UI motion
GSAP for hero/scroll/mask choreography
lucide-react for icons
Radix only for accessible primitives
Typed TS data files for content
Vercel for deploy
```

This gives you the modern premium animation you want without making the project heavy or template-looking.
