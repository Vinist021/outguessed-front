# OutGuessed — Frontend

Frontend do jogo multijogador OutGuessed, com React, TypeScript, Vite e Tailwind CSS.
O projeto usa Bun e está na etapa de preparação estrutural: exibe apenas o título
existente, sem telas de funcionalidades ou integrações.


## Responsabilidades e dependências

A direção das dependências é `app → pages → features → shared`. Uma camada pode
usar as camadas abaixo dela, sem dependências no sentido inverso.

| Camada     | Responsabilidade                                                                                     |
| ---------- | ---------------------------------------------------------------------------------------------------- |
| `app`      | Componente raiz e futura composição de provedores, roteador e configuração global.                   |
| `pages`    | Composição das rotas; sem lógica de negócio, chamadas HTTP diretas ou listeners de socket.           |
| `features` | Comportamento de domínio, reunindo API, hooks, estado, componentes, tipos e adaptadores específicos. |
| `shared`   | Infraestrutura e interface reutilizáveis, independentes do domínio.                                  |

As funcionalidades reservadas são:

- `auth`: autenticação e sessão, incluindo acesso como convidado conforme o contrato do backend.
- `decks`: gestão de decks.
- `cards`: gestão de cartas e suas dicas.
- `boards`: gestão e seleção de definições de tabuleiros.
- `match`: lobby, partida, jogadores, rodadas, respostas, julgamento, chat e exibição do tabuleiro em jogo.

`shared` não importa de `features`, `pages` ou `app`. Funcionalidades não importam
de `pages` ou `app`. Evite dependências circulares entre funcionalidades; a
composição entre elas pertence às camadas superiores sempre que possível.

Use `@/` para imports a partir de `src`, como `@/app/App`. O alias está configurado
no TypeScript e no Vite. Imports relativos podem ser usados dentro do mesmo módulo.
Quando uma funcionalidade tiver uma API pública, consumidores externos devem
usá-la em vez de acessar seus arquivos internos. Não crie arquivos de exports vazios.

## Integrações e estado

Os fluxos abaixo orientam implementações futuras; ainda não existem clientes,
provedores, roteador ou bibliotecas de consultas e estado configurados.

**HTTP:** componente → hook/ação da funcionalidade → API da funcionalidade →
cliente HTTP em `shared/http`. Endpoints e tipos de transporte pertencem à
funcionalidade e devem seguir os contratos reais do backend.

**Tempo real:** cliente em `shared/realtime` → adaptador de `features/match` →
estado centralizado da partida → React. A integração deverá ter um responsável
único pelo ciclo de vida da conexão, remover listeners e reconciliar o estado
após reconexão conforme o protocolo do servidor. Chat compartilha a conexão da
partida quando permitido pelo protocolo.

| Categoria de estado   | Orientação                                                                          |
| --------------------- | ----------------------------------------------------------------------------------- |
| Local da interface    | Estado React para necessidades temporárias dos componentes.                         |
| Servidor via HTTP     | Futura abstração de consultas/cache, sem duplicação desnecessária em estado global. |
| Partida em tempo real | Estado centralizado em `match`, atualizado a partir das confirmações do servidor.   |

As bibliotecas serão escolhidas quando essas integrações forem implementadas.
O frontend envia intenções; o backend determina ações válidas, avaliações,
movimento, vencedores e transições. Não derive contratos de transporte do DER,
não presuma `playerId === userId` e não implemente resultados autoritativos no navegador.

## Comandos

```sh
bun install
bun run dev
bun run build
bun run lint
bun run format:check
bun run preview
```

`build` executa a verificação TypeScript antes de gerar o bundle. `preview` serve
o build localmente. Também existem `bun run lint:fix` e `bun run format`, que
reescrevem arquivos; use-os apenas no escopo desejado. Ainda não há script de testes.

No Windows, se o PowerShell bloquear `bun.ps1`, use `bun.cmd` no lugar de `bun`,
sem alterar a política de execução do sistema.
