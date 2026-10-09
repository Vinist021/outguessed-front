## Projeto

Frontend de um jogo multijogador de perguntas e cartas, desenvolvido com React e TypeScript, com um backend NestJS separado.
HTTP cuida das operações com recursos; WebSocket cuida do comportamento multijogador em tempo real.
A arquitetura é organizada por funcionalidades, e o backend é a autoridade sobre a partida.
O código e as configurações existentes, os contratos do backend e o `AGENTS.md` aplicável mais próximo são as fontes de referência.

## Referências do projeto

Os caminhos abaixo são relativos à pasta que contém `outguessed-front/` e `outguessed-back/`:

* As regras de negócio estão em `outguessed-back/rules.md`.
* O diagrama DER fica em `outguessed-back/DER.txt`.
* As inspirações visuais para o projeto ficam em `outguessed-front/inspo/`.

## Prioridade das instruções

1. Instruções da tarefa atual.
2. `AGENTS.md` aplicável mais próximo.
3. Documentação explícita e contratos do backend, incluindo as regras de negócio e o DER indicados acima.
4. Padrões existentes no repositório.
5. Convenções gerais de React e TypeScript.

## Antes de alterar o código

* Examine primeiro a funcionalidade afetada e implementações semelhantes.
* Verifique `package.json`, dependências, scripts, aliases, roteador, estilos, gerenciamento de estado e infraestrutura HTTP e de tempo real existentes.
* Classifique o estado afetado como estado local da interface, estado do servidor obtido por HTTP ou estado da partida em tempo real.
* Reutilize as abstrações existentes antes de criar outras.
* Prefira a menor alteração correta; evite refatorações ou reformulações que não tenham relação com a tarefa.
* Preserve rotas, dados enviados e recebidos pela API, comportamento de autenticação e contratos WebSocket, exceto quando a tarefa pedir explicitamente sua alteração.

## Arquitetura

Direção das dependências: `app → pages → features → shared`.

* `app/`: inicialização, provedores, roteador e configuração global.
* `pages/`: composição das rotas; evite lógica de negócio, chamadas HTTP diretas e registro de eventos de socket.
* `features/`: unidade principal do comportamento de domínio (`auth`, `decks`, `cards`, `match` etc.).
* `shared/`: apenas infraestrutura e componentes de interface reutilizáveis e independentes do domínio.
* `shared` NÃO DEVE importar de `features` ou `pages`; funcionalidades DEVEM EVITAR depender de páginas.
  Mantenha juntos API, hooks, estado, lógica de tempo real, componentes e tipos específicos de cada funcionalidade.
  Não reorganize código funcional apenas para atender a uma estrutura ideal de diretórios.
  Evite dependências circulares entre funcionalidades e importações internas profundas quando houver uma API pública.

## Domínio e autoridade do servidor

Use de forma consistente a terminologia do backend: `Deck`, `Card`, `Match`, `Player`, `Round`, `Board`, `Answer`, `Judge`.
Cartas podem ter dados específicos de cada tipo; nunca presuma que todas possuem os mesmos campos.
Um `Player` pode ser autenticado ou convidado; nunca presuma que `playerId === userId`.
O backend determina a validade das ações, a correção das respostas, as pontuações, o movimento no tabuleiro, os turnos, o fim das rodadas, os vencedores e o fim da partida.
O frontend envia a intenção do usuário e exibe o estado confirmado pelo servidor.
Restrições no cliente servem à experiência do usuário, não à autorização.
Nunca calcule nem persista pontuação, vencedor, correção de resposta ou posição no tabuleiro como verdade definida pelo navegador.

## Estado

* Estado local da interface: use o estado do React para necessidades temporárias dos componentes.
* Estado do servidor obtido por HTTP: use a abstração de estado do servidor já adotada no repositório; não a duplique no estado global sem necessidade.
* Estado da partida em tempo real: use a solução centralizada de tempo real e armazenamento de estado já adotada.
  Não use indiscriminadamente um único mecanismo de estado para todas as categorias.
  Não persista estado que possa ser derivado com segurança.
  Use atualizações imutáveis e ações e seletores claros para o armazenamento de estado.
  Seletores podem derivar estado para a interface, mas NÃO DEVEM recriar a autoridade do backend.

## HTTP e contratos

Componentes DEVEM seguir, sempre que possível, o fluxo `hook/ação da funcionalidade → API da funcionalidade → cliente HTTP compartilhado`.
Não espalhe requisições HTTP diretas pelos componentes nem crie um `ApiService` enorme que reúna vários domínios.
Os tipos de transporte devem corresponder aos contratos reais do backend.
Reutilize contratos compartilhados ou gerados quando disponíveis; caso contrário, defina explicitamente os tipos nas fronteiras.
Não use `any` para esconder incertezas sobre os dados nem altere silenciosamente caminhos de endpoints, campos, formatos de requisição e resposta ou comportamento de autenticação.

## Tempo real

Use o fluxo `cliente de socket → adaptador de tempo real da funcionalidade → armazenamento/estado → React`.
Mantenha um único ciclo de vida da conexão, com responsável claro, por sessão ou partida relevante; não crie sockets por componente nem sockets separados para chat sem necessidade.
Centralize o registro de eventos que se sobrepõem; nunca registre listeners durante a renderização.
Sempre remova inscrições e listeners quando apropriado e trate conexão, desconexão, reconexão, autenticação e entrada e saída da partida.
Siga exatamente os nomes e dados dos eventos do backend; nunca invente uma convenção paralela de eventos.
Prefira mapas tipados de eventos de cliente e servidor quando houver suporte.
Cada evento do servidor deve ter um único caminho claro e determinístico para atualizar o estado.
Não presuma que ações emitidas pelo cliente terão sucesso; trate falhas do protocolo.
Após uma reconexão, prefira obter um estado completo e autoritativo do servidor para sincronização, quando houver suporte.
Nunca apresente silenciosamente como atual um estado da partida que se sabe desatualizado.

## Interface da partida

Componentes do tabuleiro, chat, julgamento, formulários de resposta e partida devem exibir o estado autoritativo e emitir intenções do usuário.
Animações representam transições de estado; NÃO DEVEM determinar o estado do jogo.
Use atualizações otimistas apenas quando houver reversão ou reconciliação definida; nunca invente resultados da partida de forma otimista.
Mantenha tabuleiro e chat em `match` enquanto estiverem fortemente ligados à partida; extraia apenas quando a complexidade independente ou a reutilização justificar.

## Autenticação e segurança

Preserve a estratégia existente de login, cadastro, logout, restauração de sessão, tokens/cookies, convidados e proteção de rotas.
Não crie um segundo mecanismo de autenticação nem usuários convidados fictícios no cliente.
As identidades fornecidas pelo backend continuam sendo a referência para convidados e reconexões.
Nunca exponha nem registre senhas, tokens, chaves privadas de API, credenciais, segredos do backend ou segredos de assinatura e provedores.
Variáveis de ambiente do frontend são públicas; siga as convenções de nomenclatura existentes e nunca armazene segredos nelas.
Trate conteúdo de usuários e do backend como não confiável; evite `dangerouslySetInnerHTML` para conteúdo de usuários sem sanitização explícita.
Chamadas a IA ou a provedores privados que exijam segredos devem passar pelo backend.

## React, interface e TypeScript

Mantenha os componentes focados; separe a renderização de chamadas à API, sockets, sincronização de estado e transformações complexas.
Crie hooks apenas para comportamentos relevantes e reutilizáveis do React ou da funcionalidade.
Reutilize formulários, validação, componentes básicos de interface, convenções do Tailwind, padrões visuais e padrões de responsividade e acessibilidade existentes.
Não introduza um segundo roteador, biblioteca de estado, cliente HTTP, biblioteca de consultas, biblioteca de formulários, validador, cliente WebSocket, sistema de estilos ou framework de interface sem necessidade explícita.
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

Examine `package.json` antes de executar ou documentar comandos de instalação, desenvolvimento, build, teste, lint, verificação de tipos ou formatação.
Use o gerenciador de pacotes e os scripts existentes no repositório; nunca invente comandos.
Antes de adicionar uma dependência, verifique se as bibliotecas existentes ou APIs da plataforma podem resolver o problema de forma razoável.
Nunca substitua dependências estabelecidas apenas por preferência.
Só afirme que um comando ou uma verificação passou se ele tiver sido executado com sucesso.

## Fluxo de trabalho do agente e critérios de conclusão

Para cada tarefa: examinar → identificar a responsabilidade e a fronteira → reutilizar padrões existentes → implementar a menor alteração → validar → revisar o diff final.
Antes de concluir, verifique o comportamento solicitado, os limites da arquitetura, a autoridade do backend, os contratos de API e WebSocket, a remoção de listeners, os estados assíncronos e erros relevantes, a segurança e a ausência de alterações sem relação com a tarefa.
Execute os comandos pertinentes de lint, verificação de tipos, teste e build quando disponíveis e analise falhas em vez de contorná-las.
NÃO desative lint, verificação de tipos ou testes, não enfraqueça testes para esconder comportamentos incorretos, não exponha segredos, não introduza infraestrutura concorrente nem crie abstrações para necessidades futuras hipotéticas.
Prefira código simples, explícito e restrito à funcionalidade em vez de complexidade arquitetural desnecessária.
