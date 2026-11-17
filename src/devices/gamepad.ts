import { quantizeAxis } from "@/domain/input";
import {
  rawSnapshot,
  sameRawState,
  type RawSink,
  type RawSnapshot,
} from "./raw";

export function gamepadSnapshot(
  gamepad: Gamepad | null,
  atMs: number,
): RawSnapshot {
  if (!gamepad) return rawSnapshot("gamepad", atMs, false, []);
  const controls = gamepad.buttons.flatMap((button, index) =>
    button.pressed ? [`Button${index}`] : [],
  );
  return rawSnapshot(
    "gamepad",
    atMs,
    true,
    controls,
    quantizeAxis(gamepad.axes[0] ?? 0),
    quantizeAxis(gamepad.axes[1] ?? 0),
  );
}

export class GamepadAdapter {
  private frame: number | undefined;
  private previous: RawSnapshot | undefined;
  private suspended = false;

  constructor(
    private readonly target: Window,
    private readonly sink: RawSink,
  ) {}

  start(): void {
    if (typeof this.target.navigator.getGamepads !== "function") {
      this.sink(gamepadSnapshot(null, performance.now()));
      return;
    }
    this.target.addEventListener("blur", this.onBlur);
    this.target.addEventListener("focus", this.onFocus);
    this.target.addEventListener("gamepadconnected", this.onConnection);
    this.target.addEventListener("gamepaddisconnected", this.onConnection);
    this.frame = this.target.requestAnimationFrame(this.poll);
  }

  stop(): void {
    if (this.frame !== undefined) this.target.cancelAnimationFrame(this.frame);
    this.target.removeEventListener("blur", this.onBlur);
    this.target.removeEventListener("focus", this.onFocus);
    this.target.removeEventListener("gamepadconnected", this.onConnection);
    this.target.removeEventListener("gamepaddisconnected", this.onConnection);
    this.emit(gamepadSnapshot(null, performance.now()));
  }

  private readonly onBlur = (): void => {
    this.suspended = true;
    this.emit(gamepadSnapshot(null, performance.now()));
  };

  private readonly onFocus = (): void => {
    this.suspended = false;
    this.poll();
  };

  private readonly onConnection = (): void => {
    this.poll();
  };

  private readonly poll = (): void => {
    if (this.frame !== undefined) this.target.cancelAnimationFrame(this.frame);
    const gamepad = this.suspended
      ? null
      : ([...this.target.navigator.getGamepads()].find(
          (item): item is Gamepad => item !== null,
        ) ?? null);
    this.emit(gamepadSnapshot(gamepad, performance.now()));
    this.frame = this.target.requestAnimationFrame(this.poll);
  };

  private emit(current: RawSnapshot): void {
    if (!sameRawState(this.previous, current)) {
      this.previous = current;
      this.sink(current);
    }
  }
}
