import type { Locale } from "@/i18n/dictionaries";
import type { Lesson } from "./learning";

function move(
  character: "ken" | "ryu" | "chunli",
  name: string,
  title: string,
) {
  const fighter =
    character === "chunli" ? "Chun-Li" : character === "ken" ? "Ken" : "Ryu";
  return {
    fighter,
    title,
    poster: `/images/sf6/${character}-${name}.webp`,
    video: `/images/sf6/${character}-${name}.mp4`,
    source: `https://www.streetfighter.com/6/character/${character}/movelist`,
    alt: {
      en: `${fighter} demonstrating ${title} in Street Fighter 6`,
      "pt-BR": `${fighter} demonstrando ${title} em Street Fighter 6`,
    } satisfies Record<Locale, string>,
  };
}

export const gameMedia = {
  "ryu-hadoken": move("ryu", "hadoken", "Hadoken"),
  "ryu-shoryuken": move("ryu", "shoryuken", "Shoryuken"),
  "ryu-hashogeki": move("ryu", "hashogeki", "Hashogeki"),
  "chunli-kikoken": move("chunli", "kikoken", "Kikoken"),
  "chunli-swift-thrust": move("chunli", "swift-thrust", "Swift Thrust"),
  "chunli-drive-parry": move("chunli", "drive-parry", "Drive Parry"),
  "chunli-drive-impact": move("chunli", "drive-impact", "Drive Impact"),
  "ken-hadoken": move("ken", "hadoken", "Hadoken"),
  "ken-shoryuken": move("ken", "shoryuken", "Shoryuken"),
  "ken-tatsumaki": move("ken", "tatsumaki", "Tatsumaki Senpu-kyaku"),
  "ken-chin-buster": move("ken", "chin-buster", "Chin Buster"),
  "ken-throw": move("ken", "throw", "Knee Strikes"),
  "ken-drive-impact": move("ken", "drive-impact", "Drive Impact"),
  "ken-drive-parry": move("ken", "drive-parry", "Drive Parry"),
};

export type GameMediaId = keyof typeof gameMedia;

const exerciseMedia: Record<string, GameMediaId> = {
  "universal-quarter-circle-forward-punch": "ryu-hadoken",
  "universal-quarter-circle-back-punch": "ryu-hashogeki",
  "universal-forward-down-diagonal-punch": "ryu-shoryuken",
  "ken-classic-hadoken": "ken-hadoken",
  "ken-classic-shoryuken": "ken-shoryuken",
  "ken-classic-tatsumaki": "ken-tatsumaki",
};

export function mediaForExercise(id: string): GameMediaId {
  return exerciseMedia[id] ?? "ryu-hadoken";
}

const lessonMedia: Record<string, GameMediaId> = {
  "read-an-input": "ryu-hadoken",
  "normal-special-super": "ryu-hashogeki",
  "an-attack-has-phases": "chunli-swift-thrust",
  "hit-block-and-your-turn": "chunli-drive-parry",
  "timing-links-and-cancels": "ryu-hashogeki",
  "block-is-not-every-defense": "chunli-drive-parry",
  "watch-the-air": "ryu-shoryuken",
  "choose-your-range": "chunli-swift-thrust",
  "punish-the-whiff": "chunli-swift-thrust",
  "adapt-with-space": "chunli-kikoken",
  "read-your-resources": "chunli-drive-impact",
  "recognize-drive-options": "chunli-drive-impact",
  "defend-with-a-plan": "chunli-drive-parry",
  "ken-start-small": "ken-hadoken",
  "ken-confirm-and-stop": "ken-chin-buster",
  "ken-pressure-with-a-reason": "ken-throw",
  "one-goal-per-session": "ryu-shoryuken",
  "review-one-round": "chunli-kikoken",
};

export function mediaForLesson(
  lesson: Pick<Lesson, "id" | "track">,
): GameMediaId {
  return (
    lessonMedia[lesson.id] ??
    (lesson.track === "ken" ? "ken-hadoken" : "ryu-hadoken")
  );
}
