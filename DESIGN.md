---
name: Analytics Dashboard
description: Multi-stream analytics for YouTube channels and web stores
colors:
  channel-gold: "#f5a623"
  aqua-signal: "#22d3c5"
  cross-channel-lavender: "#a78bfa"
  bg-base: "#f0f0f5"
  bg-surface: "#fafafa"
  bg-card: "#ffffff"
  border: "#e2e2ec"
  text-primary: "#0d0d14"
  text-muted: "#6b7280"
  positive: "#15803d"
  negative: "#b91c1c"
typography:
  metric:
    fontFamily: '"IBM Plex Mono", monospace'
    fontSize: "clamp(1.4rem, 3vw, 1.875rem)"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: '"IBM Plex Mono", monospace'
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  label:
    fontFamily: '"IBM Plex Mono", monospace'
    fontSize: "0.625rem"
    fontWeight: 500
    letterSpacing: "0.1em"
  body:
    fontFamily: '"DM Sans", sans-serif'
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.5
  caption:
    fontFamily: '"DM Sans", sans-serif'
    fontSize: "0.625rem"
    fontWeight: 500
    lineHeight: 1
rounded:
  xs: "4px"
  sm: "6px"
  md: "8px"
  lg: "12px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
components:
  stat-card:
    backgroundColor: "{colors.bg-card}"
    rounded: "{rounded.lg}"
    padding: "16px"
  filter-chip-active:
    backgroundColor: "{colors.channel-gold}18"
    textColor: "{colors.channel-gold}"
    rounded: "{rounded.sm}"
    padding: "6px 8px"
  filter-chip-inactive:
    backgroundColor: "transparent"
    textColor: "{colors.text-muted}"
    rounded: "{rounded.sm}"
    padding: "6px 8px"
  date-segment-active:
    backgroundColor: "{colors.channel-gold}"
    textColor: "#0f0f11"
    rounded: "{rounded.xs}"
    padding: "4px 12px"
  nav-item-active:
    backgroundColor: "{colors.bg-card}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.sm}"
    padding: "8px 10px"
  nav-item-inactive:
    backgroundColor: "transparent"
    textColor: "{colors.text-muted}"
    rounded: "{rounded.sm}"
    padding: "8px 10px"
---

# Design System: Analytics Dashboard

## 1. Overview

**Creative North Star: "The Signal Board"**

This system is built for operators, not observers. Agency users scanning revenue across multiple channels and stores need a surface that processes on their behalf — one that reports without performing. The Signal Board is calm under information density. Color appears only to encode meaning: three semantic accents mark three distinct revenue streams, and their presence on any surface tells you exactly what data you're looking at before you read a label.

The aesthetic is a direct rejection of the four failure modes identified in PRODUCT.md: no neon-on-dark maximalism, no generic SaaS warmth, no bureaucratic over-charting, no illustrative noise. Instead: near-black ink on blue-tinted neutrals, IBM Plex Mono carrying every number, DM Sans handling the prose that contextualizes it. The interface does not announce itself. It disappears behind the data.

Dark mode is first-class. The system supports both light and dark, but the dark palette (`#0f0f11` base → `#18181c` surface → `#1e1e24` card) is where the Signal Board aesthetic is most fully realized — low ambient light, high signal contrast, accent colors burning through at full saturation without needing to fight a bright background.

**Key Characteristics:**
- Monospace for all quantitative content; sans-serif for all prose and context
- Three semantic accents only; no additional decorative color
- Semantic-glow elevation on data cards; flat elsewhere
- Tight typographic hierarchy via scale and weight, not weight alone
- Collapsible sidebar with per-stream filter state encoded in accent color

## 2. Colors: The Signal Palette

Three semantic accents encode revenue stream identity; all neutral structure is blue-tinted to avoid clinical white.

### Primary
- **Channel Gold** (`#f5a623`): YouTube stream. Used for all YouTube-adjacent accents: stat card glow, sparkline, active filter chip background, date range picker active segment on YouTube pages. The warmth deliberately contrasts against the cool neutral base.

### Secondary
- **Aqua Signal** (`#22d3c5`): Web Store stream. Used identically to Channel Gold but for all store-adjacent surfaces. Cool and slightly digital — a deliberate contrast to Channel Gold's warmth.

### Tertiary
- **Cross-Channel Lavender** (`#a78bfa`): Combined overview. Used when both streams are unified into a single metric. The intermediate hue between gold and teal; visually implies synthesis.

### Neutral (light mode)
- **Ink Black** (`#0d0d14`): Primary text. Near-black with a barely perceptible blue-violet tint — never pure `#000`.
- **Stone Gray** (`#6b7280`): Muted text, secondary labels, meta information. Same value in both modes.
- **Cool Linen** (`#f0f0f5`): Page base. Slightly blue-tinted to prevent clinical flatness.
- **Off-White Surface** (`#fafafa`): Mid-layer surfaces — sidebar, header background.
- **White Card** (`#ffffff`): Data cards, table containers.
- **Cool Border** (`#e2e2ec`): All dividers and container outlines. Matches the blue-tint of the base.
- **Signal Green** (`#15803d` light / `#4ade80` dark): Positive deltas. High contrast in both modes.
- **Alert Red** (`#b91c1c` light / `#f87171` dark): Negative deltas.

### Named Rules
**The Three Streams Rule.** Channel Gold, Aqua Signal, and Cross-Channel Lavender are the only decorative accents in the system. These three colors encode three distinct data streams. Adding a fourth accent — for hierarchy, hover states, emphasis, or brand — collapses the semantic encoding. Forbidden.

**The Tinted Neutral Rule.** Every neutral — text, background, border — is slightly blue-tinted toward the primary text hue. Pure `#000000` and pure `#ffffff` are prohibited. The tint is subtle (chroma 0.005–0.01 in OKLCH terms) but prevents the system from feeling generic.

## 3. Typography

**Display Font:** IBM Plex Mono (monospace fallback)
**Body Font:** DM Sans (system sans-serif fallback)

**Character:** Two typefaces, two registers of information. IBM Plex Mono carries every measurement, every label, every value that means something quantitative. DM Sans handles the prose that contextualizes it — subtitles, help text, meta copy. The contrast between the two is the system's only expressive gesture. Do not blur the boundary.

### Hierarchy
- **Metric** (600 weight, `clamp(1.4rem, 3vw, 1.875rem)`, line-height 1, tracking -0.02em): Stat card primary values. The most important number on any given surface. IBM Plex Mono. Scales fluidly on narrow viewports.
- **Headline** (600 weight, 1rem / 16px, line-height 1.2, tracking -0.01em): Page titles in the sticky header. IBM Plex Mono. Tight and precise.
- **Label** (500 weight, 10px, tracking 0.1em, uppercase): Section headings in sidebar, table column headers, stat card labels. IBM Plex Mono. Uppercase + wide tracking creates a distinct information tier without competing with metric values.
- **Body** (400 weight, 12px / 0.75rem, line-height 1.5): Header subtitles, helper text, prose context. DM Sans. Not used for numbers.
- **Caption** (500 weight, 10px, line-height 1): Delta badges ("vs prior period"), sidebar UI labels. DM Sans. Slightly heavier than body to hold at this size.

### Named Rules
**The Mono Signal Rule.** All quantitative content — metric values, table cell data, date range labels, filter chip names — is set in IBM Plex Mono. DM Sans handles all non-quantitative prose. The typeface is a signal about the type of content. Never set a number in DM Sans; never set a navigational element or descriptive sentence in IBM Plex Mono.

## 4. Elevation

This system uses **semantic-glow elevation** for data cards and flat tonal layering everywhere else. The philosophy: a surface's depth communicates its data identity, not its importance in a visual hierarchy.

StatCards carry a three-layer shadow composed of a 1px accent-colored ring (`${accent}1f`), a low ambient lift (`0 1px 3px rgba(0,0,0,0.07)`), and a wide soft bloom (`0 6px 20px ${accent}0d`). The accent color in the shadow is the same accent color as the card's data stream — Channel Gold, Aqua Signal, or Cross-Channel Lavender. The glow tells you which stream owns the card before you read the label.

Tables, containers, sidebar sections, and the header use no shadows. Depth is expressed through background color stepping: base (`#f0f0f5`) → surface (`#fafafa`) → card (`#ffffff`). The sticky header uses `backdrop-blur-sm` with a translucent background (`rgba(250,250,250,0.88)`) — the only blur effect in the system, and only in service of the sticky layering affordance.

### Shadow Vocabulary
- **Semantic card glow** (`0 0 0 1px ${accent}1f, 0 1px 3px rgba(0,0,0,0.07), 0 6px 20px ${accent}0d`): StatCards only. Accent color is the stream color for that card.

### Named Rules
**The Flat-By-Default Rule.** Surfaces are flat at rest. Shadows appear only on StatCards, where the glow is semantic (it encodes stream identity), not decorative. No box-shadow on tables, sidebar sections, containers, or the header. Depth comes from background stepping.

**The No-Blur Rule.** Backdrop blur is used exactly once: the sticky page header. Nowhere else. Blurred glass cards are an absolute ban per PRODUCT.md's anti-reference list.

## 5. Components

### Stat Cards
The signature component. Each card encodes its data stream through three synchronized signals: the accent-tinted radial gradient behind the content, the top and bottom 2px accent bars, and the semantic glow shadow. These three signals fire together — never use one without the others.

- **Shape:** Gently curved edges (12px radius / `rounded-xl`)
- **Background:** Accent-tinted radial gradient (`${accent}10` at top-left origin, fading to transparent at 55%) over card white
- **Top and bottom bars:** 2px solid, `${accent}`, full width. Both present simultaneously.
- **Atmospheric bloom:** Linear gradient from `${accent}1a` to transparent, 40px tall, behind the content zone below the top bar
- **Internal padding:** 16px all sides
- **Shadow:** Semantic card glow (see Elevation)
- **Content zones:** Label + sparkline row (top) → metric value → separator → delta badge. Fixed order.

### Sparklines
Inline SVG, 96×40px, rendered inside stat cards. Catmull-Rom smooth curve with gradient fill. Endpoint dot: large hollow circle (5px, 18% opacity) + solid center (2.5px). Color matches the card's accent. Aria-hidden.

### Delta Badges
- **Shape:** 4px radius (`rounded`)
- **Positive:** Green-tinted background (`rgba(74,222,128,0.14)`), `--positive` text color, upward arrow SVG
- **Negative:** Red-tinted background (`rgba(248,113,113,0.14)`), `--negative` text color, downward arrow SVG
- **Typography:** IBM Plex Mono, 10px, 600 weight

### Filter Chips (Sidebar)
Used in the Channels and Stores sections of the sidebar. Active and inactive states differ completely.

- **Active:** `${stream.color}18` background, `1px solid ${stream.color}50` border, `${stream.color}` text — all dynamic from the stream's color. 6px radius.
- **Inactive:** Transparent background, transparent border, `--text-muted` text. 6px radius.
- **Typography:** DM Sans (sans), 12px, 500 weight — exception to the Mono Signal Rule; these are navigation labels, not data values.

### Date Range Picker
A segmented control, not a calendar picker. Three options: 7D / 30D / 90D.

- **Container:** `bg-surface`, 6px radius, 1px `border-color` border, 2px inner padding
- **Inactive segment:** Transparent, `--text-muted` text, IBM Plex Mono 12px 500 weight
- **Active segment:** `${accentColor}` background, `#0f0f11` text (always near-black regardless of mode), 4px radius, IBM Plex Mono
- **Default accent:** Channel Gold (`#f5a623`) unless page context overrides

### Navigation (Sidebar)
Three items: Combined (LayoutDashboard icon), YouTube (Youtube icon), Web Store (ShoppingBag icon).

- **Active:** `bg-card` background, `border border-border`, `text-primary` — clearly distinct from inactive
- **Inactive:** Transparent, `text-muted`, `hover:text-primary hover:bg-card/50`
- **Typography:** DM Sans, 12px, 500 weight
- **Icon size:** 15px, 2px stroke
- **Collapsed state:** Icon only, centered; all labels hidden

### Data Table
Compact, information-dense. No outer shadow; relies on `border border-border bg-card rounded-lg`.

- **Header cells:** IBM Plex Mono, 10px, uppercase, tracking-widest (`0.1em`), `text-muted`. Sort icon (10px ChevronUp/Down) in Channel Gold when active, 20% opacity when inactive.
- **Body cells:** IBM Plex Mono, 12px, `text-primary`
- **Row separators:** `border-b border-border/50`. Last row: no border.
- **Row hover:** `hover:bg-surface/50` — subtle, non-disruptive
- **Padding:** `px-4 py-3` per cell

## 6. Do's and Don'ts

### Do:
- **Do** use IBM Plex Mono for all numbers, values, labels, and date strings. DM Sans for all prose and contextual text.
- **Do** encode stream identity through all three accent signals simultaneously on StatCards: radial gradient, top+bottom bars, and semantic glow shadow.
- **Do** use `#0d0d14` (Ink Black) for primary text — slightly blue-tinted, never pure `#000`.
- **Do** respect background stepping for depth: base → surface → card. Nested cards (card on card on card) are forbidden.
- **Do** keep the three accent colors semantically exclusive: Channel Gold = YouTube only, Aqua Signal = Store only, Cross-Channel Lavender = Combined only.
- **Do** use WCAG AA contrast. Every interactive element must have a visible focus ring. Accent colors serve as redundant signals alongside labels and icons.
- **Do** uppercase all Label-tier text (section headers, table column labels). The uppercase + wide tracking is the visual identifier of the label tier; drop either one and it reads as body text.

### Don't:
- **Don't** add a fourth accent color for any reason — hierarchy, emphasis, hover state, new feature, or brand. The Three Streams Rule is absolute.
- **Don't** use neon-on-dark styling: oversaturated colors, neon glow effects, bright color fills on dark backgrounds. Grafana-default aesthetics are the explicit anti-reference.
- **Don't** use SaaS-cream warmth: rounded-everything, warm off-whites (`#fefae0` territory), friendly illustrative icons, large gradient buttons. This is a professional tool, not a consumer product.
- **Don't** over-chart: don't add charts for completeness, only for insight. The Google Analytics anti-reference means no data viz that exists to fill space.
- **Don't** use glassmorphism: no `backdrop-filter: blur()` on cards, panels, or modals. The sticky header's backdrop blur is the single sanctioned exception.
- **Don't** use gradient text (`background-clip: text`). Ever.
- **Don't** use side-stripe borders (`border-left` > 1px as a colored accent). Rewrite with full borders, background tints, or nothing.
- **Don't** use the hero-metric template: big number, small label, gradient accent, supporting stats below. The StatCard has a specific structure — sparkline, value, delta — and that structure is the component. Don't flatten it to a vanity number.
- **Don't** add Canva-adjacent colorfulness: multiple decorative colors, gradient buttons, illustrated icons, or color used for visual interest rather than semantic encoding.
- **Don't** place DM Sans on quantitative data — even if the number is small or "doesn't matter". The typeface boundary is the signal.
