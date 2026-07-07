# Packages And Technical Direction

This is a planning recommendation, not an install list yet.

## Core App

### Next.js

Use Next.js App Router for the final build. It fits a modern portfolio because it supports strong routing, metadata, image/font optimization, and easy deployment.

Official docs checked July 7, 2026: https://nextjs.org/docs

### Tailwind CSS

Use Tailwind CSS for layout, responsive styling, utilities, and design token integration. Keep custom CSS for animation primitives, masks, grid textures, and global tokens.

Official docs checked July 7, 2026: https://tailwindcss.com/docs

## UI

### Radix UI

Use Radix primitives for accessible controls when needed: dialogs, tabs, tooltips, popovers, toggles.

Official docs checked July 7, 2026: https://www.radix-ui.com/primitives/docs/overview/introduction

### shadcn/ui

Use selectively as a source of component structure, not as the visual identity. The design should not look like default shadcn.

Official docs checked July 7, 2026: https://ui.shadcn.com/docs

### lucide-react

Use lucide icons for nav actions, external links, copy, download, terminal, GitHub, mail, and UI controls.

Official docs checked July 7, 2026: https://lucide.dev/guide/react

## Animation

### Motion for React

Use as the default React animation library for:

- enter/exit animations
- layout transitions
- hover/tap gestures
- simple scroll-triggered reveals
- page/section transitions
- reusable animation variants

Motion's docs describe it as the successor naming for Framer Motion and a production-grade React animation library.

Official docs checked July 7, 2026: https://motion.dev/docs/react

### GSAP

Use GSAP when the motion needs timeline-level control:

- advanced scroll choreography
- pinned sections
- mask sequences
- SVG/path drawing
- multi-step hero intro timelines
- precise coordinated animations across unrelated DOM elements

Use `@gsap/react` for React cleanup patterns.

Official docs checked July 7, 2026: https://gsap.com/resources/React/

### GSAP ScrollTrigger

Use ScrollTrigger if we choose scroll-based project reveals, pinned timelines, or progressive timeline drawing.

Official docs checked July 7, 2026: https://gsap.com/docs/v3/Plugins/ScrollTrigger/

### Lenis

Use only if the final site benefits from smooth controlled scrolling. If native scroll feels better, skip it.

Official site checked July 7, 2026: https://www.lenis.dev/

## 3D / WebGL

### React Three Fiber

Use only for a meaningful interactive element, such as a subtle 3D "system core", project topology, or shader-driven portrait mask. Do not add 3D just as decoration.

Official docs checked July 7, 2026: https://r3f.docs.pmnd.rs/getting-started/introduction

## Recommended Stack Choice

Start with:

- Next.js
- Tailwind CSS
- Motion for React
- GSAP + `@gsap/react`
- lucide-react
- Radix UI only where needed

Defer until design demands them:

- Lenis
- React Three Fiber
- shader libraries

## Performance Rules

- Prefer transform and opacity animations.
- Use clip-path/masks carefully and test on mobile.
- Respect `prefers-reduced-motion`.
- Do not animate too many heavy shadows or filters.
- Keep hero image optimized.
- Avoid scroll-jacking behavior that blocks normal browser expectations.

