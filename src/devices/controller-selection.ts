let selectedIndex: number | undefined;

export function selectController(index: number | undefined): void {
  selectedIndex = index;
  window.dispatchEvent(new Event("fightpath-controller-change"));
}

export function controllerIndex(): number | undefined {
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
