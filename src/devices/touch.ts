import {
  rawSnapshot,
  sameRawState,
  type RawSink,
  type RawSnapshot,
} from "./raw";

const diagonalAxes: Record<string, readonly [number, number]> = {
  TouchUpLeft: [-1, -1],
  TouchUpRight: [1, -1],
  TouchDownLeft: [-1, 1],
  TouchDownRight: [1, 1],
};

export function touchSnapshot(
  atMs: number,
  controls: Iterable<string>,
): RawSnapshot {
  const active = [...controls];
  let horizontal = 0;
  let vertical = 0;
  for (const control of active) {
    const axes = diagonalAxes[control];
    if (!axes) continue;
    horizontal += axes[0];
    vertical += axes[1];
  }
  return rawSnapshot(
    "touch",
    atMs,
    true,
    active,
    Math.sign(horizontal),
    Math.sign(vertical),
  );
}

export class TouchAdapter {
  private readonly pointers = new Map<number, string>();
  private previous: RawSnapshot | undefined;

  constructor(
    private readonly root: HTMLElement,
    private readonly sink: RawSink,
  ) {}

  start(): void {
    this.root.addEventListener("pointerdown", this.onDown);
    this.root.addEventListener("pointerup", this.onRelease);
    this.root.addEventListener("pointercancel", this.onRelease);
    window.addEventListener("blur", this.onBlur);
    this.emit();
  }

  stop(): void {
    this.root.removeEventListener("pointerdown", this.onDown);
    this.root.removeEventListener("pointerup", this.onRelease);
    this.root.removeEventListener("pointercancel", this.onRelease);
    window.removeEventListener("blur", this.onBlur);
    this.pointers.clear();
    this.emit();
  }

  private readonly onDown = (event: PointerEvent): void => {
    const button =
      event.target instanceof Element
        ? event.target.closest<HTMLElement>("[data-control]")
        : null;
    const control = button?.dataset.control;
    if (!control || !this.root.contains(button)) return;
    event.preventDefault();
    button.setPointerCapture(event.pointerId);
    this.pointers.set(event.pointerId, control);
    this.emit();
  };

  private readonly onRelease = (event: PointerEvent): void => {
    if (!this.pointers.delete(event.pointerId)) return;
    event.preventDefault();
    this.emit();
  };

  private readonly onBlur = (): void => {
    this.pointers.clear();
    this.emit();
  };

  private emit(): void {
    const current = touchSnapshot(performance.now(), this.pointers.values());
    if (!sameRawState(this.previous, current)) {
      this.previous = current;
      this.sink(current);
    }
  }
}
