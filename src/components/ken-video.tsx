"use client";

import { useState } from "react";
import { GameImage } from "./game-image";
import { Button } from "./ui";
import type { Locale } from "@/i18n/dictionaries";

export function KenVideo({ locale }: { locale: Locale }) {
  const [loaded, setLoaded] = useState(false);
  const pt = locale === "pt-BR";
  return (
    <section className="fp-video">
      <h2>{pt ? "Veja Ken em ação" : "See Ken in action"}</h2>
      <p>
        {pt
          ? "Guia oficial da Capcom de 2023. Serve como introdução visual; não valida combos ou dados da versão atual."
          : "Capcom's official 2023 guide. A visual introduction, not validation of current combos or frame data."}
      </p>
      {loaded ? (
        <iframe
          title={
            pt
              ? "Guia oficial de Ken no YouTube"
              : "Official Ken guide on YouTube"
          }
          src={`https://www.youtube-nocookie.com/embed/1SX2m7sqbtA?autoplay=0&controls=1&cc_load_policy=1&cc_lang_pref=${pt ? "pt-BR" : "en"}`}
          allow="encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        <GameImage media="ken-shoryuken" locale={locale} />
      )}
      <p>
        {pt
          ? "Carregar o player conecta seu navegador ao YouTube/Google, que recebe dados de conexão. Legendas dependem da disponibilidade no vídeo. A explicação escrita da aula permanece disponível."
          : "Loading the player connects your browser to YouTube/Google, which receives connection data. Captions depend on video availability. The written lesson remains available."}
      </p>
      <div className="fp-actions">
        <Button variant="secondary" onClick={() => setLoaded(!loaded)}>
          {loaded
            ? pt
              ? "Fechar vídeo e parar reprodução"
              : "Close video and stop playback"
            : pt
              ? "Carregar player do YouTube"
              : "Load YouTube player"}
        </Button>
        <a
          href="https://www.youtube.com/watch?v=1SX2m7sqbtA"
          target="_blank"
          rel="noreferrer"
        >
          {pt ? "Abrir fonte no YouTube" : "Open source on YouTube"}
        </a>
      </div>
    </section>
  );
}
