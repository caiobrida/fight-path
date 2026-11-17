"use client";

import { useSyncExternalStore } from "react";
import {
  activeController,
  controllerIndex,
  readControllers,
} from "./controller-selection";

function readProfile(): string {
  try {
    const pad = activeController(readControllers(window), controllerIndex());
    return pad ? encodeURIComponent(`${pad.id}:${pad.mapping}`) : "default";
  } catch {
    return "default";
  }
}

function defaultProfile() {
  return "default";
}

function subscribe(update: () => void) {
  const timer = window.setInterval(update, 500);
  const events = [
    "fightpath-controller-change",
    "gamepadconnected",
    "gamepaddisconnected",
  ];
  events.forEach((event) => window.addEventListener(event, update));
  return () => {
    window.clearInterval(timer);
    events.forEach((event) => window.removeEventListener(event, update));
  };
}

export function useControllerProfile(enabled = true): string {
  return useSyncExternalStore(
    subscribe,
    enabled ? readProfile : defaultProfile,
    defaultProfile,
  );
}
