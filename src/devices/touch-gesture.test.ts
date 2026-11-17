import assert from "node:assert/strict";
import test from "node:test";
import { TouchAdapter } from "./touch";
import type { RawSnapshot } from "./raw";

test("touch slides between directions while another pointer holds an attack", () => {
  class Surface extends EventTarget {
    dataset: Record<string, string> = {};
    hit: Surface | null = this;
    closest() {
      return this.hit;
    }
    contains(value: unknown) {
      return value instanceof Surface;
    }
    setPointerCapture() {}
  }
  const oldElement = globalThis.Element;
  const oldWindow = globalThis.window;
  Object.assign(globalThis, { Element: Surface, window: new EventTarget() });
  try {
    const root = new Surface();
    const document = Object.assign(new EventTarget(), {
      hidden: false,
      elementFromPoint: () => root.hit,
    });
    Object.assign(root, { ownerDocument: document });
    const outputs: RawSnapshot[] = [];
    const adapter = new TouchAdapter(root as unknown as HTMLElement, (sample) =>
      outputs.push(sample),
    );
    const send = (name: string, pointerId: number, control?: string) => {
      if (control) root.dataset.control = control;
      root.dispatchEvent(
        Object.assign(new Event(name), { pointerId, clientX: 0, clientY: 0 }),
      );
    };
    adapter.start();
    send("pointerdown", 1, "TouchDown");
    send("pointermove", 1, "TouchDownRight");
    assert.equal(outputs.at(-1)?.horizontal, 1);
    send("pointerdown", 2, "TouchLP");
    send("pointermove", 1, "TouchRight");
    assert.deepEqual(outputs.at(-1)?.controls, ["TouchLP", "TouchRight"]);
    root.hit = null;
    send("pointermove", 1);
    assert.deepEqual(outputs.at(-1)?.controls, ["TouchLP"]);
    document.hidden = true;
    document.dispatchEvent(new Event("visibilitychange"));
    assert.deepEqual(outputs.at(-1)?.controls, []);
    adapter.stop();
  } finally {
    Object.assign(globalThis, { Element: oldElement, window: oldWindow });
  }
});
