# OutGuessed — Frontend

Frontend do jogo multijogador OutGuessed, com React, TypeScript, Vite e Tailwind CSS.
O projeto usa Bun e React Router em modo declarativo. A base atual contém apenas
a Home em `/`, intencionalmente vazia, sem integrações com o backend.

## Responsabilidades e dependências

A direção das dependências é `app → modules → shared`. Uma camada pode
usar as camadas abaixo dela, sem dependências no sentido inverso.

| Camada    | Responsabilidade                                                                            |
| --------- | ------------------------------------------------------------------------------------------- |
| `app`     | Componente raiz, roteador, inicialização e configuração global.                             |
| `modules` | Organização por funcionalidade, reunindo páginas e comportamento específico de cada módulo. |
| `shared`  | Infraestrutura e interface reutilizáveis, independentes do domínio.                         |

As páginas ficam em `modules/<módulo>/pages/` e compõem a interface das rotas,
sem lógica de negócio, chamadas HTTP diretas ou listeners de socket. API, hooks,
estado, componentes, tipos e adaptadores pertencem ao respectivo módulo e serão
adicionados conforme houver comportamento para implementar. Esses elementos não
devem depender das páginas que os compõem.

Os módulos são:

- `home`: página inicial, atualmente vazia.
- `auth`: reservado para autenticação e sessão, incluindo convidados conforme o contrato do backend.
- `decks`: reservado para gestão de decks.
- `cards`: reservado para gestão de cartas e suas dicas.
- `boards`: reservado para gestão e seleção de definições de tabuleiros.
- `match`: reservado para lobby, partida, jogadores, rodadas, respostas, julgamento, chat e exibição do tabuleiro em jogo.

`shared` não importa de `modules` ou `app`. Módulos não importam de `app`.
Evite dependências circulares entre módulos; a composição entre eles pertence
às camadas superiores sempre que possível.

Use `@/` para imports a partir de `src`, como `@/app/App`. O alias está configurado
no TypeScript e no Vite. Imports relativos podem ser usados dentro do mesmo módulo.
Consumidores externos devem usar a API pública do módulo quando disponível,
como `@/modules/home`, em vez de acessar seus arquivos internos. Não crie arquivos
de exports vazios.

## Roteamento

`src/main.tsx` monta `app/App.tsx` dentro de `StrictMode`. O `App` mantém um único
`BrowserRouter` e renderiza as rotas declaradas em `app/router.tsx`.

| Caminho | Comportamento                                                                     |
| ------- | --------------------------------------------------------------------------------- |
| `/`     | Renderiza `HomePage`, exportada por `modules/home`; a página retorna `null`.      |
| `*`     | Redireciona para `/` com `replace`, substituindo a URL desconhecida no histórico. |

Para adicionar uma página:

1. Crie o componente em `src/modules/<módulo>/pages/`.
2. Exporte a página pelo `index.ts` do módulo.
3. Importe a página pela API pública do módulo em `src/app/router.tsx` e registre
   seu `<Route>` dentro de `<Routes>`, mantendo o fallback `*`.

Use caminhos em inglês e textos da interface em português. Navegações internas
devem usar `Link`, `NavLink` ou `useNavigate` do React Router, conforme necessário,
sem criar outro roteador. Layouts e provedores serão adicionados quando houver
uma necessidade concreta.

### Hospedagem

Como `BrowserRouter` usa URLs sem `#`, a hospedagem deve servir `index.html`
para caminhos de navegação que não correspondam a arquivos existentes,
preservando a URL para o roteador do cliente. Isso permite abrir links diretamente,
recarregar páginas e executar o fallback de URLs desconhecidas. Arquivos estáticos
e eventuais rotas de API devem manter seu tratamento próprio. O servidor de
desenvolvimento do Vite já oferece o fallback de SPA; a configuração da hospedagem
de produção deverá ser feita quando o provedor for escolhido.

## Integrações e estado

Os fluxos abaixo orientam implementações futuras; ainda não existem clientes
HTTP/WebSocket, provedores de sessão ou bibliotecas de consultas e estado configurados.

**HTTP:** componente → hook/ação do módulo → API do módulo → cliente HTTP em
`shared/http`. Endpoints e tipos de transporte pertencem ao módulo e devem seguir
os contratos reais do backend.

**Tempo real:** cliente em `shared/realtime` → adaptador de `modules/match` →
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
