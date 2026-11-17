import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/dictionaries";

const copy = {
  en: {
    back: "Back to FightPath",
    title: "Privacy notice",
    updated: "Updated November 17, 2026",
    operator: "Operator and contact",
    operatorText:
      "FightPath is currently a development project. The operator identity and private contact channel must be confirmed before a public launch.",
    contact: "Privacy requests",
    contactPending:
      "A private contact channel will be published before public launch.",
    data: "Data we handle",
    dataItems: [
      "A random session token in a necessary HttpOnly cookie. Only its hash is stored on the server.",
      "Exercise ID, correct or incorrect result, duration, and timestamp for saved practice attempts.",
      "Language, control mapping, and attempts awaiting sync in browser storage. Raw input history stays in browser memory and is not sent to the server.",
    ],
    purpose: "Purpose and sharing",
    purposeText:
      "We use this data to show feedback, save progress, and calculate private practice rewards. We do not add advertising or analytics cookies. When deployed, Vercel hosts the app and Neon hosts the database; their production regions and contractual settings must be reviewed before launch.",
    retention: "Retention",
    retentionText:
      "The session cookie lasts up to 180 days. A daily server job deletes sessions created more than 180 days ago and their attempts. Browser preferences remain until you clear them; pending attempts are removed after successful sync or progress deletion. Production backup retention must be confirmed before launch.",
    choices: "Your choices",
    choicesText:
      "The practice page lets you export or permanently delete progress associated with this browser session. Deleting progress also clears pending attempts on this device. If you lose the session cookie, the anonymous progress cannot be linked back to you. Use the private contact channel for other privacy requests once it is published.",
    legal: "Publication review",
    legalText:
      "The legal basis, operator details, cross-border hosting settings, backup deletion process, and request handling procedure require review before public data collection.",
  },
  "pt-BR": {
    back: "Voltar ao FightPath",
    title: "Aviso de privacidade",
    updated: "Atualizado em 17 de novembro de 2026",
    operator: "Responsável e contato",
    operatorText:
      "O FightPath ainda é um projeto em desenvolvimento. A identidade do responsável e um canal privado de contato precisam ser confirmados antes do lançamento público.",
    contact: "Solicitações de privacidade",
    contactPending:
      "Um canal privado de contato será publicado antes do lançamento público.",
    data: "Dados tratados",
    dataItems: [
      "Um token aleatório de sessão em cookie necessário e HttpOnly. Apenas seu hash é salvo no servidor.",
      "Identificador do exercício, resultado correto ou incorreto, duração e data das tentativas salvas.",
      "Idioma, mapeamento de controles e tentativas aguardando sincronização no navegador. O histórico bruto de inputs fica na memória do navegador e não é enviado ao servidor.",
    ],
    purpose: "Finalidade e compartilhamento",
    purposeText:
      "Usamos esses dados para mostrar feedback, salvar progresso e calcular recompensas privadas de treino. Não adicionamos cookies de publicidade ou análise. Quando implantado, a Vercel hospedará o aplicativo e a Neon hospedará o banco; as regiões e condições contratuais precisam de revisão antes do lançamento.",
    retention: "Retenção",
    retentionText:
      "O cookie de sessão dura até 180 dias. Uma rotina diária exclui sessões criadas há mais de 180 dias e suas tentativas. As preferências do navegador permanecem até serem apagadas; tentativas pendentes são removidas após sincronização ou exclusão do progresso. A retenção dos backups de produção precisa ser confirmada antes do lançamento.",
    choices: "Suas opções",
    choicesText:
      "A página de treino permite exportar ou excluir permanentemente o progresso desta sessão do navegador. A exclusão também limpa tentativas pendentes neste dispositivo. Se o cookie de sessão for perdido, não será possível associar novamente o progresso anônimo a você. Use o canal privado de contato para outras solicitações quando ele for publicado.",
    legal: "Revisão para publicação",
    legalText:
      "A base legal, a identificação do responsável, as condições de hospedagem internacional, a exclusão de backups e o atendimento de solicitações precisam de revisão antes da coleta pública de dados.",
  },
} as const;

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const text = copy[locale];
  const contact = process.env.PRIVACY_CONTACT_EMAIL?.trim();
  const operatorName = process.env.PRIVACY_OPERATOR_NAME?.trim();

  return (
    <main className="privacy">
      <div className="privacy__content">
        <a href={`/${locale}`}>{text.back}</a>
        <h1>{text.title}</h1>
        <p>{text.updated}</p>
        <section>
          <h2>{text.operator}</h2>
          <p>{operatorName || text.operatorText}</p>
          <p>
            {contact ? (
              <a href={`mailto:${contact}`}>
                {text.contact}: {contact}
              </a>
            ) : (
              text.contactPending
            )}
          </p>
        </section>
        <section>
          <h2>{text.data}</h2>
          <ul>
            {text.dataItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        <section>
          <h2>{text.purpose}</h2>
          <p>{text.purposeText}</p>
        </section>
        <section>
          <h2>{text.retention}</h2>
          <p>{text.retentionText}</p>
        </section>
        <section>
          <h2>{text.choices}</h2>
          <p>{text.choicesText}</p>
        </section>
        <section>
          <h2>{text.legal}</h2>
          <p>{text.legalText}</p>
        </section>
      </div>
    </main>
  );
}
