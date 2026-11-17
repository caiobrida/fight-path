import { notFound } from "next/navigation";
import {
  ActionLink,
  Button,
  Card,
  Badge,
  Notice,
  Notation,
  Progress,
  Field,
  EmptyState,
} from "@/components/ui";
import { InfoDialog, SectionTabs, HelpTip } from "@/components/interactive-ui";
import { isLocale } from "@/i18n/dictionaries";

export default async function DesignSystemPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const pt = locale === "pt-BR";
  return (
    <main className="fp-page">
      <Badge>FightPath UI</Badge>
      <h1>Design system</h1>
      <p>
        {pt
          ? "Referência dos componentes e estados usados no FightPath."
          : "Reference for FightPath components and interaction states."}
      </p>
      <div className="fp-actions">
        <ActionLink href={`/${locale}`}>
          {pt ? "Ação principal" : "Primary action"}
        </ActionLink>
        <Button variant="secondary">{pt ? "Secundária" : "Secondary"}</Button>
        <Button variant="danger">{pt ? "Destrutiva" : "Destructive"}</Button>
        <Button disabled>{pt ? "Desabilitado" : "Disabled"}</Button>
        <Button busy>{pt ? "Carregando" : "Loading"}</Button>
      </div>
      <div className="fp-card-grid">
        <Card>
          <Badge tone="success">{pt ? "Concluído" : "Complete"}</Badge>
          <h2>{pt ? "Componentes consistentes" : "Consistent components"}</h2>
          <p>
            {pt
              ? "Texto legível, ações claras e foco visível."
              : "Readable text, clear actions and visible focus."}
          </p>
          <Progress label={pt ? "Progresso" : "Progress"} value={3} max={10} />
        </Card>
        <Card>
          <Field label={pt ? "Dispositivo" : "Device"}>
            <select defaultValue="keyboard">
              <option value="keyboard">{pt ? "Teclado" : "Keyboard"}</option>
              <option value="gamepad">{pt ? "Controle" : "Gamepad"}</option>
            </select>
          </Field>
          <div className="fp-actions">
            <Notation label={pt ? "Baixo" : "Down"}>↓</Notation>
            <Notation label={pt ? "Baixo frente" : "Down forward"}>↘</Notation>
            <Notation label={pt ? "Frente" : "Forward"}>→</Notation>
          </div>
        </Card>
      </div>
      <div className="fp-actions">
        <InfoDialog
          trigger={pt ? "Abrir diálogo" : "Open dialog"}
          title={pt ? "Antes de começar" : "Before you begin"}
          closeLabel={pt ? "Fechar" : "Close"}
        >
          <p>
            {pt
              ? "Escape fecha; o foco retorna ao botão de origem."
              : "Escape closes; focus returns to the trigger."}
          </p>
        </InfoDialog>
        <HelpTip label={pt ? "Ajuda" : "Help"}>
          {pt
            ? "Ajuda disponível por teclado e ponteiro."
            : "Help available with keyboard and pointer."}
        </HelpTip>
      </div>
      <SectionTabs
        label={pt ? "Exemplos" : "Examples"}
        items={[
          {
            id: "status",
            title: pt ? "Estado" : "Status",
            content: (
              <Notice>
                {pt
                  ? "Pronto para testar seus controles."
                  : "Ready to test your controls."}
              </Notice>
            ),
          },
          {
            id: "error",
            title: pt ? "Erro" : "Error",
            content: (
              <Notice error>
                {pt
                  ? "Não foi possível salvar. Tente novamente."
                  : "Could not save. Try again."}
              </Notice>
            ),
          },
        ]}
      />
      <EmptyState title={pt ? "Sua próxima habilidade" : "Your next skill"}>
        {pt
          ? "As atividades concluídas aparecerão aqui."
          : "Completed activities will appear here."}
      </EmptyState>
    </main>
  );
}
