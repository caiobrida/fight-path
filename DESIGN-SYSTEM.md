# FightPath design system

The owner authorized continuing through implementation on 2026-11-17. The concrete visual reference is `design/direction.html`; open it directly in a browser. It demonstrates home, track cards and execution workspace at desktop/mobile widths without third-party assets or network requests. This reference is reviewable without pausing the approved backlog.

## Decisions

Use React Aria Components for complex interaction behavior and existing plain CSS for the visual layer. Use native HTML for simple actions and real-time input capture. Use Lucide for general interface icons, never as a substitute for game notation. Avoid adding a second primitive family or a CSS framework migration. Registry metadata checked on 2026-11-17 lists React Aria's Apache-2.0 license and React 19 peer range, and Lucide's ISC license and React 19 peer range. Verify the actual installation/build in FP-26; metadata is not a runtime compatibility test.

Color roles: canvas `#10131b`, surface `#1a2230`, raised `#253044`, border `#465165`, strong text `#f7f7f3`, muted text `#c6ccd5`, accent `#ffad71`, accent text `#10131b`, success `#8cdbaf`, danger `#ffaaa5`, focus white. Use text/icons in addition to color. Avoid transparent gradients behind body copy and live feedback.

Use system sans-serif for body copy and a heavy condensed system stack for short display headings, with no externally loaded fonts. This provides Portuguese coverage and avoids extra font transfer/licensing dependencies. Scale body 16/18px, labels 14px, captions 12px, section headings 28–40px and hero display 56–100px. Keep body measure around 65ch.

Spacing uses 4/8/12/16/24/32/48/64px increments; controls target 44px minimum height and action groups use at least 12px gaps. Use 6px action radii and 12–20px surfaces. Only primary actions use filled orange; secondary actions have a visible border, quiet links remain recognizable, and destructive actions have separate warning styling. Focus indicators must remain visible on every interactive element.

Implement mobile-first single-column layouts, then add columns above 768px. Keep learning text quiet and readable; keep controls/feedback near the top of the practice workspace. Header navigation and locale selection persist across sections. Images use reserved aspect ratios and documented provenance. Motion is optional and disabled under reduced motion; clips require play/pause and a static explanation.

## Ownership and verification

The component gallery will demonstrate shipped variants, focus/disabled/loading/error states and both locales. Components include action links/buttons, cards, fields, alerts, badges, notation, progress and the dialog/tabs needed by screens. Do not implement an unused component inventory merely to match a checklist. Clerk appearance uses its supported API, not selectors that override its internal controls. Keep control adapters independent of design-system press handling.

FP-26 supplies install/build and accessibility checks; FP-27/28 integrate the screens; FP-37 owns media; FP-40 records measured responsive/device evidence. The standalone reference contains illustrative navigation and a fictitious controller state labeled as an example, not a claim of working hardware or a shipped route.
