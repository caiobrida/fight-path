import {
  rawSnapshot,
  sameRawState,
  type RawSink,
  type RawSnapshot,
} from "./raw";

const defaultCodes = new Set([
  "ArrowUp",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "KeyW",
  "KeyA",
  "KeyS",
  "KeyD",
  "KeyJ",
  "KeyK",
  "KeyL",
  "KeyU",
  "KeyI",
  "KeyO",
]);

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  return (
    target.isContentEditable ||
    ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)
  );
}

export class KeyboardAdapter {
  private readonly pressed = new Set<string>();
  private readonly codes: Set<string>;
  private previous: RawSnapshot | undefined;

  constructor(
    private readonly target: Window,
    private readonly sink: RawSink,
    codes: Iterable<string> = defaultCodes,
  ) {
    this.codes = new Set(codes);
  }

  start(): void {
    this.target.addEventListener("keydown", this.onKeyDown);
    this.target.addEventListener("keyup", this.onKeyUp);
    this.target.addEventListener("blur", this.onBlur);
    this.emit();
  }

  stop(): void {
    this.target.removeEventListener("keydown", this.onKeyDown);
    this.target.removeEventListener("keyup", this.onKeyUp);
    this.target.removeEventListener("blur", this.onBlur);
    this.pressed.clear();
    this.emit();
  }

  private readonly onKeyDown = (event: KeyboardEvent): void => {
    if (!this.codes.has(event.code) || isTypingTarget(event.target)) return;
    event.preventDefault();
    if (event.repeat) return;
    this.pressed.add(event.code);
    this.emit();
  };

  private readonly onKeyUp = (event: KeyboardEvent): void => {
    if (!this.codes.has(event.code)) return;
    this.pressed.delete(event.code);
    this.emit();
  };

  private readonly onBlur = (): void => {
    this.pressed.clear();
    this.emit();
  };

  private emit(): void {
    const current = rawSnapshot(
      "keyboard",
      performance.now(),
      true,
      this.pressed,
    );
    if (!sameRawState(this.previous, current)) {
      this.previous = current;
      this.sink(current);
    }
  }
}
