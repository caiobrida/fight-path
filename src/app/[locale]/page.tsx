import Image from "next/image";
import {
  ArrowUpRight,
  BookOpen,
  Gamepad2,
  Flame,
  ArrowRight,
} from "lucide-react";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/dictionaries";
import { ActionLink, Badge, Card } from "@/components/ui";

const copy = {
  en: {
    tag: "Your next round starts here",
    title: ["Understand.", "Practice.", "Improve."],
    lead: "From your first motion to better decisions in a match. Find your rhythm with Street Fighter 6, Ken and Classic controls.",
    primary: "Start practicing",
    secondary: "Set up my controls",
    tracks: "One skill at a time",
    trackIntro: "Build execution. Understand the game. Put it into practice.",
    cards: [
      {
        tag: "Execution lab",
        title: "Make the motion click",
        text: "Practice universal motions and three Ken commands with a live input history and clear feedback.",
      },
      {
        tag: "Learning path",
        title: "Read the game",
        text: "Foundations, spacing and decision-making are the next part of your learning path.",
      },
      {
        tag: "Ken Classic",
        title: "A plan for every round",
        text: "Connect a small toolkit to useful decisions, dependable combos and focused practice.",
      },
    ],
    coming: "New lessons in preparation",
    open: "Open the lab",
    steps: "A clear path to your first command",
    stepTitles: ["Connect", "Map", "Practice"],
    stepText: [
      "Check what your keyboard, controller or touch input sends.",
      "Choose the inputs that feel comfortable and test your layout.",
      "Follow the target, read your inputs and adjust the next attempt.",
    ],
    limit:
      "Input feedback is a FightPath exercise result. It does not confirm that a move or combo connected in Street Fighter 6.",
    art: "Abstract illustration of a directional motion",
    note: "Street Fighter 6 · Ken · Classic",
  },
  "pt-BR": {
    tag: "Seu próximo round começa aqui",
    title: ["Entenda.", "Pratique.", "Evolua."],
    lead: "Dos primeiros comandos às decisões em uma partida. Encontre seu ritmo com Street Fighter 6, Ken e controles Classic.",
    primary: "Começar a praticar",
    secondary: "Configurar meu controle",
    tracks: "Uma habilidade por vez",
    trackIntro: "Desenvolva a execução. Entenda o jogo. Coloque em prática.",
    cards: [
      {
        tag: "Laboratório de execução",
        title: "Faça o comando aparecer",
        text: "Pratique movimentos universais e três comandos do Ken com histórico de inputs e feedback claro.",
      },
      {
        tag: "Trilha de aprendizado",
        title: "Leia melhor o jogo",
        text: "Fundamentos, espaçamento e tomada de decisão são o próximo passo da sua trilha.",
      },
      {
        tag: "Ken Classic",
        title: "Um plano para cada round",
        text: "Conecte poucas ferramentas a boas decisões, combos confiáveis e treinos com objetivo.",
      },
    ],
    coming: "Novas aulas em preparação",
    open: "Abrir o laboratório",
    steps: "Um caminho até seu primeiro comando",
    stepTitles: ["Conecte", "Configure", "Pratique"],
    stepText: [
      "Veja o que o teclado, controle ou toque está enviando.",
      "Escolha os inputs mais confortáveis e teste o layout.",
      "Siga o alvo, leia seus inputs e ajuste a próxima tentativa.",
    ],
    limit:
      "O feedback de inputs é um resultado dos exercícios do FightPath. Ele não confirma que um golpe ou combo funcionou no Street Fighter 6.",
    art: "Ilustração abstrata de um movimento direcional",
    note: "Street Fighter 6 · Ken · Classic",
  },
};

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const text = copy[locale];
  const icons = [Gamepad2, BookOpen, Flame];
  return (
    <main className="fp-home">
      <section className="fp-hero">
        <div>
          <p className="eyebrow">{text.tag}</p>
          <h1>
            {text.title[0]}
            <br />
            {text.title[1]}
            <br />
            <em>{text.title[2]}</em>
          </h1>
          <p className="fp-hero__lead">{text.lead}</p>
          <div className="fp-actions">
            <ActionLink href={`/${locale}/practice`}>
              {text.primary}
              <ArrowUpRight size={20} aria-hidden="true" />
            </ActionLink>
            <ActionLink variant="secondary" href={`/${locale}/setup`}>
              {text.secondary}
            </ActionLink>
          </div>
          <p className="fp-hero__note">{text.note}</p>
        </div>
        <div className="fp-hero__art">
          <Image
            src="/images/execution-orbit.svg"
            alt={text.art}
            width={640}
            height={640}
            priority
          />
          <span>
            {locale === "pt-BR"
              ? "PRECIS?O / DECIS?O / PR?TICA"
              : "PRECISION / DECISION / PRACTICE"}
          </span>
        </div>
      </section>
      <section id="tracks" className="fp-home__section">
        <div className="fp-section-heading">
          <div>
            <p className="eyebrow">FIGHTPATH</p>
            <h2>{text.tracks}</h2>
          </div>
          <p>{text.trackIntro}</p>
        </div>
        <div className="fp-card-grid">
          {text.cards.map((card, index) => {
            const Icon = icons[index];
            return (
              <Card key={card.tag}>
                <Icon size={28} aria-hidden="true" />
                <p className="eyebrow">{card.tag}</p>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
                {index === 0 ? (
                  <ActionLink variant="quiet" href={`/${locale}/practice`}>
                    {text.open}
                    <ArrowRight size={16} aria-hidden="true" />
                  </ActionLink>
                ) : index === 1 ? (
                  <ActionLink variant="quiet" href={`/${locale}/learn`}>
                    {locale === "pt-BR"
                      ? "Explorar as aulas"
                      : "Explore lessons"}{" "}
                    ?
                  </ActionLink>
                ) : (
                  <Badge tone="muted">{text.coming}</Badge>
                )}
              </Card>
            );
          })}
        </div>
      </section>
      <section className="fp-home__section">
        <h2>{text.steps}</h2>
        <ol className="fp-steps">
          {text.stepTitles.map((title, index) => (
            <li key={title}>
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{text.stepText[index]}</p>
            </li>
          ))}
        </ol>
      </section>
      <p className="fp-home__limit">{text.limit}</p>
    </main>
  );
}
