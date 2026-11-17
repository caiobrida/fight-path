# FP-07 — Modelar inputs de forma independente do dispositivo

**Objetivo:** representar direção, botões, simultaneidade e tempo em um formato comum ao teclado, gamepad e touch.

**Dependência:** FP-03.

## Checklist

- [ ] Definir eventos normalizados, relógio, orientação esquerda/direita e resolução de diagonais.
- [ ] Separar captura de dispositivo, normalização e avaliação de comandos.
- [ ] Definir comportamento para entradas simultâneas, ruído de eixos e perda de foco.
- [ ] Testar sequências determinísticas, inclusive casos de borda relevantes.
- [ ] Documentar limites de precisão do navegador frente ao jogo real.

**Aceite:** sequências sintéticas podem ser avaliadas sem navegador nem React e preservam ordem e tempo dos inputs.
