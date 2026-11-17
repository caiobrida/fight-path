let selectedIndex: number | undefined;

export function selectController(index: number | undefined): void {
  selectedIndex = index;
  try {
    window.sessionStorage.setItem(
      "fightpath-controller-index",
      index === undefined ? "auto" : String(index),
    );
  } catch {}
  window.dispatchEvent(new Event("fightpath-controller-change"));
}

export function controllerIndex(): number | undefined {
  if (selectedIndex === undefined && typeof window !== "undefined") {
    try {
      const value = window.sessionStorage.getItem("fightpath-controller-index");
      if (value !== null && value !== "auto" && /^\d+$/.test(value))
        selectedIndex = Number(value);
    } catch {}
  }
  return selectedIndex;
}

export function readControllers(target: Pick<Window, "navigator">): Gamepad[] {
  if (typeof target.navigator.getGamepads !== "function")
    throw new Error("unsupported");
  return [...target.navigator.getGamepads()].filter(
    (pad): pad is Gamepad => pad !== null && pad.connected,
  );
}

export function activeController(
  pads: Gamepad[],
  index?: number,
): Gamepad | null {
  return (
    (index === undefined ? pads[0] : pads.find((pad) => pad.index === index)) ??
    null
  );
}
