import {
  attacks,
  createSample,
  resolveDirection,
  type Attack,
  type InputSample,
} from "./input";
import type { DeviceKind, RawSnapshot } from "@/devices/raw";

export const directionalActions = ["up", "down", "left", "right"] as const;
export const controlActions = [...directionalActions, ...attacks] as const;

export type ControlAction = (typeof controlActions)[number];
export type ControlMapping = Readonly<Record<ControlAction, string>>;

const defaults: Record<DeviceKind, ControlMapping> = {
  keyboard: {
    up: "ArrowUp",
    down: "ArrowDown",
    left: "ArrowLeft",
    right: "ArrowRight",
    LP: "KeyJ",
    MP: "KeyK",
    HP: "KeyL",
    LK: "KeyU",
    MK: "KeyI",
    HK: "KeyO",
  },
  gamepad: {
    up: "Button12",
    down: "Button13",
    left: "Button14",
    right: "Button15",
    LP: "Button0",
    MP: "Button1",
    HP: "Button2",
    LK: "Button3",
    MK: "Button4",
    HK: "Button5",
  },
  touch: {
    up: "TouchUp",
    down: "TouchDown",
    left: "TouchLeft",
    right: "TouchRight",
    LP: "TouchLP",
    MP: "TouchMP",
    HP: "TouchHP",
    LK: "TouchLK",
    MK: "TouchMK",
    HK: "TouchHK",
  },
};

export function defaultMapping(device: DeviceKind): ControlMapping {
  return { ...defaults[device] };
}

export function assignControl(
  mapping: ControlMapping,
  action: ControlAction,
  control: string,
): ControlMapping {
  if (!control || control.length > 60) throw new RangeError("Invalid control");
  if (
    controlActions.some(
      (other) => other !== action && mapping[other] === control,
    )
  )
    throw new RangeError("Control is already assigned");
  return { ...mapping, [action]: control };
}

export function mapRaw(
  snapshot: RawSnapshot,
  mapping: ControlMapping,
): InputSample {
  const held = new Set(snapshot.controls);
  const horizontal =
    held.has(mapping.left) && held.has(mapping.right)
      ? 0
      : held.has(mapping.left)
        ? -1
        : held.has(mapping.right)
          ? 1
          : snapshot.horizontal;
  const vertical =
    held.has(mapping.up) && held.has(mapping.down)
      ? 0
      : held.has(mapping.up)
        ? -1
        : held.has(mapping.down)
          ? 1
          : snapshot.vertical;
  const buttons = attacks.filter((attack: Attack) => held.has(mapping[attack]));
  return createSample(
    snapshot.atMs,
    resolveDirection(horizontal, vertical),
    buttons,
  );
}

function isMapping(value: unknown): value is ControlMapping {
  if (!value || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;
  const controls = controlActions.map((action) => record[action]);
  return (
    controls.every(
      (control) =>
        typeof control === "string" &&
        control.length > 0 &&
        control.length <= 60,
    ) && new Set(controls).size === controls.length
  );
}

export function loadMapping(
  storage: Pick<Storage, "getItem">,
  device: DeviceKind,
): ControlMapping {
  try {
    const saved = storage.getItem(`fightpath-mapping-v1-${device}`);
    const parsed: unknown = saved ? JSON.parse(saved) : null;
    return isMapping(parsed) ? parsed : defaultMapping(device);
  } catch {
    return defaultMapping(device);
  }
}

export function saveMapping(
  storage: Pick<Storage, "setItem">,
  device: DeviceKind,
  mapping: ControlMapping,
): void {
  if (!isMapping(mapping)) throw new RangeError("Invalid mapping");
  storage.setItem(`fightpath-mapping-v1-${device}`, JSON.stringify(mapping));
}
