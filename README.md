# CLIENTES_SITE — Deploy automatico de paginas de clientes (AutoFlow)

Sistema para publicar páginas de clientes da AutoFlow na hospedagem Hostinger
automaticamente, via FTP/FTPS, sem precisar do FileZilla ou do painel da
Hostinger.

## Como funciona

1. Cada cliente tem uma pasta em `clientes/<slug>/` com os arquivos estáticos
   da página (HTML, CSS, JS, imagens, SVG, fontes, vídeos, JSON, subpastas, etc.).
2. O comando de deploy conecta na Hostinger via FTP/FTPS (modo passivo),
   cria a pasta do cliente em `public_html/<slug>/` se ela não existir, e
   envia todos os arquivos preservando a estrutura de diretórios.
3. Arquivos existentes são sobrescritos; arquivos de **outros** clientes
   nunca são tocados ou apagados (o envio só adiciona/atualiza dentro da
   pasta do próprio cliente).
4. Ao final, o sistema monta e exibe a URL pública do cliente e faz uma
   checagem HTTP para confirmar que a página está no ar.

## 0. Deploy automático via GitHub Actions (recomendado)

O ambiente onde este assistente roda não tem acesso de rede a FTP (só HTTPS),
então o caminho recomendado é deixar o **GitHub Actions** publicar
automaticamente sempre que uma pasta de cliente for adicionada/atualizada em
`clientes/**` e o commit for enviado para o GitHub. O workflow já está em
`.github/workflows/deploy-clientes.yml`.

### Configuração única: cadastrar a senha como Secret do GitHub

1. No GitHub, abra o repositório → **Settings** → **Secrets and variables** →
   **Actions** → **New repository secret**.
2. Nome: `FTP_PASSWORD`
3. Valor: a senha real da conta FTP da Hostinger.
4. Salve.

A senha nunca fica no código nem no workflow — o arquivo `.github/workflows/deploy-clientes.yml`
só referencia `${{ secrets.FTP_PASSWORD }}`, que o GitHub injeta de forma
criptografada só durante a execução. Host, usuário, porta e domínio não são
segredos e ficam direto no workflow; só a senha é secreta.

### Como publicar um cliente a partir de agora

- **Automático**: adicione/atualize a pasta `clientes/<slug>/` neste
  repositório e faça `git push` para a branch `claude/amazing-turing-3twrs6`
  (ou `main`). O workflow dispara sozinho, publica **todos** os clientes que
  existem em `clientes/` (o upload é seguro para reexecutar — só sobrescreve,
  nunca apaga) e mostra o link de cada um no resumo da execução (aba
  **Actions** do GitHub → a execução → **Summary**).
- **Manual (sob demanda)**: aba **Actions** → workflow **"Deploy Clientes
  (Hostinger FTP)"** → **Run workflow**. Deixe o campo `slug` vazio para
  publicar todos os clientes, ou informe um slug específico (ex:
  `proposta-cliente`) para publicar só aquele.

Depois disso, o fluxo passa a ser: você me manda a pasta do cliente → eu
crio/atualizo `clientes/<slug>/` e faço o commit/push → o GitHub Actions
publica na Hostinger e eu te devolvo o link.

## 1. Configuração para rodar localmente (opcional)

As credenciais ficam **somente** no arquivo `.env` (nunca no código, nunca no
Git). O `.gitignore` já bloqueia o commit desse arquivo.

Copie `.env.example` para `.env` (já existe um `.env` criado com os dados
informados) e edite a senha real:

```env
FTP_HOST=195.35.41.20
FTP_PORT=21
FTP_USER=u874685658.agenciaautoflow.com.br
FTP_PASSWORD=coloque_a_senha_real_aqui
FTP_SECURE=true
FTP_TLS_REJECT_UNAUTHORIZED=false
FTP_REMOTE_ROOT=/public_html
PUBLIC_DOMAIN=https://agenciaautoflow.com.br
```

- `FTP_SECURE=true` ativa FTPS explícito (AUTH TLS na porta 21), que é o
  protocolo suportado pela Hostinger nessa porta.
- `FTP_TLS_REJECT_UNAUTHORIZED=false` é necessário porque o certificado TLS
  da Hostinger nessa conta é emitido para o host compartilhado, não para o
  IP `195.35.41.20` — com a verificação estrita ligada, a conexão falha com
  `Hostname/IP does not match certificate's altnames`. A conexão continua
  criptografada via TLS; só a checagem de identidade do host é relaxada
  (igual ao que a maioria dos clientes FTP como FileZilla faz ao "aceitar"
  esse tipo de certificado). Se um dia usar um host que combine com o
  certificado, pode voltar para `true`.
- `FTP_REMOTE_ROOT` é a pasta raiz onde as pastas dos clientes serão criadas
  (`/public_html` por padrão). Ajuste aqui se a conta usar outro diretório.
- `PUBLIC_DOMAIN` é o domínio usado para montar a URL pública gerada após o
  deploy. Ajuste se o domínio principal da hospedagem mudar.

Instale as dependências (uma vez):

```bash
npm install
```

## 2. Publicar um cliente

```bash
node bin/deploy-cliente.js <slug-do-cliente>
```

Isso publica o conteúdo de `clientes/<slug-do-cliente>/` em
`public_html/<slug-do-cliente>/` na Hostinger.

Também é possível indicar uma pasta local diferente:

```bash
node bin/deploy-cliente.js <slug-do-cliente> /caminho/para/a/pasta
```

Ou via npm script:

```bash
npm run deploy -- <slug-do-cliente>
```

Ao final, o terminal mostra:

- progresso do upload (arquivo por arquivo);
- se o deploy foi concluído ou falhou;
- a URL pública gerada, por exemplo:
  `https://agenciaautoflow.com.br/proposta-cliente/`
- o resultado da verificação HTTP da URL.

## 3. Estrutura do projeto

```text
CLIENTES_SITE/
├─ .env                # credenciais reais (NUNCA versionado)
├─ .env.example        # modelo sem senha
├─ clientes/           # pastas de cada cliente (uma por slug)
│  ├─ teste-hostinger/
│  ├─ proposta-cliente/
│  └─ clinica-exemplo/
├─ src/
│  ├─ config.js        # carrega e valida variáveis de ambiente
│  └─ deploy.js         # API principal: publishClient(slug, opts)
├─ lib/
│  ├─ ftpDeployer.js    # conexão FTP/FTPS, upload, tratamento de erros
│  ├─ httpCheck.js      # verificação HTTP da URL publicada
│  ├─ urlBuilder.js     # monta a URL pública a partir do domínio + slug
│  ├─ logger.js         # logs e progresso no terminal
│  └─ deployError.js    # erro tipado (etapa, cliente, arquivo, solução)
└─ bin/
   └─ deploy-cliente.js # CLI: node bin/deploy-cliente.js <slug> [pasta]
```

Slugs devem usar apenas letras minúsculas, números e hífens
(ex: `proposta-cliente`, `clinica-exemplo`, `empresa-x`).

## 4. Tratamento de erros

O deploy só reporta sucesso se **todas** as etapas passarem: conexão,
autenticação, criação/verificação do diretório remoto e envio de todos os
arquivos. Se qualquer etapa falhar (credenciais inválidas, conexão recusada,
timeout, permissão negada, diretório inexistente, arquivo não enviado), o
sistema informa claramente:

- a etapa que falhou (`conexao`, `criar-diretorio`, `upload`, `validacao`);
- o cliente (slug) afetado;
- o arquivo afetado, quando aplicável;
- a mensagem de erro original do servidor/FTP;
- uma sugestão de solução.

Exemplo de saída em caso de falha:

```
===================================================
 STATUS:  DEPLOY FALHOU
 CLIENTE: teste-hostinger
 ETAPA:   conexao
 ERRO:    530 Login authentication failed
 SOLUCAO: Verifique FTP_USER e FTP_PASSWORD no .env...
===================================================
```

## 5. Uso programático (preparação para o Agency OS)

O módulo `src/deploy.js` expõe `publishClient(slug, options)` de forma
independente do CLI, para ser chamado futuramente por uma interface (botão
"Publicar" no Agency OS), API ou automação:

```js
const { publishClient } = require('./src/deploy');

const result = await publishClient('proposta-cliente', {
  onProgress: ({ file, bytes, bytesOverall }) => { /* atualizar UI */ },
});
// result = { success, client, localDir, remoteDir, filesSent, bytesSent, url, verification }
```

Isso permite adicionar depois, sem reescrever a base: histórico de deploys,
logs persistentes, múltiplos domínios/clientes, status do site, rollback e
publicação de novas versões — bastando orquestrar chamadas a essa mesma
função a partir de cada novo recurso.

## 6. Segurança

- A senha FTP só existe no `.env` (fora do Git) e é lida via variável de
  ambiente (`process.env.FTP_PASSWORD`). Não aparece em nenhum arquivo de
  código, log ou saída do terminal.
- `.env` está no `.gitignore`.
- Nunca compartilhe nem faça commit do `.env`.
