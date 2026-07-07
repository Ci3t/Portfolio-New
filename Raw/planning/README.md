# Portfolio Planning

This folder is the planning source for Rani Ali's portfolio. No coding decisions should start until these docs are reviewed and the open questions are answered or intentionally deferred.

## Goal

Build an eye-catching modern portfolio that feels premium, technical, animated, and memorable without becoming confusing for recruiters or engineering leads.

The site should sell three ideas fast:

1. Rani can build polished full-stack products.
2. Rani has a strong UI sense and can handle modern frontend motion.
3. Rani can communicate, teach, lead bootcamp work, and collaborate well.

## Source Material

- Reference design folder: `refernce design`
- Stitch design file: `refernce design/DESIGN.md`
- Stitch HTML mock: `refernce design/code.html`
- Screenshot: `refernce design/screen.png`
- CV: `refernce design/Rani Ali CV - 26.6.25.pdf`

## First Coding Document

Before implementation starts, follow:

- `Raw/planning/IMPLEMENTATION_WORKFLOW.md`

## Planned Sections

1. Hero / Identity
2. About / Operator Profile
3. Projects / Deployments
4. Experience / Chronicles
5. Stack / Capabilities
6. Contact / Secure Uplink

## Recommended Build Direction

- Framework: Next.js App Router
- Language: TypeScript
- Styling: Tailwind CSS, CSS variables, custom design tokens
- UI primitives: Radix UI or shadcn/ui selectively, not as a generic default look
- Icons: lucide-react
- Animation: Motion for React for component/page transitions, GSAP for advanced scroll timelines and masks
- Smooth scroll: Lenis if the final interaction model uses custom scroll scenes
- 3D/WebGL: React Three Fiber only if we add a real interactive visual, not decoration for its own sake

See `TECH_STACK.md` for the concrete project stack recommendation.

## Core Creative Direction

Keep the "Metropolitan Noir" base from Stitch, but push it toward a modern premium portfolio rather than an overly technical terminal UI: sharp geometry, black surfaces, amber/violet signal accents, giant typography, mono technical labels in moderation, cinematic portrait treatment, and advanced mask reveals.

The portfolio should feel like a high-end technical dossier, not a generic resume page.
