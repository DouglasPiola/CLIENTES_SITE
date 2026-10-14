# Site da clínica de estética (HTML + CSS + JS puro)

Sem frameworks e sem build. Basta enviar os arquivos para a hospedagem.

## 1. Trocar os dados da clínica
Abra `assets/js/main.js`. No topo há o objeto **`CONFIG`**: nome, cidade, WhatsApp (`55` + DDD + número, só dígitos), telefone, e-mail, Instagram, endereço, horário, responsável técnica, CNPJ e IDs de rastreamento. O site inteiro (menu, rodapé, mapa, botões de WhatsApp, JSON-LD) é preenchido a partir dele.

Também é preciso ajustar, **diretamente nos HTML**, o que não vem do CONFIG: `<title>`, `meta description`, `canonical`, Open Graph (procure por `lumiereestetica.com.br` e `São Paulo`) e o `sitemap.xml`/`robots.txt` (troque o domínio). Use a busca global por `REVISAR`.

## 2. Adicionar um tratamento
Em `main.js`, no array **`TREATMENTS`**, copie um objeto e ajuste `id`, `name`, `category` (Facial, Corporal, Injetáveis ou Laser; uma categoria nova vira filtro automaticamente), `image` (ID de foto do Unsplash ou troque a função `IMG` por um caminho em `assets/img/`), `short`, `what`, `indicated`, `how`, `duration` e `recovery`. A página de tratamentos e o select do formulário se atualizam sozinhos. Os 6 cards da home são HTML estático em `index.html`.

## 3. Rastreamento (Pixel, GA4, GTM)
Em `CONFIG.ids` cole `META_PIXEL_ID`, `GA4_ID` e/ou `GTM_ID`. Os scripts **só carregam depois que a visitante clica em “Aceitar”** no banner de cookies. Eventos: `Lead` (envio do formulário), `Contact` (clique em WhatsApp/telefone) e `ViewContent` (abrir detalhes de um tratamento), com os equivalentes no GA4/dataLayer. Parâmetros UTM são guardados em `sessionStorage` e enviados na mensagem do WhatsApp e no formulário.
Se usar GTM, não instale o Pixel/GA4 de novo dentro dele para não contar em dobro.

## 4. Formulário (Formspree)
Crie um formulário em formspree.io e cole o endpoint em **`FORM_ENDPOINT`** (topo do `main.js`). Enquanto estiver vazio, o envio abre o WhatsApp com os dados já preenchidos.

## 5. Publicar
- **Manual (cPanel/HostGator):** Gerenciador de Arquivos → `public_html` → envie o conteúdo desta pasta (a raiz precisa ter `index.html`) ou use FTP.
- **Neste repositório:** a pasta está em `clientes/clinica-modelo/`; o workflow de deploy publica em `public_html/clinica-modelo/`.

## 6. Antes e depois
Não incluído. Há um bloco comentado em `index.html` (“ANTES E DEPOIS”) para ativar só após confirmar o que o conselho profissional permite.

## Observações
- As fotos são do Unsplash (licença gratuita, carregadas por link externo; há crédito “Unsplash” no rodapé). Se uma não carregar, o site mostra automaticamente a ilustração de `assets/img/`. Para produção, baixe e hospede em `assets/img/` as imagens que escolher e use fotos reais da clínica.
- Textos de depoimentos, números e equipe são **provisórios**.
