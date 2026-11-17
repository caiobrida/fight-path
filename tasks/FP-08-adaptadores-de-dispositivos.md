# FP-08 — Capturar teclado, gamepad e touch

**Objetivo:** conectar dispositivos reais ao modelo normalizado de FP-07.

**Dependência:** FP-07.

## Checklist

- [x] Implementar captura de teclado com tratamento de teclas pressionadas e liberadas.
- [x] Implementar captura via Gamepad API para botões, direcional e eixos, com conexão e desconexão.
- [x] Implementar controles touch para prática em dispositivos móveis.
- [ ] Mostrar capacidade detectada e fallback quando o navegador ou dispositivo não oferecer suporte. FP-11 expõe o estado na interface.
- [ ] Testar pelo menos um dispositivo de cada família disponível e registrar a matriz de compatibilidade observada. FP-16 registra a matriz física.

**Aceite:** os três adaptadores emitem o mesmo formato de eventos, sem presumir mapeamento universal de um modelo físico.
