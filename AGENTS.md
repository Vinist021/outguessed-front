## Project

Frontend for a multiplayer question/card game built with React + TypeScript, with a separate NestJS backend.
HTTP handles resource operations; WebSocket handles realtime multiplayer behavior.
Architecture is feature-oriented and the backend is authoritative for gameplay.
Existing repository code, configuration, backend contracts, and the closest applicable `AGENTS.md` are the source of truth.

## Instruction Priority

1. Current task instructions.
2. Closest applicable `AGENTS.md`.
3. Explicit documentation/backend contracts.
4. Existing repository patterns.
5. General React/TypeScript conventions.

## Before Changing Code

* Inspect the affected feature and similar implementations first.
* Check `package.json`, existing dependencies, scripts, aliases, router, styling, state, HTTP, and realtime infrastructure.
* Classify affected state as local UI, HTTP server state, or realtime match state.
* Reuse existing abstractions before creating new ones.
* Prefer the smallest correct change; do not perform unrelated refactors or redesigns.
* Preserve existing routes, API payloads, authentication semantics, and WebSocket contracts unless explicitly changing them.

## Architecture

Dependency direction: `app → pages → features → shared`.

* `app/`: bootstrap, providers, router, global configuration.
* `pages/`: route-level composition; avoid business logic, raw HTTP, or socket registration.
* `features/`: primary unit for domain behavior (`auth`, `decks`, `cards`, `match`, etc.).
* `shared/`: genuinely domain-neutral reusable infrastructure/UI only.
* `shared` MUST NOT import from `features` or `pages`; features SHOULD NOT depend on pages.
  Keep feature-specific API, hooks, state, realtime logic, components, and types colocated.
  Do not reorganize working code solely to match an ideal directory structure.
  Avoid circular feature dependencies and deep imports into another feature when a public API exists.

## Domain & Server Authority

Use backend terminology consistently: `Deck`, `Card`, `Match`, `Player`, `Round`, `Board`, `Answer`, `Judge`.
Cards may have different type-specific payloads; never assume identical fields.
A `Player` may be authenticated or guest; never assume `playerId === userId`.
The backend determines action validity, answer correctness, scores, board movement, turns, round completion, winners, and match completion.
The frontend sends user intent and renders server-confirmed state.
Client-side restrictions are UX, never authorization.
Never calculate or persist authoritative score, winner, correctness, or board position as browser truth.

## State

* Local UI state: use React state for ephemeral component concerns.
* HTTP server state: use the repository's established server-state abstraction; do not duplicate it into global state without need.
* Realtime match state: use the established centralized realtime/store solution.
  Do not use one state mechanism indiscriminately for all categories.
  Do not persist safely derivable state.
  Use immutable updates and clear store actions/selectors.
  Selectors may derive UI state but MUST NOT recreate backend authority.

## HTTP & Contracts

Components SHOULD use `feature hook/action → feature API → shared HTTP client`.
Do not scatter raw HTTP requests through components or create a giant cross-domain `ApiService`.
Transport types must match actual backend contracts.
Reuse shared/generated contracts when available; otherwise type boundaries explicitly.
Do not use `any` to hide uncertain payloads or silently change endpoint paths, fields, request/response shapes, or auth behavior.

## Realtime

Use `socket client → feature realtime adapter → store/state → React`.
Maintain one clearly owned connection lifecycle per relevant session/match; do not create sockets per component or separate chat sockets unnecessarily.
Centralize overlapping event registration; never register listeners during render.
Always clean up subscriptions/listeners and handle connection, disconnection, reconnection, authentication, and match entry/exit.
Follow backend event names/payloads exactly; never invent a parallel event convention.
Prefer typed client/server event maps when supported.
Each server event should have one clear deterministic state-update path.
Do not assume client-emitted actions succeed; handle protocol failures.
After reconnecting, prefer an authoritative server snapshot/resynchronization when supported.
Never silently present known-stale match state as current.

## Gameplay UI

Board, chat, judging, answer forms, and match components should render authoritative state and emit intent.
Animations visualize state transitions; they MUST NOT determine game state.
Use optimistic updates only when rollback/reconciliation is defined; never optimistically invent gameplay outcomes.
Keep board/chat inside `match` while tightly coupled; extract only when independent complexity or reuse justifies it.

## Authentication & Security

Preserve the existing login, registration, logout, session restoration, token/cookie, guest, and route-protection strategy.
Do not create a second authentication mechanism or fake guest users client-side.
Backend-provided identities remain authoritative for guests and reconnection.
Never expose/log passwords, tokens, private API keys, credentials, backend secrets, or signing/provider secrets.
Frontend environment variables are public; follow existing env naming conventions and never store secrets in them.
Treat user/backend content as untrusted; avoid `dangerouslySetInnerHTML` for user content without explicit sanitization.
AI/private-provider calls requiring secrets belong behind the backend.

## React, UI & TypeScript

Keep components focused; separate rendering from API, socket, state synchronization, and complex transformations.
Create hooks only for meaningful reusable React/feature behavior.
Reuse existing forms, validation, UI primitives, Tailwind conventions, design tokens, and responsive/accessibility patterns.
Do not introduce a second router, state library, HTTP client, query library, form library, validator, WebSocket client, styling system, or UI framework without explicit need.
Prefer semantic HTML, keyboard-accessible controls, and accessible names.
Use precise TypeScript types; prefer `unknown` + narrowing over `any`.
Avoid unsafe assertions and MUST NOT use `@ts-ignore` to bypass implementation errors.
Reuse existing domain/transport types instead of creating subtly different duplicates.

## Errors & Async UX

Never silently swallow meaningful failures.
Handle relevant loading, disabled/submitting, backend validation, authorization, session-expiry, and connection states.
Do not expose stack traces, database details, provider internals, or raw server implementation errors.
Do not use arbitrary delays to simulate backend completion.

## Commands & Dependencies

Inspect `package.json` before running or documenting install/dev/build/test/lint/typecheck/format commands.
Use the repository's existing package manager and scripts; never invent commands.
Before adding a dependency, verify existing libraries/platform APIs cannot reasonably solve the problem.
Never replace established dependencies based only on preference.
Only claim a command/check passed if it was actually executed successfully.

## Agent Workflow / Definition of Done

For every task: inspect → identify ownership/boundary → reuse existing patterns → implement the smallest change → validate → review the final diff.
Before completion verify the requested behavior, architecture boundaries, backend authority, API/WebSocket contracts, listener cleanup, relevant async/error states, security, and absence of unrelated changes.
Run relevant lint/typecheck/test/build commands when available and inspect failures instead of bypassing them.
MUST NOT disable lint/type checking/tests, weaken tests to hide incorrect behavior, expose secrets, introduce competing infrastructure, or create abstractions for hypothetical future requirements.
Prefer simple, explicit, feature-local code over architectural ceremony.