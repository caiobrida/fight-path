import { InfoDialog } from "./interactive-ui";
import type { Locale } from "@/i18n/dictionaries";

export function PracticeGuide({
  locale,
  limits,
}: {
  locale: Locale;
  limits?: { maxDurationMs: number; maxGapMs: number };
}) {
  const pt = locale === "pt-BR";
  const steps = pt
    ? [
        "Escolha Teclado, Controle ou Toque. O teste de controle mostra sinais físicos mesmo antes de iniciar.",
        "No teclado, as setas movem; J/K/L são socos e U/I/O são chutes no layout inicial. Você pode mudar tudo em Configurar controles.",
        "LP, MP e HP indicam soco leve, médio e forte; LK, MK e HK indicam chute leve, médio e forte. Associe cada ação a um botão físico.",
        "Clique em Iniciar treino. Faça as direções mostradas na ordem e pressione um dos ataques indicados. Solte o ataque antes da próxima tentativa.",
        "O lado inverte esquerda e direita. As setas exibidas já mostram o lado selecionado. O resultado avalia os inputs do exercício; não confirma um golpe no jogo.",
      ]
    : [
        "Choose Keyboard, Gamepad or Touch. The controller test displays physical signals before practice starts.",
        "The default keyboard layout uses arrows for movement, J/K/L for punches and U/I/O for kicks. You can change every binding in Configure controls.",
        "LP, MP and HP mean light, medium and heavy punch; LK, MK and HK mean light, medium and heavy kick. Assign each action to a physical control.",
        "Press Start practice. Follow the displayed directions in order, then press one of the shown attacks. Release the attack before the next attempt.",
        "Facing mirrors left and right. The displayed arrows already reflect your selected side. Feedback evaluates the exercise inputs, not execution inside the game.",
      ];
  return (
    <InfoDialog
      trigger={pt ? "Como praticar" : "How to practice"}
      title={
        pt
          ? "Do controle ao primeiro comando"
          : "From controller to first command"
      }
      closeLabel={pt ? "Fechar" : "Close"}
    >
      <ol className="fp-guide">
        {steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
      <p>
        {pt
          ? "Na notação numérica, 2 é baixo, 5 é neutro, 6 é direita e 4 é esquerda. Por exemplo, 236 descreve baixo, baixo-direita, direita; ao espelhar, vira 214."
          : "In numpad notation, 2 is down, 5 is neutral, 6 is right and 4 is left. For example, 236 means down, down-right, right; mirrored, it becomes 214."}
      </p>
      {limits && (
        <p>
          {pt
            ? `Este exercício permite até ${limits.maxDurationMs} ms no total e ${limits.maxGapMs} ms entre etapas. São limites didáticos do FightPath, não janelas certificadas do SF6.`
            : `This exercise allows up to ${limits.maxDurationMs} ms overall and ${limits.maxGapMs} ms between steps. These are FightPath teaching limits, not certified SF6 windows.`}
        </p>
      )}
    </InfoDialog>
  );
}
