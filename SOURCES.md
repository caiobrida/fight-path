# Game information sources

FightPath must not present remembered game details as facts. Every game-specific lesson records a source URL, access date, game version or patch when known, and the exact claim it supports. Prefer current Capcom material. A community source may fill a gap only when it has a strong editorial record and is cross-checked before publication. Recheck move data after major game updates.

Owner decision, November 17, 2026: [SuperCombo Wiki](https://wiki.supercombo.gg/) is a trusted source to consult for general fighting-game topics, systems, character strategy and future character content. [Ken / Combos](https://wiki.supercombo.gg/w/Street_Fighter_6/Ken/Combos) is approved for publishing the current combo reference directly from the source, without independent in-game validation, battle-build reproduction or mandatory clips. This is an explicit exception to the earlier cross-check/execution publication gate. Preserve notation, conditions, alternative routes and provenance; label these references `sourced`, never independently `verified`. The SF6 automation prohibition remains in force.

FP-42 captured the 126 rows of the current Starter, Basic, Super Art, Drive Rush, Drive Impact/Stun and Max Damage tables on November 17, 2026. The page reports last edited at 11:03. Raw factual fields are in `src/content/data/ken-supercombo.json`; exact transcription was checked against the rendered table data (126 rows; canonical FNV-1a 32-bit digest 706974827). Dedupe yields 124 entries. These are source-derived notations and metrics, not copied guide paragraphs. Retain alternatives and incomplete templates. Repeated rows with conflicting resource values produce an unknown cost rather than a fabricated zero. Damage marked incomplete or erroneous by the source is omitted. Earlier tables explicitly identified as legacy by the author were excluded.

Entries with source caveats, incomplete metrics or conflicting costs carry a visible badge and detail notice directing readers to the source notes. Do not silently promote an editorial caveat into a recommended optimization.

The input evaluator is a FightPath approximation. Its timing windows are product rules, not claims about Street Fighter 6. Label them accordingly in the interface.

## Initial source register

FP-41 visual references were directly inspected on Capcom's [Ryu](https://www.streetfighter.com/6/character/ryu/movelist), [Chun-Li](https://www.streetfighter.com/6/character/chunli/movelist) and [Ken](https://www.streetfighter.com/6/character/ken/movelist) command-list pages on November 17, 2026. `MEDIA.md` and `media-sources.json` record the exact portrait/clip URLs and transformation scope. Ryu's Hadoken, Shoryuken and Hashogeki clips illustrate the corresponding universal motions; the backward-motion Hashogeki command was checked visually as down, down-back, back + punch. Characters in general lessons are illustrative and do not create additional supported character paths. No new current-frame-data or combo-execution certification follows from these source clips.

| ID | Source | Accessed | Supports | Limits |
| --- | --- | --- | --- | --- |
| CAPCOM-KEN-GUIDE | [Street Fighter 6 Character Guide: Ken](https://www.youtube.com/watch?v=1SX2m7sqbtA), official Street Fighter channel | 2026-11-17 | Ken is a Street Fighter 6 character; official character guide | Launch-era guide; move details require direct video review and a current command list |
| CAPCOM-KEN-MOVES | [Capcom Ken character move list](https://www.streetfighter.com/6/character/ken/movelist) | 2026-11-17 | Classic Hadoken: down, down-forward, forward + punch; Shoryuken: forward, down, down-forward + punch; grounded Tatsumaki Senpu-kyaku: down, down-back, back + kick | Visually verified in Capcom's Classic tab in a browser; site does not state a patch number in this view; recheck after updates |
| SUPERCOMBO-KEN | [SuperCombo Street Fighter 6 Ken page](https://wiki.supercombo.gg/w/Street_Fighter_6/Ken) | 2026-11-17 | Community cross-check for names and commands | Community maintained; may lag a patch; automated access returned 403 |

The first Ken lessons use only the three commands confirmed in CAPCOM-KEN-MOVES. FightPath's 1200 ms motion limit, 600 ms gap limit, and 10-success goal are training rules, not Street Fighter 6 engine properties. The grounded Tatsumaki lesson excludes the separate aerial command.

## Content review procedure

Owner instruction, November 17, 2026: any installed-SF6 execution evidence must be obtained manually by a human. Do not automate SF6 even in offline training or after announcing computer use. This decision follows the automation restrictions and account-enforcement provisions in section 4 of the [Steam Subscriber Agreement](https://store.steampowered.com/subscriber_agreement/). It is not a prediction of a specific ban or an assertion that a mode is exempt. Optional independent evidence is separate from the approved publication of SuperCombo-sourced references above.

`RESEARCH-CONTENT.md` records the earlier study. Its manual route/build publication gate is superseded for approved SuperCombo content by the owner decision above. Independently gameplay-verified claims still need their actual evidence, and media provenance remains required. `DESIGN-STUDY.md` records visual references separately from factual game evidence.

1. Add source entries before adding game-specific exercise data.
2. Record the supported claim and source ID alongside each content entry.
3. Prefer the current Capcom command list or in-game command list for control input claims.
4. Compare changed content after a game patch; do not silently retain uncertain data.
5. If a claim cannot be verified, omit it or explicitly label it as a FightPath training approximation.

## Systems lessons review

Browser control labels use the [W3C Gamepad standard layout](https://www.w3.org/TR/gamepad/), reviewed November 17, 2026. Bilingual physical-position labels apply only to browser-reported standard mappings; nonstandard controls keep raw tokens. Vendor symbols are not guessed.

FP-32 uses Capcom-authored 2022 introductions for high-level Drive concepts and the separate Super resource, reviewed November 17, 2026. No current numeric costs, frame data or exact build certification is published. The lesson patch metadata distinguishes conceptual, verified and pending evidence; pending records are unavailable. After a balance update, set affected records pending, inspect current official changes and reproduce dependent rules before promoting them with an exact battle build.
