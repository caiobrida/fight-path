"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Square } from "lucide-react";
import { gameMedia, type GameMediaId } from "@/content/game-media";
import type { Locale } from "@/i18n/dictionaries";
import { GameImage } from "./game-image";
import { Button } from "./ui";

export function GameMedia({
  media,
  locale,
}: {
  media: GameMediaId;
  locale: Locale;
}) {
  return <Demonstration key={media} media={media} locale={locale} />;
}

function Demonstration({
  media,
  locale,
}: {
  media: GameMediaId;
  locale: Locale;
}) {
  const entry = gameMedia[media];
  const pt = locale === "pt-BR";
  const [active, setActive] = useState(false);
  const [failed, setFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (!active) return;
    const video = videoRef.current;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) video?.pause();
    });
    if (video) observer.observe(video);
    const pause = () => {
      if (document.hidden) video?.pause();
    };
    document.addEventListener("visibilitychange", pause);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", pause);
    };
  }, [active]);
  return (
    <figure className="fp-game-media">
      <div className="fp-game-media__stage">
        {active ? (
          <video
            ref={videoRef}
            src={entry.video}
            poster={entry.poster}
            aria-label={entry.alt[locale]}
            controls
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            onError={() => {
              setFailed(true);
              setActive(false);
            }}
          />
        ) : (
          <GameImage media={media} locale={locale} />
        )}
        <Button
          variant="quiet"
          className="fp-game-media__toggle"
          aria-label={
            active
              ? pt
                ? `Parar demonstração: ${entry.title}`
                : `Stop: ${entry.title}`
              : pt
                ? `Ver em ação: ${entry.title}`
                : `Watch the move: ${entry.title}`
          }
          onClick={() => {
            setFailed(false);
            setActive(!active);
          }}
        >
          {active ? (
            <Square size={16} aria-hidden="true" />
          ) : (
            <Play size={16} aria-hidden="true" />
          )}
          {active
            ? pt
              ? "Parar"
              : "Stop"
            : pt
              ? "Ver em ação"
              : "Watch the move"}
        </Button>
      </div>
      <figcaption>
        <span>
          <strong>{entry.fighter}</strong> / {entry.title}
        </span>
        <a href={entry.source} target="_blank" rel="noreferrer">
          © CAPCOM · {pt ? "Fonte" : "Source"}
        </a>
      </figcaption>
      {failed && (
        <p role="status">
          {pt
            ? "Não foi possível carregar o clipe. A imagem e a fonte oficial continuam disponíveis."
            : "The clip could not load. The image and official source remain available."}
        </p>
      )}
    </figure>
  );
}
