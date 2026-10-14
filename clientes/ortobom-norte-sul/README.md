# Site Ortobom Norte Sul (loja franqueada, Campinas/SP)

Site estático (HTML + CSS + JavaScript puro), sem build. Suba a pasta como está.

```
index.html  produtos/  sobre-nos/  contato/  informacoes-de-entrega/
politica-de-privacidade/  termos-de-uso/  404.html
assets/css/style.css   assets/js/main.js   assets/img/
favicon.svg  robots.txt  sitemap.xml  .htaccess
```

Para ver no seu computador: `cd clientes/ortobom-norte-sul && python3 -m http.server 8080` e abra http://localhost:8080.

## 1. Onde trocar os dados da loja

Tudo fica no topo de `assets/js/main.js`, no objeto `CONFIG` (WhatsApp, telefone, e-mail, Instagram, endereço, horário, mensagem padrão).
O JS atualiza os elementos marcados com `data-cfg`, e os links de WhatsApp/telefone.

> Os dados da empresa também estão **escritos no HTML** (rodapé, Sobre, Contato, Mapa) para o Google ler sem JavaScript.
> Se mudar telefone, endereço, horário ou CNPJ, troque também nos arquivos `.html` (busque o valor antigo em todos os arquivos) e no JSON-LD do `<head>`.

## 2. Como adicionar um produto

Em `assets/js/main.js`, no array `PRODUCTS`, copie um bloco e ajuste:

```js
{
  id: "colchao-novo",              // único, sem espaços
  categoria: "colchoes",           // colchoes | camas-e-bases | travesseiros | acessorios
  nome: "Nome do modelo",
  img: "/assets/img/colchao-novo.jpg",  // ou un("CODIGO-DA-FOTO-UNSPLASH")
  alt: "Descrição da foto",
  indicado: "Para quem gosta de ...",
  firmeza: 3, firmezaTexto: "Médio",    // 1 a 5; use null e "" se não se aplica
  tamanhos: ["Solteiro", "Casal", "Queen", "King"],
  descricao: "Texto que aparece em 'Ver detalhes'.",
},
```

Não coloque preços e não use alegações de saúde (veja o checklist do Google Ads).

## 3. IDs de rastreamento e Formspree

Em `assets/js/main.js`:

- `CONFIG.GTM_ID` já vem com `GTM-M77GRQG5` (container atual).
- `CONFIG.META_PIXEL_ID`: cole o ID do Pixel da Meta.
- `CONFIG.GA4_ID`: cole o `G-XXXXXXXXXX`. **Se o GA4 já está configurado dentro do GTM, deixe vazio** para não contar duas vezes.
- `FORM_ENDPOINT` (primeira linha do arquivo): cole o endereço do Formspree (`https://formspree.io/f/xxxx`). Vazio = o formulário abre o WhatsApp com os dados.

Nada de rastreamento carrega antes do clique em **Aceitar** no banner de cookies. Eventos enviados (dataLayer/GTM, Meta e GA4):

| Evento | Quando | GA4 equivalente |
|---|---|---|
| `Lead` | envio do formulário | `generate_lead` |
| `Contact` | clique em WhatsApp ou telefone (parâmetro `section` = seção da página) | `contact` |
| `ViewContent` | abrir "Ver detalhes" de um produto | `view_item` |

UTMs e `gclid` da URL ficam no `sessionStorage` e vão na mensagem do WhatsApp e no envio do formulário.
No GTM, crie os gatilhos pelos nomes de evento acima.
O `<noscript>` do GTM foi omitido de propósito (ele carregaria sem consentimento).

## 4. Publicar na HostGator (substituindo o WordPress com segurança)

1. **Backup completo antes de tudo:** cPanel → *Backup* → baixe o backup completo, ou *Gerenciador de arquivos* → compacte `public_html` e baixe. Exporte também o banco de dados (phpMyAdmin) e salve o `.htaccess` atual.
2. **Teste primeiro** (opcional): crie um subdomínio de teste e suba lá os arquivos.
3. Dentro de `public_html`, mova os arquivos do WordPress para uma pasta de reserva (ex.: `_wp_backup`) em vez de apagar.
4. Envie **o conteúdo** desta pasta (não a pasta em si) para `public_html`, incluindo o arquivo oculto `.htaccess` (no Gerenciador de arquivos, ative *Mostrar arquivos ocultos*).
5. Mantenha os mesmos endereços: `/produtos/`, `/sobre-nos/`, `/contato/`, `/informacoes-de-entrega/`, `/politica-de-privacidade/`, `/termos-de-uso/`.
6. Teste: `https://ortobomnortesul.com.br`, versão com `www` (deve redirecionar), `http://` (deve ir para https), todas as páginas, formulário, WhatsApp e `/pagina-que-nao-existe` (deve abrir o 404).
7. Se algum link de anúncio apontar para um endereço que não existe mais, crie um redirecionamento 301 no `.htaccess` ou em cPanel → *Redirecionamentos*.
8. No Google Search Console, reenvie o `sitemap.xml`.
9. Se algo der errado: devolva o `.htaccess` e os arquivos do WordPress da pasta de reserva.

Ainda há um `.htaccess` para HTTPS, sem www, compressão e cache; confirme se o SSL do domínio está ativo no cPanel antes de publicar.

## 5. Antes de publicar

Procure por `REVISAR` em todos os arquivos (`grep -rn REVISAR .`). Os pontos mais importantes:

- Trocar fotos de exemplo (Unsplash) pelas fotos reais da loja e colocar o logo real.
- Substituir os 4 depoimentos provisórios por depoimentos reais **ou remover a seção `#depoimentos`**. Não publique com os textos provisórios.
- Conferir e-mail, Instagram, prazos de entrega, cidades atendidas e formas de pagamento.
- Pedir revisão jurídica da Política de privacidade e dos Termos de uso.
