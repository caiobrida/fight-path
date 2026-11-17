import { appendSample, newlyPressed, type InputSample } from "./input";

export class AttemptWindow {
  private previous: InputSample | undefined;
  private history: readonly InputSample[] = [];

  observe(sample: InputSample): readonly InputSample[] | null {
    const pressed =
      this.previous && newlyPressed(this.previous, sample).length > 0;
    this.previous = sample;
    this.history = appendSample(this.history, sample);
    if (!pressed) return null;
    const attempt = this.history;
    this.clear();
    return attempt;
  }

  clear(): void {
    this.history = [];
  }

  disconnect(): void {
    this.clear();
    this.previous = undefined;
  }
}
