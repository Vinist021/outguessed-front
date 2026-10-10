## Projeto

Frontend de um jogo multijogador de perguntas e cartas, desenvolvido com React, TypeScript e Vite, com um backend separado.
O código atual apresenta a Home com componentes e salas ilustrativas. Ainda não há integração HTTP ou WebSocket, autenticação funcional, custom hooks de funcionalidade nem armazenamento centralizado de estado no frontend.
A organização é por funcionalidades. Quando a integração com o backend for implementada, HTTP atenderá operações com recursos e WebSocket atenderá a partida em tempo real; o backend será a autoridade sobre a partida.
O código e as configurações existentes, as regras de negócio, os contratos do backend quando existirem e o `AGENTS.md` aplicável mais próximo são as fontes de referência.

## Referências do projeto

Os caminhos abaixo são relativos à pasta que contém `outguessed-front/` e `outguessed-back/`:

- As regras de negócio estão em `outguessed-back/rules.md`.
- O diagrama DER fica em `outguessed-back/DER.txt`.
- As inspirações visuais para o projeto ficam em `outguessed-front/inspo/`.

## Prioridade das instruções

1. Instruções da tarefa atual.
2. `AGENTS.md` aplicável mais próximo.
3. Documentação explícita e contratos do backend, incluindo as regras de negócio e o DER indicados acima.
4. Padrões existentes no repositório.
5. Convenções gerais de React e TypeScript.

## Antes de alterar o código

- Examine primeiro a funcionalidade afetada e implementações semelhantes.
- Verifique `package.json`, dependências, scripts, aliases, roteador e estilos; confirme se já existem gerenciamento de estado ou infraestrutura HTTP e de tempo real antes de usá-los.
- Quando a tarefa envolver dados ou estado, classifique-os como estado local da interface, estado do servidor obtido por HTTP ou estado da partida em tempo real.
- Reutilize as abstrações existentes antes de criar outras.
- Prefira a menor alteração correta; evite refatorações ou reformulações que não tenham relação com a tarefa.
- Preserve as rotas existentes e, quando implementados, dados enviados e recebidos pela API, comportamento de autenticação e contratos WebSocket, exceto quando a tarefa pedir explicitamente sua alteração.

## Arquitetura

Composição atual: `src/main.tsx → src/App.tsx → src/shared/routes/router.tsx → src/modules/home/home.tsx`.

- `src/main.tsx` monta o React em `StrictMode` e importa os estilos globais; `src/App.tsx` mantém um único `BrowserRouter`.
- O alias `@/` aponta para `src/`, conforme `vite.config.ts` e `tsconfig.app.json`.
- `src/shared/routes/router.tsx` centraliza as rotas e importa `Home` diretamente do módulo. A rota `/` renderiza a Home; URLs desconhecidas redirecionam para `/` com substituição do histórico. Use caminhos em inglês e interface em português.
- `src/modules/` organiza funcionalidades. `home` contém a página, seus componentes em `components/<componente>/` e dados ilustrativos em `mocks/`. `auth`, `boards`, `cards`, `decks` e `match` ainda são diretórios reservados, sem implementação.
- `src/shared/` reúne ativos, estilos globais, roteamento e componentes de interface. `shared/http` e `shared/realtime` são apenas diretórios reservados. `shared/ui` também não contém implementação.
- Páginas compõem a interface com componentes locais e compartilhados. Mantenha componentes e dados específicos junto da funcionalidade; reserve `shared/components/` para componentes independentes do domínio. Crie arquivos e APIs públicas de módulo apenas quando necessários; não exija `index.ts` nem uma estrutura plana.
- O roteador pode importar páginas dos módulos. Evite dependências circulares; módulos não devem depender de `App`, `main.tsx` ou do roteador. Componentes compartilhados novos devem ser independentes dos módulos. Hoje `Button`, `Field` e `Icon` importam `home.module.css`; trate esse acoplamento como legado a remover quando cada componente for editado.

Quando houver acesso a dados, mantenha JSX e composição nas páginas, coordenação de estado e efeitos em hooks quando forem úteis, e operações HTTP independentes do React na API da funcionalidade. Não crie hooks para transformações puras nem camadas ou arquivos sem necessidade concreta. API e componentes não devem depender da página; a API não deve depender dos hooks.

## Domínio e autoridade do servidor

Use de forma consistente a terminologia do backend: `Deck`, `Card`, `Match`, `Player`, `Round`, `Board`, `Answer`, `Judge`.
Cartas podem ter dados específicos de cada tipo; nunca presuma que todas possuem os mesmos campos.
Um `Player` pode ser autenticado ou convidado; nunca presuma que `playerId === userId`.
O backend determina a validade das ações, a correção das respostas, o movimento no tabuleiro, os turnos, o fim das rodadas, os vencedores e o fim da partida. Não introduza pontuação numérica: siga `rules.md`.
O frontend envia a intenção do usuário e exibe o estado confirmado pelo servidor.
Restrições no cliente servem à experiência do usuário, não à autorização.
Nunca calcule nem persista vencedor, correção de resposta ou posição no tabuleiro como verdade definida pelo navegador.

## Estado

A Home atual usa dados ilustrativos estáticos em `src/modules/home/mocks/rooms.ts`; ainda não há biblioteca de estado do servidor nem armazenamento de estado da partida.

- Para estado temporário da interface, use o estado do React quando necessário.
- Ao integrar HTTP, diferencie estado do servidor de estado local e evite duplicá-lo sem necessidade. Adote uma abstração de consultas somente quando a funcionalidade justificar.
- Ao integrar a partida em tempo real, mantenha um caminho centralizado para sincronizar o estado confirmado pelo servidor. Use atualizações imutáveis e seletores claros se houver armazenamento compartilhado; seletores não devem recriar a autoridade do backend.
- Não persista estado que possa ser derivado com segurança nem imponha uma única solução de estado para todas as categorias.

## HTTP e contratos

Ainda não existem cliente HTTP implementado, endpoints consumidos nem contratos de transporte no frontend. Quando forem criados, siga o fluxo `página/componente → hook quando houver estado ou efeitos → API da funcionalidade → cliente HTTP compartilhado`.
A API da funcionalidade deve ser independente do React e pode usar `shared/http` depois que essa infraestrutura existir.
Não espalhe requisições HTTP diretas pelos componentes nem crie um `ApiService` enorme que reúna vários domínios.
Os tipos de transporte devem corresponder aos contratos reais do backend.
Reutilize contratos compartilhados ou gerados quando disponíveis; caso contrário, defina explicitamente os tipos nas fronteiras.
Não use `any` para esconder incertezas sobre os dados nem altere silenciosamente caminhos de endpoints, campos, formatos de requisição e resposta ou comportamento de autenticação.

## Tempo real

Ainda não há cliente WebSocket, eventos implementados ou armazenamento de tempo real no frontend. Ao implementá-los, use o fluxo `cliente de socket → lógica de tempo real da funcionalidade → estado sincronizado → hooks quando úteis → páginas e componentes React`.
Os consumidores devem compartilhar a conexão pertinente, sem criar uma conexão por componente ou hook.
Mantenha um único ciclo de vida da conexão, com responsável claro, por sessão ou partida relevante; não crie sockets por componente nem sockets separados para chat sem necessidade.
Centralize o registro de eventos que se sobrepõem; nunca registre listeners durante a renderização.
Sempre remova inscrições e listeners quando apropriado e trate conexão, desconexão, reconexão, autenticação e entrada e saída da partida.
Quando os contratos existirem, siga exatamente os nomes e dados dos eventos do backend; nunca invente uma convenção paralela de eventos.
Prefira mapas tipados de eventos de cliente e servidor quando houver suporte.
Cada evento do servidor deve ter um único caminho claro e determinístico para atualizar o estado.
Não presuma que ações emitidas pelo cliente terão sucesso; trate falhas do protocolo.
Após uma reconexão, prefira obter um estado completo e autoritativo do servidor para sincronização, quando houver suporte.
Nunca apresente silenciosamente como atual um estado da partida que se sabe desatualizado.

## Interface da partida

Quando a interface da partida for implementada, aplique as diretrizes abaixo.

Componentes do tabuleiro, chat, julgamento, formulários de resposta e partida devem exibir o estado autoritativo e emitir intenções do usuário.
Animações representam transições de estado; NÃO DEVEM determinar o estado do jogo.
Use atualizações otimistas apenas quando houver reversão ou reconciliação definida; nunca invente resultados da partida de forma otimista.
Mantenha tabuleiro e chat em `match` enquanto estiverem fortemente ligados à partida; extraia apenas quando a complexidade independente ou a reutilização justificar.

## Autenticação e segurança

O painel de login e a menção a convidados na Home ainda são ilustrativos; não há login, cadastro, logout, restauração de sessão ou proteção de rotas implementados no frontend.
Quando a autenticação for implementada, siga os contratos do backend para sessão, tokens/cookies, convidados e proteção de rotas. Não crie um mecanismo concorrente nem usuários convidados fictícios no cliente.
As identidades fornecidas pelo backend devem ser a referência para convidados e reconexões.
Nunca exponha nem registre senhas, tokens, chaves privadas de API, credenciais, segredos do backend ou segredos de assinatura e provedores.
Variáveis de ambiente expostas ao frontend são públicas; nunca armazene segredos nelas.
Trate conteúdo de usuários e do backend como não confiável; evite `dangerouslySetInnerHTML` para conteúdo de usuários sem sanitização explícita.
Chamadas a IA ou a provedores privados que exijam segredos devem passar pelo backend.

## React, interface e TypeScript

Mantenha os componentes focados; separe a renderização de chamadas à API, sockets, sincronização de estado e transformações complexas.
Crie hooks apenas para comportamentos relevantes e reutilizáveis do React ou da funcionalidade.
Reutilize componentes básicos de interface, padrões visuais, responsividade e acessibilidade existentes. Ao introduzir formulários ou validação funcional, verifique primeiro o que o projeto já oferece.
O projeto usa Tailwind para utilitários de layout e estilos CSS para a aparência dos componentes. `src/shared/styles/index.css` contém estilos globais; a Home ainda concentra estilos em `home.module.css`, inclusive estilos usados por componentes em `shared`.
Para cada componente novo que precise de estilos próprios, crie um arquivo `.css` comum na mesma pasta do componente e importe-o ali. Ao editar um componente existente, migre os estilos desse componente de `home.module.css` para seu próprio `.css`; não amplie a dependência de componentes compartilhados dos estilos da Home. Mantenha estilos globais apenas quando forem realmente globais e use nomes de classes que evitem colisões.
Não introduza outro roteador, biblioteca de estado, cliente HTTP, biblioteca de consultas, biblioteca de formulários, validador, cliente WebSocket, sistema de estilos ou framework de interface sem necessidade concreta. No momento, somente o roteador e a combinação Tailwind/CSS estão implementados entre essas escolhas.
Prefira HTML semântico, controles acessíveis por teclado e nomes acessíveis.
Use tipos precisos em TypeScript; prefira `unknown` com refinamento de tipos a `any`.
Evite asserções inseguras e NÃO use `@ts-ignore` para contornar erros de implementação.
Reutilize tipos de domínio e transporte existentes em vez de criar duplicatas sutilmente diferentes.

## Erros e experiência durante operações assíncronas

Nunca ignore silenciosamente falhas relevantes.
Trate, quando pertinentes, estados de carregamento, controles desabilitados ou em envio, validação do backend, autorização, expiração de sessão e conexão.
Não exponha rastros de pilha, detalhes do banco de dados, informações internas de provedores ou erros brutos de implementação do servidor.
Não use atrasos arbitrários para simular a conclusão de operações do backend.

## Comandos e dependências

O projeto usa Bun (`bun.lock`), Vite, React e TypeScript, com ESLint e Prettier. Os scripts disponíveis em `package.json` são `dev`, `build` (`tsc -b && vite build`), `lint`, `lint:fix`, `format`, `format:check` e `preview`; não há script de teste separado.
Examine `package.json` antes de executar ou documentar comandos. Use Bun e os scripts existentes, por exemplo `bun run build` e `bun run lint`; não invente comandos nem afirme que uma verificação passou sem executá-la.
Antes de adicionar uma dependência, verifique se as bibliotecas existentes ou APIs da plataforma podem resolver o problema de forma razoável.
Nunca substitua dependências estabelecidas apenas por preferência.
Só afirme que um comando ou uma verificação passou se ele tiver sido executado com sucesso.

## Fluxo de trabalho do agente e critérios de conclusão

Para cada tarefa: examinar → identificar a responsabilidade e a fronteira → reutilizar padrões existentes → implementar a menor alteração → validar → revisar o diff final.
Antes de concluir, verifique o comportamento solicitado, os limites da arquitetura, a autoridade do backend, os contratos de API e WebSocket, a remoção de listeners, os estados assíncronos e erros relevantes, a segurança e a ausência de alterações sem relação com a tarefa.
Execute os comandos pertinentes de lint, verificação de tipos, teste e build quando disponíveis e analise falhas em vez de contorná-las.
NÃO desative lint, verificação de tipos ou testes, não enfraqueça testes para esconder comportamentos incorretos, não exponha segredos, não introduza infraestrutura concorrente nem crie abstrações para necessidades futuras hipotéticas.
Prefira código simples, explícito e restrito à funcionalidade em vez de complexidade arquitetural desnecessária.
