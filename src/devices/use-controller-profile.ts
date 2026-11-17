"use client";

import { useEffect, useState } from "react";
import {
  activeController,
  controllerIndex,
  readControllers,
} from "./controller-selection";

export function useControllerProfile(): string {
  const [profile, setProfile] = useState("default");
  useEffect(() => {
    const update = () => {
      try {
        const pad = activeController(
          readControllers(window),
          controllerIndex(),
        );
        setProfile(
          pad ? encodeURIComponent(`${pad.id}:${pad.mapping}`) : "default",
        );
      } catch {
        setProfile("default");
      }
    };
    const timer = window.setInterval(update, 500);
    window.addEventListener("fightpath-controller-change", update);
    return () => {
      window.clearInterval(timer);
      window.removeEventListener("fightpath-controller-change", update);
    };
  }, []);
  return profile;
}
