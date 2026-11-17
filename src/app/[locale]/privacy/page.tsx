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
      "Optional lesson videos load a YouTube/Google player only after you choose to load it. Google then receives connection data under its own policies. You can close the player or use the written lesson instead.",
      "Clerk handles your account details and authentication cookies. FightPath stores your Clerk user ID with saved practice attempts, but not your email or password in its database.",
      "Exercise ID, correct or incorrect result, duration, and timestamp for saved practice attempts.",
      "Language and control mapping stay in browser storage. Up to 500 attempts awaiting sync are stored per account in this browser when available, or in tab memory if storage is blocked. Raw input history stays in browser memory and is not sent to the server.",
    ],
    purpose: "Purpose and sharing",
    purposeText:
      "We use this data to sign you in, show feedback, save progress, and calculate private practice rewards. Clerk processes account data; Vercel hosts the app and Neon hosts the database when deployed. We do not add advertising or analytics cookies. Production regions and contractual settings must be reviewed before launch.",
    retention: "Retention",
    retentionText:
      "A daily server job deletes practice attempts after 180 days. Clerk controls account and authentication cookie retention. Browser preferences remain until you clear them; pending attempts are removed after successful sync or progress deletion. Production backup retention must be confirmed before launch.",
    choices: "Your choices",
    choicesText:
      "The practice page lets you export or permanently delete progress associated with your signed-in account. Deleting progress also clears pending attempts for that account on this device. A signed webhook will remove saved FightPath attempts when a Clerk account is deleted after deployment setup. Use the private contact channel for other privacy requests once it is published.",
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
      "Vídeos opcionais nas aulas carregam um player do YouTube/Google só após sua escolha. O Google então recebe dados de conexão conforme suas próprias políticas. Você pode fechar o player ou usar a aula escrita.",
      "A Clerk gerencia os dados da conta e os cookies de autenticação. O FightPath salva o identificador de usuário da Clerk com as tentativas, mas não armazena e-mail nem senha no próprio banco.",
      "Identificador do exercício, resultado correto ou incorreto, duração e data das tentativas salvas.",
      "Idioma e mapeamento de controles ficam no navegador. Até 500 tentativas aguardando sincronização são armazenadas por conta neste navegador quando possível, ou na memória da aba se o armazenamento estiver bloqueado. O histórico bruto de inputs não é enviado ao servidor.",
    ],
    purpose: "Finalidade e compartilhamento",
    purposeText:
      "Usamos esses dados para autenticar você, mostrar feedback, salvar progresso e calcular recompensas privadas de treino. A Clerk processa os dados da conta; a Vercel hospedará o aplicativo e a Neon hospedará o banco. Não adicionamos cookies de publicidade ou análise. Regiões e condições contratuais precisam de revisão antes do lançamento.",
    retention: "Retenção",
    retentionText:
      "Uma rotina diária exclui tentativas de treino após 180 dias. A Clerk controla a retenção da conta e dos cookies de autenticação. As preferências do navegador permanecem até serem apagadas; tentativas pendentes são removidas após sincronização ou exclusão do progresso. A retenção dos backups de produção precisa ser confirmada antes do lançamento.",
    choices: "Suas opções",
    choicesText:
      "A página de treino permite exportar ou excluir permanentemente o progresso da sua conta. A exclusão também limpa as tentativas pendentes desta conta neste dispositivo. Após configurar a implantação, um webhook assinado removerá as tentativas salvas quando uma conta da Clerk for excluída. Use o canal privado de contato para outras solicitações quando ele for publicado.",
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
