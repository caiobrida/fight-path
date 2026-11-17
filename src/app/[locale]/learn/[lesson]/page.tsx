import { notFound } from "next/navigation";
import { findLesson, publishedLessons } from "@/content/catalog";
import { trackNames } from "@/content/learning";
import { isLocale } from "@/i18n/dictionaries";
import { ActionLink, Badge, Notice } from "@/components/ui";
import { LessonActivity } from "@/components/lesson-activity";
import { LessonVisual } from "@/components/lesson-visual";
import { KenVideo } from "@/components/ken-video";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ locale: string; lesson: string }>;
}) {
  const { locale, lesson: id } = await params;
  if (!isLocale(locale)) notFound();
  const lesson = findLesson(id);
  if (!lesson) notFound();
  const pt = locale === "pt-BR";
  const text = lesson.copy[locale];
  const track = publishedLessons.filter((item) => item.track === lesson.track);
  const next = track[track.findIndex((item) => item.id === id) + 1];
  const previous = track[track.findIndex((item) => item.id === id) - 1];
  return (
    <main className="fp-page fp-lesson">
      <nav
        className="fp-breadcrumb"
        aria-label={pt ? "Caminho da aula" : "Lesson path"}
      >
        <a href={`/${locale}/learn`}>{pt ? "Aprender" : "Learn"}</a>
        <span aria-hidden="true">/</span>
        <a href={`/${locale}/learn#${lesson.track}`}>
          {trackNames[locale][lesson.track]}
        </a>
      </nav>
      <Badge>
        {lesson.scope === "universal"
          ? pt
            ? "Conceito geral"
            : "General concept"
          : lesson.scope === "sf6"
            ? "SF6"
            : "Ken Classic"}
      </Badge>
      <h1>{text.title}</h1>
      <p className="fp-lesson__summary">{text.summary}</p>
      <p>
        {pt ? "Nível: " : "Level: "}
        {lesson.level === "beginner"
          ? pt
            ? "inicial"
            : "beginner"
          : pt
            ? "intermediário"
            : "intermediate"}
      </p>
      {lesson.prerequisites.length > 0 && (
        <nav aria-label={pt ? "Antes desta aula" : "Before this lesson"}>
          <strong>{pt ? "Antes desta aula: " : "Before this lesson: "}</strong>
          {lesson.prerequisites.map((prerequisite) => {
            const entry = findLesson(prerequisite);
            return entry ? (
              <a
                key={prerequisite}
                className="fp-prerequisite"
                href={`/${locale}/learn/${entry.id}`}
              >
                {entry.copy[locale].title}
              </a>
            ) : null;
          })}
        </nav>
      )}
      <LessonVisual track={lesson.track} locale={locale} />
      {lesson.patch && (
        <Notice>
          {lesson.patch.review === "conceptual"
            ? pt
              ? "Introdução conceitual baseada nas fontes abaixo. Custos, comandos e janelas da versão atual devem ser conferidos no jogo; esta aula não certifica uma build atual."
              : "Conceptual introduction based on the sources below. Check current costs, inputs and timing in the game; this lesson does not certify a current build."
            : `${pt ? "Build verificada" : "Verified build"}: ${lesson.patch.build}`}
        </Notice>
      )}
      <Notice>
        <strong>{pt ? "Seu objetivo: " : "Your goal: "}</strong>
        {text.objective}
      </Notice>
      {text.paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
      <section className="fp-lesson__example">
        <h2>{pt ? "Veja a situação" : "See the situation"}</h2>
        <p>{text.example}</p>
      </section>
      <section>
        <h2>{pt ? "Um erro comum" : "A common mistake"}</h2>
        <p>{text.mistake}</p>
      </section>
      <section className="fp-lesson__drill">
        <h2>{pt ? "Leve para o treino" : "Take it into practice"}</h2>
        <p>{text.drill}</p>
      </section>
      <LessonActivity lesson={lesson} locale={locale} />
      {lesson.id === "ken-start-small" && <KenVideo locale={locale} />}
      <div className="fp-actions">
        {previous && (
          <ActionLink
            variant="secondary"
            href={`/${locale}/learn/${previous.id}`}
          >
            ← {pt ? "Aula anterior" : "Previous lesson"}
          </ActionLink>
        )}
        {next ? (
          <ActionLink href={`/${locale}/learn/${next.id}`}>
            {pt ? "Próxima aula" : "Next lesson"} →
          </ActionLink>
        ) : (
          <ActionLink href={`/${locale}/learn`}>
            {pt ? "Explorar as trilhas" : "Explore the paths"}
          </ActionLink>
        )}
        <ActionLink variant="secondary" href={`/${locale}/practice`}>
          {pt ? "Abrir treino de comandos" : "Open input practice"}
        </ActionLink>
      </div>
      <section className="fp-sources">
        <h2>{pt ? "Fontes e revisão" : "Sources and review"}</h2>
        <ul>
          {lesson.sources.map((source) => (
            <li key={source.url}>
              <a href={source.url} target="_blank" rel="noreferrer">
                {source.title}
              </a>
            </li>
          ))}
        </ul>
        <p>
          {pt ? "Revisado em" : "Reviewed"} {lesson.reviewed} ·{" "}
          {pt ? "Revisão" : "Revision"} {lesson.revision}
        </p>
      </section>
    </main>
  );
}
