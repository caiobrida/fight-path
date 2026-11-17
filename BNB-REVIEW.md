# Ken Classic source review

On November 17, 2026 the owner approved [SuperCombo's Ken combo reference](https://wiki.supercombo.gg/w/Street_Fighter_6/Ken/Combos) directly, without independent in-game validation, battle-build checks or mandatory both-side recordings. FP-42 supersedes the earlier FP-34/FP-35 publication gate. SuperCombo is also a preferred source for future characters and general fighting-game content. See AGENTS.md and SOURCES.md.

These references are sourced, not independently gameplay-verified. No SF6 execution was performed for this import. Never launch, navigate or automate the game; any optional future recording must come from a human.

## Import record

Read the rendered page on November 17, 2026; it reported an edit at 11:03. Imported its current tables, excluding material explicitly marked legacy by the author.

| Source section | Groups | Rows |
| --- | ---: | ---: |
| Starter Combos | 1 | 4 |
| Basic Combos: light, medium, heavy; normal, CH, PC | 9 | 37 |
| Super Art Combos | 4 | 22 |
| Drive Rush Combos | 2 | 10 |
| Drive Impact and Stun Combos | 3 | 34 |
| Max Damage Punishes | 6 | 19 |
| Total | 25 | 126 |

The factual notation, position, damage, Drive cost, Super cost and difficulty are recorded in src/content/data/ken-supercombo.json. Canonical transcription: 13,335 characters, FNV-1a 32-bit digest 706974827, calculated from each group's section, tab, title and rows.

Deduplication produces 124 entries. Tags retain source contexts of repeated rows. One repeated DI entry has conflicting Drive costs; its displayed cost is unknown, never zero. Costs preserve alternatives, including disjoint Super values and total Drive expenditure above six. They describe expenditure rather than minimum starting gauge. Source damage marked incomplete or erroneous is omitted. Generic starters and ellipses remain labeled segments/templates. Notation preserves optional groups, alternatives, delays and repetitions; mirroring changes motions without changing repetition counts.

Each detail links to its source section and notes. Original bilingual interface and practice guidance do not reproduce guide paragraphs. The library is a reference browser, not a frame-accurate combo evaluator.

## Optional evidence and historical artifacts

The six earlier drafts in content-drafts/KEN-BNB-DRAFTS.md are archived preparation and are not imported. Their former manual gate does not apply. Future independently verified recordings can document actual build, conditions, both directions and captions; only then use the stricter verified state. This enrichment does not block sourced publication.

Official isolated-move clips may illustrate a move from a route. Captions distinguish an isolated demonstration from the complete combo; these clips do not prove the imported route.
