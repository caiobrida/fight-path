# Design system and visual direction study

Date: 2026-11-17. Proposal only. No dependencies, CSS, assets, routes or components have been installed or changed.

## Direction

Keep FightPath's dark navy (`#10131b`), warm orange (`#ffad71`), off-white (`#f7f7f3`) and muted text as starting colors, then define semantic roles and contrast-tested variants. The [official Ken page](https://www.streetfighter.com/6/character/ken) was visually inspected in Chromium: dominant character imagery, warm layered backgrounds, a condensed display title, strong navigation, thin section rules and prominent action shapes. Use those visual principles to create a distinct learning product, with quieter surfaces around text and live inputs. An official-looking layout is not a reason to copy branding, site code or unlicensed image files.

Proposed composition: a compact persistent header; a clear learning promise with one main action and one visibly separate secondary action; an image or controlled short visual; then distinct cards for fundamentals, Ken, BnBs and execution practice. The practice workspace prioritizes current input, target, live device state and useful feedback. XP and long explanations should not push controls off the first useful screen. On mobile, stack actions, keep touch controls reachable and avoid hover-only help.

## Component and token contract

- Color: background, surface levels, border, text, muted text, accent, accent-on-text, success, warning, danger and focus; states must also have text or icons.
- Type: licensed/self-hosted display font for short titles, readable body font with Portuguese accents, predictable heading/body/label/caption scale. Do not stretch a display face across lesson paragraphs.
- Space and shape: documented spacing scale, reading widths, control heights, responsive grids, border/radius and shadow rules. Keep 44px or greater interactive control height as a product target; WCAG AA's target-size rule is 24px with exceptions, not a claim that 44px is its AA minimum.
- Actions: primary filled, secondary outlined, quiet, destructive, icon-only; links that navigate can look like actions without losing anchor semantics. Remove underlining from action controls, retain a discoverable treatment for prose links. Include hover, pressed, focus-visible, disabled and loading.
- First components: Button, ActionLink, IconButton, Input/Select, Tabs, Card, Badge, Alert/Status, Progress, Dialog, Tooltip, EmptyState, Skeleton, Breadcrumb, notation chip and MediaPlayer. Add only components used by the approved screens.
- Document every component with examples and interactions; ensure `en` / `pt-BR`, keyboard focus, zoom, small screens, touch and error states are reviewable in a gallery. Preserve Clerk's components through documented appearance tokens, not broad CSS overrides of its internals.
- Motion: short, optional transitions; reduced-motion support; no flashing decoration behind execution feedback. Demonstrations need pause/play and a static alternative.

## Library options checked

| Option | Fit | Cost / concern | Recommendation |
| --- | --- | --- | --- |
| [React Aria Components](https://react-aria.adobe.com/getting-started) | Accessible behavior with custom CSS; matches the existing CSS-based app and internationalization needs | Style wrappers remain our responsibility; verify package compatibility with the installed React/Next versions before adoption | Preferred proposal for complex interactions, alongside native elements and CSS tokens |
| [shadcn/ui](https://ui.shadcn.com/docs) | Owned component source, consistent variants and fast assembly | Generated code is maintained in the repo; a default Tailwind-based setup would introduce a styling migration here | Valid alternative if FP-25 selects it; not a second parallel component system |
| [Radix Primitives](https://www.radix-ui.com/primitives/docs/overview/accessibility) | Focus management and keyboard behavior for complex primitives, adaptable appearance | Still requires our styling/labels; overlapping behavior with React Aria would add maintenance | Alternative to the chosen primitive family, not an extra default dependency |
| [Lucide](https://lucide.dev/guide/) | Consistent SVG icon set with individual imports | Icons need accessible labels; ordinary interface symbols do not replace sourced game notation | Proposed icon source; review package/license and import only used icons |

Choose one interaction family in FP-25 and document the reason, license, package compatibility and bundle cost. This study does not mandate a new CSS framework or large animation library. Do not replace real-time input listeners with generic button press abstractions without verifying keyboard, pointer capture and multi-touch behavior.

## Images, clips and performance

Create a media inventory before placement: home hero, Ken overview art, footsies/range diagrams, command demonstration, BnB example and lesson thumbnails. For each asset record author, source, permission/license, intended placement, locale-dependent description, dimensions, poster and patch if gameplay is shown. Decorative images should not be used as evidence for a game mechanic.

Prefer original annotated captures, authorized art or official player embeds and original diagrams. An image being visible on the internet is not permission to redistribute it. `RESEARCH-CONTENT.md` records candidate sources and Capcom/YouTube policy references. Do not hotlink arbitrary wiki GIFs. Short MP4/WebM demonstrations can be smaller and controllable alternatives to animated GIFs, as described in [web.dev's video performance guidance](https://web.dev/learn/performance/video-performance). Give players a pause button, captions/transcript and a poster; defer third-party embeds until an explicit play action and review them under `PRIVACY.md`.

Proposed mobile budgets for approval: hero image at most 250KB at its served mobile size; lesson poster at most 100KB; initial visible image transfer at most 500KB; no clip download or third-party player before requested. Set a per-clip budget when its duration/resolution is known. Measure LCP, CLS and interaction performance on the same test device/network before and after; these are proposed targets, not current measured scores.

## Acceptance references

- [WCAG 2.2 target size](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html): targets and spacing, accessed 2026-11-17.
- [WCAG pause/stop/hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html): user control of moving material, accessed 2026-11-17.
- Library documentation and official Ken page above accessed 2026-11-17. Capcom loaded in the browser despite HTTP 403 through the text web tool.
- The current home screenshot and measured zero-gap links are in `AUDIT.md`. New mobile rendering was not verified because the browser viewport override did not apply; acceptance must include actual 320/360/390/768/1280px checks.
