# Media register

FP-41 adds official Street Fighter 6 visual material requested by the owner. Original Capcom URLs and output metadata are recorded in `media-sources.json`. The three portraits and fourteen move posters/clips occupy 3,168,611 bytes combined; MP4 downloads occur only after explicit playback, and offscreen images load lazily. Source resolution is 400 x 224 for the move clips; do not describe them as HD. These byte measurements do not certify real-phone performance.

Reviewed November 17, 2026. Character portraits and short demonstrations were obtained from Capcom's rendered official command lists through the browser asset inventory, without operating SF6. Optimized local copies avoid observed HTTP 403 failures on direct origin requests and avoid adding third-party image/video requests. No wiki GIFs, unofficial creator videos, game-process extraction or fabricated gameplay were used. The original SVG diagrams remain conceptual teaching aids, separate from actual game imagery.

The final visual review caught excessive WebP loss in the initial conversion. Derivatives were regenerated with FFmpeg `-q:v 88` for move posters and `-q:v 86` for portraits, preserving native clip dimensions. Use the codec quality setting rather than the ambiguous generic `-quality` option. Poster frame timestamps, byte sizes and hashes are now recorded alongside the originals. All imagery was decoded and visually rechecked.

## Official visual catalog

| Character | Illustrations | Placement |
| --- | --- | --- |
| Ryu | Portrait, Hadoken, Shoryuken, Hashogeki | Shared home, universal command exercises, notation, attack types, anti-air and practice habits |
| Chun-Li | Portrait, Kikoken, Swift Thrust, Drive Parry, Drive Impact | Shared home, control setup, spacing/footsies, defense, SF6 systems and review habits |
| Ken | Portrait, Hadoken, Shoryuken, Tatsumaki, Chin Buster, Knee Strikes, Drive Parry, Drive Impact | Shared character introduction and Ken-specific learning/practice material |

Sources: [Ryu command list](https://www.streetfighter.com/6/character/ryu/movelist), [Chun-Li command list](https://www.streetfighter.com/6/character/chunli/movelist), [Ken command list](https://www.streetfighter.com/6/character/ken/movelist), accessed November 17, 2026. Move names, selected thumbnails, clip URLs and displayed explanations were inspected directly. Ryu's Hashogeki command was checked as down/down-back/back + punch before associating it with the universal backward-motion exercise. These are illustrations from the official website, not current-build combo certification or a claim that the browser validates these moves in the game.

Copyright in Capcom art and footage remains with CAPCOM. The UI attributes the source; local optimization does not create a new license or imply endorsement. The prior video-policy review is not a blanket artwork license. Keep this provenance and review usage scope for any future public/commercial distribution; do not relabel the assets as original FightPath artwork.

The shared player uses a static poster initially, explicit play/stop and native controls, silent looping after user activation, pause on viewport exit or hidden tab, and unloading when the exercise changes. No movement is forced by page load. Reduced-motion disables interface transitions/entrance/result effects; an explicitly requested demonstration remains controllable. Poster alt text, the nearby written explanation and the official source remain available when playback fails. Efficient short MP4 loops provide the requested GIF-like demonstrations with pause and seek controls.

## Original diagrams and historical guide

| Asset | Author / source | Rights and scope | Placement / size | Accessibility |
| --- | --- | --- | --- | --- |
| `execution-orbit.svg` | Original FightPath geometric illustration | Repository-original; no Capcom assets | Home, 640 x 640 | Localized descriptive alt; static |
| `range-study.svg` | Original FightPath vector diagram | Repository-original; not actual move reach | Footsies and Ken lessons, video poster; 960 x 420 | Localized range caption; decorative poster has empty alt |
| `timing-study.svg` | Original FightPath vector diagram | Repository-original; no timing scale | Fundamentals and habits lessons; 960 x 420 | Localized conceptual caption |
| `resource-study.svg` | Original FightPath vector diagram | Repository-original; no cost specification | SF6 lessons; 960 x 420 | Localized resource caption |
| Official Ken guide | [Street Fighter / Capcom](https://www.youtube.com/watch?v=1SX2m7sqbtA), May 18, 2023 | External embedded player only; no rehosting. Introductory historical footage; no current route certification | First Ken lesson; responsive player | Local poster, explicit load/unload, controls, captions requested where available, written lesson and source link always available |

The [Capcom video policy](https://press.capcom.com/Video-Policy) was inspected. It supports qualifying educational footage with conditions; it is not a blanket redistribution license for official art or other creators' work. No unreviewed gameplay clips were added. Add future captured clips only after recording source/build, permission scope, captions and demonstrable route conditions.

The historical guide follows [YouTube embed parameters](https://developers.google.com/youtube/player_parameters) and [privacy-enhanced embedding](https://support.google.com/youtube/answer/171780). No iframe, thumbnail fetch, preconnect or remote video request exists before explicit loading. Autoplay is disabled; loading and playing are separate actions. Closing unmounts the iframe. The no-cookie domain reduces personalization; it does not eliminate Google data processing. A source link remains usable when embedding fails. No transcript is claimed without verification; the original written lesson provides a separate teaching alternative. Original SVG diagrams remain static; FP-41 interface motion and local demonstrations follow the controls described above.
