export type DeviceKind = "keyboard" | "gamepad" | "touch";

export type RawSnapshot = Readonly<{
  device: DeviceKind;
  atMs: number;
  connected: boolean;
  horizontal: number;
  vertical: number;
  controls: readonly string[];
}>;

export type RawSink = (snapshot: RawSnapshot) => void;

export function rawSnapshot(
  device: DeviceKind,
  atMs: number,
  connected: boolean,
  controls: Iterable<string>,
  horizontal = 0,
  vertical = 0,
): RawSnapshot {
  return {
    device,
    atMs,
    connected,
    horizontal,
    vertical,
    controls: [...new Set(controls)].sort(),
  };
}

export function sameRawState(
  left: RawSnapshot | undefined,
  right: RawSnapshot,
): boolean {
  return Boolean(
    left &&
    left.device === right.device &&
    left.connected === right.connected &&
    left.horizontal === right.horizontal &&
    left.vertical === right.vertical &&
    left.controls.join() === right.controls.join(),
  );
}
