# FP-29 — Add the bilingual learning catalog and reader

**Status:** Done. **Priority:** P2. **Dependencies:** FP-26, FP-27 navigation contract; RESEARCH-CONTENT.md.

## Checklist

- [x] Define versioned lesson IDs, track, level, prerequisites, objective, bilingual explanation, example, common mistake, knowledge check and in-game drill.
- [x] Attach source claims, access date, game/build scope, media provenance and draft/reviewed/published state; exclude unverified drafts from public routes.
- [x] Build catalog, track and lesson pages with breadcrumbs, readable widths, glossary links and next/previous navigation.
- [x] Distinguish universal concepts, SF6 systems and Ken Classic; use canonical terminology with Portuguese explanations.
- [x] Add schema checks for missing locale/source/media and invalid prerequisites; choose repository content first unless a CMS has a demonstrated need.
- [x] Keep existing protected practice and account rules; define preview/read access explicitly without exposing account progress.

**Acceptance:** a reviewed sample lesson can be read in both languages and linked to a drill; a lesson without required evidence cannot be published by accident.

**Evidence:** content validation and route/locale checks. Reading completion must not be presented as execution mastery.

Implementation: typed versioned bilingual lesson model, publication filtering, catalog, per-track navigation, lesson reader, source footer and interactive knowledge checks. Source/translation/prerequisite validation runs in the unit suite. Reading is public; account-bound progress and all execution remain protected. The first notation lesson uses the previously reviewed commands.

Final delivery and validation boundaries are recorded in [IMPLEMENTATION-STATUS.md](../IMPLEMENTATION-STATUS.md). Physical devices, externally consented Google flows and current-game clips are not certified by synthetic tests.
