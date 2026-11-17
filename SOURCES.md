# Game information sources

FightPath must not present remembered game details as facts. Every game-specific lesson records a source URL, access date, game version or patch when known, and the exact claim it supports. Prefer current Capcom material. A community source may fill a gap only when it has a strong editorial record and is cross-checked before publication. Recheck move data after major game updates.

The input evaluator is a FightPath approximation. Its timing windows are product rules, not claims about Street Fighter 6. Label them accordingly in the interface.

## Initial source register

| ID | Source | Accessed | Supports | Limits |
| --- | --- | --- | --- | --- |
| CAPCOM-KEN-GUIDE | [Street Fighter 6 Character Guide: Ken](https://www.youtube.com/watch?v=1SX2m7sqbtA), official Street Fighter channel | 2026-11-17 | Ken is a Street Fighter 6 character; official character guide | Launch-era guide; move details require direct video review and a current command list |
| CAPCOM-KEN-MOVES | [Capcom Ken character move list](https://www.streetfighter.com/6/character/ken/movelist) | 2026-11-17 | Classic Hadoken: down, down-forward, forward + punch; Shoryuken: forward, down, down-forward + punch; grounded Tatsumaki Senpu-kyaku: down, down-back, back + kick | Visually verified in Capcom's Classic tab in a browser; site does not state a patch number in this view; recheck after updates |
| SUPERCOMBO-KEN | [SuperCombo Street Fighter 6 Ken page](https://wiki.supercombo.gg/w/Street_Fighter_6/Ken) | 2026-11-17 | Community cross-check for names and commands | Community maintained; may lag a patch; automated access returned 403 |

The first Ken lessons use only the three commands confirmed in CAPCOM-KEN-MOVES. FightPath's 1200 ms motion limit, 600 ms gap limit, and 10-success goal are training rules, not Street Fighter 6 engine properties. The grounded Tatsumaki lesson excludes the separate aerial command.

## Content review procedure

`RESEARCH-CONTENT.md` contains the proposed next curriculum, candidate sources and access limits for FP-29 through FP-37. Research candidates are not approved published claims. No exact current-build Ken BnB was verified in that study. Require direct route/build evidence before publication and media provenance before redistribution. `DESIGN-STUDY.md` records visual references separately from factual game evidence.

1. Add source entries before adding game-specific exercise data.
2. Record the supported claim and source ID alongside each content entry.
3. Prefer the current Capcom command list or in-game command list for control input claims.
4. Compare changed content after a game patch; do not silently retain uncertain data.
5. If a claim cannot be verified, omit it or explicitly label it as a FightPath training approximation.
