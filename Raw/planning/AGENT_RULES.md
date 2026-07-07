# Agent Rules

These rules guide future coding agents working on this portfolio.

## Current Phase

Planning only. Do not implement the portfolio until Rani approves the direction or asks for coding.

## Source Of Truth

Use this folder as the planning source:

- `Raw/planning`

Start implementation from:

- `Raw/planning/IMPLEMENTATION_WORKFLOW.md`

Use these reference assets:

- `refernce design/DESIGN.md`
- `refernce design/code.html`
- `refernce design/screen.png`
- `refernce design/Rani Ali CV - 26.6.25.pdf`

## Behavior

- Preserve the user's existing files.
- Do not overwrite the reference design folder.
- Install required project packages from the terminal. Do not ask Rani to install Next.js or dependencies manually.
- Keep plans and future implementation aligned with the noir command-center identity.
- Prefer clear portfolio content over decorative complexity.
- Ask before publishing phone number publicly.
- Ask for updated project links, GitHub, LinkedIn, and current job targets before final content writing.

## Implementation Rules For Later

- Use the existing planning docs before coding.
- Follow a TDD loop: plan, write/update tests, execute, review, fix, repeat.
- Build the actual portfolio experience, not a marketing landing page.
- Keep UI polished on desktop and mobile.
- Keep shared TypeScript types in dedicated type files, not inside large `.tsx` files.
- Split large files into smaller components and helpers.
- Follow clear design patterns: data files, shared types, section components, UI primitives, and animation helpers.
- Review for security issues including unsafe HTML injection, exposed secrets, unsafe external links, and XSS risks.
- Test motion with reduced-motion preference.
- Verify screenshots with browser testing before calling the implementation done.
- Keep components scoped and reusable.
- Avoid adding heavy dependencies without a clear visual or UX reason.
- Do not leave old experiments, random strings, mojibake, accidental icons, or commented-out dead code.
