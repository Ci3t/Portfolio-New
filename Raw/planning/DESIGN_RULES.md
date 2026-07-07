# Design Rules

## Identity

The portfolio identity is "Metropolitan Noir": dark, sharp, cinematic, modern, and premium. It should have technical detail, but it should not feel like a pure terminal/dashboard clone.

## Must Keep

- Dark-first visual system.
- Dark mode only. No light mode.
- Sharp rectangular geometry.
- Large display typography.
- Amber as the main signal color.
- Violet as a secondary atmospheric accent.
- JetBrains Mono for technical labels and metadata, used in moderation.
- Grid lines, selective terminal labels, status lamps, mask reveals.
- Clear recruiter-readable content.

## Must Avoid

- Generic SaaS landing-page feel.
- Rounded soft cards as the main visual language.
- Cute gradients, blobs, or decorative shapes.
- Overusing terminal language until content becomes unclear.
- Making the site too technical for HR to understand quickly.
- Fake metrics, fake coordinates, fake system labels that look like real claims.
- Animation that makes the site slow, hard to read, or annoying on mobile.

## Typography

- Display: Syne
- Body: Hanken Grotesk
- Technical labels: JetBrains Mono

Use huge type only where it creates identity. Use tighter readable type in project details, timelines, and contact actions.

## Layout

- Desktop: strong grid, editorial composition, clear vertical sections.
- Mobile: keep impact, but reduce decorative sidebars and avoid cramped terminal panels.
- Sections can be full-screen if content fits naturally. Do not force every section into 100vh if it hurts readability.

## Motion

Motion should feel like precision engineering:

- mask reveals
- mask exits
- sharp wipes
- staggered text
- image zoom in/out
- scroll-linked timeline drawing
- hover states with one clean accent movement
- cinematic section transitions

Motion should feel amazing and modern, but not random, bouncy, or playful.

## Content Clarity

Every creative label needs a plain label nearby.

Examples:

- `Deployments` can also say `Projects`.
- `Chronicles` can also say `Experience`.
- `Secure Uplink` can also say `Contact`.
