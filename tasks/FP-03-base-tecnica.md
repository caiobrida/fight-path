# FP-03 — Escolher stack e preparar a base técnica

**Objetivo:** criar uma base web simples, extensível e compatível com implantação futura na Vercel.

**Dependência:** FP-01.

**Decisão:** Next.js App Router, React e TypeScript. A escolha e a alternativa Vite estão registradas em `ARCHITECTURE.md`.

## Checklist

- [x] Registrar a decisão de stack e os motivos, considerando o backend necessário para Neon.
- [x] Criar a aplicação inicial com estrutura clara para interface, domínio de inputs, conteúdo e acesso a dados.
- [x] Estabelecer layout mobile first e comportamento responsivo como requisito da base visual.
- [x] Configurar lint, formatação, checagem de tipos e comandos de build.
- [x] Documentar instalação local e variáveis de ambiente sem guardar segredos no repositório.
- [x] Garantir que uma pessoa nova consiga executar o projeto seguindo o README.

**Aceite:** projeto inicia e compila localmente, apresenta uma base responsiva mobile first e não acopla o motor de inputs ao React.
