import { quantizeAxis } from "@/domain/input";
import {
  activeController,
  controllerIndex,
  readControllers,
} from "./controller-selection";
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
  gamepad.axes.forEach((axis, index) => {
    const direction = quantizeAxis(axis);
    if (direction) controls.push(`Axis${index}${direction < 0 ? "-" : "+"}`);
  });
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
  private running = false;

  constructor(
    private readonly target: Window,
    private readonly sink: RawSink,
  ) {}

  start(): void {
    if (this.running) return;
    this.running = true;
    if (typeof this.target.navigator.getGamepads !== "function") {
      this.sink(gamepadSnapshot(null, performance.now()));
      return;
    }
    this.target.addEventListener("blur", this.onBlur);
    this.target.document?.addEventListener(
      "visibilitychange",
      this.onVisibility,
    );
    this.target.addEventListener("focus", this.onFocus);
    this.target.addEventListener("gamepadconnected", this.onConnection);
    this.target.addEventListener("gamepaddisconnected", this.onConnection);
    this.target.addEventListener(
      "fightpath-controller-change",
      this.onSelection,
    );
    this.frame = this.target.requestAnimationFrame(this.poll);
  }

  stop(): void {
    this.running = false;
    if (this.frame !== undefined) this.target.cancelAnimationFrame(this.frame);
    this.target.removeEventListener("blur", this.onBlur);
    this.target.document?.removeEventListener(
      "visibilitychange",
      this.onVisibility,
    );
    this.target.removeEventListener("focus", this.onFocus);
    this.target.removeEventListener("gamepadconnected", this.onConnection);
    this.target.removeEventListener("gamepaddisconnected", this.onConnection);
    this.target.removeEventListener(
      "fightpath-controller-change",
      this.onSelection,
    );
    this.emit(gamepadSnapshot(null, performance.now()));
  }

  private readonly onBlur = (): void => {
    this.suspended = true;
    this.emit(gamepadSnapshot(null, performance.now()));
  };

  private readonly onFocus = (): void => {
    if (this.target.document?.hidden) return;
    this.suspended = false;
    this.poll();
  };

  private readonly onConnection = (): void => {
    this.poll();
  };

  private readonly onSelection = (): void => {
    this.emit(gamepadSnapshot(null, performance.now()));
    this.poll();
  };

  private readonly poll = (): void => {
    if (!this.running) return;
    if (this.frame !== undefined) this.target.cancelAnimationFrame(this.frame);
    let gamepad: Gamepad | null = null;
    try {
      if (!this.suspended)
        gamepad = activeController(
          readControllers(this.target),
          controllerIndex(),
        );
    } catch {
      gamepad = null;
    }
    this.emit(gamepadSnapshot(gamepad, performance.now()));
    this.frame = this.target.requestAnimationFrame(this.poll);
  };

  private readonly onVisibility = (): void => {
    if (this.target.document.hidden) this.onBlur();
    else this.onFocus();
  };

  private emit(current: RawSnapshot): void {
    if (!sameRawState(this.previous, current)) {
      this.previous = current;
      this.sink(current);
    }
  }
}
