# Redesign: Dra. Rachel Bernardo (proposta de demonstração)

Site estático (HTML + CSS + JS puro), sem build. `noindex` ativado (é uma proposta).

Ver localmente: `cd clientes/dra-rachel-bernardo && python3 -m http.server 8080` e abra http://localhost:8080

## Configuração (`assets/js/main.js`, objeto `CONFIG`)
- `WHATSAPP`: número vindo dos botões de curso do site atual. **Confirmar** se é o da clínica.
- `GTM_ID`: vazio de propósito. O site atual usa `GTM-TDTT6NVK`; preencher só ao publicar de verdade.

## Pendências
- Foto retrato da Dra. Rachel: salvar como `assets/img/dra-rachel.jpg` (4:5). Sem ela aparece o monograma.
- Imagens (consultório, blog, hero) estão apontando para o site atual (hotlink). Baixar para `assets/img/` antes de publicar.
- Número do CRO / responsável técnico (rodapé, marcado "a confirmar").
- Confirmar texto das técnicas RB Wires / RB Lips e dos cursos com a Dra. (copiado do que o site atual diz, sem detalhes).
- Páginas de procedimentos, blog e "Sobre" ainda apontam para o site atual.
- Sem formulário: o contato é WhatsApp. Política de privacidade/cookies a refazer.
