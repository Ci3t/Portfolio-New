---
name: Metropolitan Noir
colors:
  surface: '#131315'
  surface-dim: '#131315'
  surface-bright: '#39393b'
  surface-container-lowest: '#0e0e10'
  surface-container-low: '#1c1b1e'
  surface-container: '#201f22'
  surface-container-high: '#2a2a2c'
  surface-container-highest: '#353437'
  on-surface: '#e5e1e4'
  on-surface-variant: '#d4c5ab'
  inverse-surface: '#e5e1e4'
  inverse-on-surface: '#313032'
  outline: '#9c8f78'
  outline-variant: '#504532'
  surface-tint: '#fbbc00'
  primary: '#ffe2ab'
  on-primary: '#402d00'
  primary-container: '#ffbf00'
  on-primary-container: '#6d5000'
  inverse-primary: '#795900'
  secondary: '#cfbcff'
  on-secondary: '#3b0092'
  secondary-container: '#6d09ff'
  on-secondary-container: '#dccdff'
  tertiary: '#e7e4e8'
  on-tertiary: '#303033'
  tertiary-container: '#cbc8cc'
  on-tertiary-container: '#555457'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdfa0'
  primary-fixed-dim: '#fbbc00'
  on-primary-fixed: '#261a00'
  on-primary-fixed-variant: '#5c4300'
  secondary-fixed: '#e9ddff'
  secondary-fixed-dim: '#cfbcff'
  on-secondary-fixed: '#22005c'
  on-secondary-fixed-variant: '#5500cb'
  tertiary-fixed: '#e4e1e6'
  tertiary-fixed-dim: '#c8c5ca'
  on-tertiary-fixed: '#1b1b1e'
  on-tertiary-fixed-variant: '#47464a'
  background: '#131315'
  on-background: '#e5e1e4'
  surface-variant: '#353437'
  brushed-obsidian: '#0A0A0C'
  wet-asphalt: '#16161A'
  high-def-white: '#F8F8F8'
  terminal-dim: '#404044'
typography:
  display-xl:
    fontFamily: Syne
    fontSize: 120px
    fontWeight: '800'
    lineHeight: 110px
    letterSpacing: -0.04em
  display-xl-mobile:
    fontFamily: Syne
    fontSize: 64px
    fontWeight: '800'
    lineHeight: 60px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Syne
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Syne
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 38px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  label-technical:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-caps:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.1em
spacing:
  unit: 4px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
  column-gap: 32px
---

## Brand & Style
The design system embodies a "Metropolitan Noir" aesthetic—an intersection of high-stakes urban sophistication and nocturnal intensity. It is designed to evoke the feeling of a high-end command center or a brutalist gallery at midnight. The target audience is elite collaborators who value technical mastery and curated depth.

The visual style blends **Brutalism** with **Modern minimalism**. It utilizes heavy structural lines, immense typographic scales, and a "precision-engineered" rhythm. The interface should feel like a physical machine: heavy, purposeful, and immovably crisp. Surfaces are not just flat colors but are treated with "brushed obsidian" textures to create a tactile, cinematic atmosphere.

## Colors
This design system operates exclusively in a dark mode to maintain "nocturnal intensity." 

- **The Void (Neutrals):** The primary background is `neutral_color_hex` (#08080A), with layered surfaces using `brushed-obsidian` and `wet-asphalt`. These are not flat; they should incorporate subtle grain or micro-textures to mimic physical materials.
- **Kinetic Beacons (Accents):** `primary_color_hex` (Electric Amber) is used for critical functional elements, status indicators, and focal points. `secondary_color_hex` (Deep Violet) provides atmospheric depth, used for secondary interactions and subtle glow effects.
- **Structural Force (Text):** All primary content uses `high-def-white`, ensuring an immovably crisp contrast against the dark base.

## Typography
Typography is a structural element, not just content. 

- **Display & Headlines:** Use **Syne** for its avant-garde, geometric presence. At large scales (Display XL), it functions as a visual anchor. Tracking should be tight to emphasize the "immovable" nature of the text.
- **Body:** **Hanken Grotesk** provides a clean, modern contrast that maintains readability within high-density grids.
- **Technical/Data:** **JetBrains Mono** is reserved for metadata, terminal-style readouts, and "Secure Uplink" details, reinforcing the command-center aesthetic.

## Layout & Spacing
The layout uses a **Fixed Grid** system that feels like an architectural blueprint. 

- **Grid:** A 12-column grid on desktop with rigid 32px gaps. On mobile, transition to a 4-column layout.
- **Rhythm:** All components and spacing should be multiples of the 4px unit.
- **Scroll Snapping:** The 4-screen architecture requires `scroll-snap-type: y mandatory`. Each screen must occupy exactly 100vh.
- **The "Terminal" Grid:** On data-heavy screens, use a secondary micro-grid (8px cells) to align technical labels and borders, mimicking a hardware interface.

## Elevation & Depth
Depth is achieved through **Tonal Layers** and **Intentional Shadows** rather than traditional elevation.

- **Layering:** Backgrounds use `neutral_color_hex`. Foreground cards or "modules" use `brushed-obsidian`. 
- **Shadows:** Use extremely sharp, high-opacity black shadows (e.g., `0px 8px 0px rgba(0,0,0,1)`) for a brutalist feel, or very long, diffused "cinematic" shadows that suggest a single light source (the "beacon") hitting an object.
- **Outlines:** Use 1px "terminal-dim" borders to define boundaries between dark surfaces. These act as "architectural strokes."
- **Masking:** Implement reveal animations where content "peels back" to show a deeper technical layer underneath.

## Shapes
The shape language is strictly **Sharp (0px)**. 

Every element—from buttons to cards to images—must have 90-degree corners to maintain the structural, high-end engineering vibe. Circles are permitted only for specific functional "status lamps" or circular data visualizations, but the containers themselves must remain rectangular.

## Components

- **Buttons:** Rectangular with no radius. Primary buttons use the Electric Amber background with black text (`neutral_color_hex`). Hover states should trigger a "flicker" animation or a sharp shift to a Violet border.
- **Input Fields:** Styled as "terminal prompts." Use a bottom border only (1px terminal-dim) with a blinking block cursor in Electric Amber.
- **Cards:** No background shadows; instead, use a 1px solid border of "wet-asphalt." For "High-density interactives," cards should fit into a seamless grid with zero gaps, separated only by their borders.
- **Chips/Status Beacons:** Small rectangular labels using **JetBrains Mono**. Functional status is indicated by a 6px square "lamp" in Amber or Violet next to the text.
- **Lists:** Use rhythmic, monospaced numbering (e.g., 01, 02, 03). Each list item should be separated by a full-width 1px horizontal line.
- **The "Secure Uplink" Terminal:** A specialized component for Screen 4 that uses a monospaced font, low-opacity Violet scanlines, and a persistent "System Ready" indicator in the corner.