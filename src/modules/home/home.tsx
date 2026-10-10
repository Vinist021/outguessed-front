import type { ComponentPropsWithoutRef, ReactNode } from "react";
import styles from "./home.module.css";

type IconName =
  | "arrow"
  | "book"
  | "bulb"
  | "info"
  | "lock"
  | "mail"
  | "play"
  | "plus"
  | "search"
  | "spark"
  | "user"
  | "users";

function Icon({ name, className = "" }: { name: IconName; className?: string }) {
  const paths: Record<IconName, ReactNode> = {
    arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
    book: (
      <>
        <path d="M12 5v15M3 4.5c3.5-1 6.5-.5 9 1.5 2.5-2 5.5-2.5 9-1.5V19c-3.5-1-6.5-.5-9 1.5C9.5 18.5 6.5 18 3 19Z" />
      </>
    ),
    bulb: (
      <>
        <path d="M9 18h6m-5 3h4M8 14a6 6 0 1 1 8 0c-1 .9-1 2-1 2H9s0-1.1-1-2Z" />
        <path d="M12 2V1M3.5 5.5l-1-1m18 1 1-1" />
      </>
    ),
    info: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 11v6m0-10v.2" />
      </>
    ),
    lock: (
      <>
        <rect x="5" y="10" width="14" height="11" rx="3" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3m-4 5v2" />
      </>
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="3" />
        <path d="m4 7 8 6 8-6" />
      </>
    ),
    play: <path d="m9 5 11 7-11 7Z" />,
    plus: <path d="M12 5v14M5 12h14" />,
    search: (
      <>
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="m16 16 5 5" />
      </>
    ),
    spark: (
      <>
        <path d="m12 3 2.3 6.7L21 12l-6.7 2.3L12 21l-2.3-6.7L3 12l6.7-2.3Z" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="7" r="4" />
        <path d="M4 21v-2a8 8 0 0 1 16 0v2" />
      </>
    ),
    users: (
      <>
        <circle cx="9" cy="7" r="3.5" />
        <path d="M2 21v-2a7 7 0 0 1 14 0v2m0-17a3.5 3.5 0 0 1 0 7m3 10v-2a7 7 0 0 0-2-5" />
      </>
    ),
  };

  return (
    <svg
      className={`${styles.icon} ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {paths[name]}
    </svg>
  );
}

function Button({
  children,
  variant = "secondary",
  className = "",
  ...props
}: ComponentPropsWithoutRef<"button"> & { variant?: "primary" | "secondary" | "outline" }) {
  return (
    <button
      {...props}
      type="button"
      aria-disabled="true"
      className={`${styles.button} ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

function Field({
  label,
  icon,
  id,
  ...props
}: ComponentPropsWithoutRef<"input"> & { label: string; icon: IconName; id: string }) {
  return (
    <div className="min-w-0">
      <label className={styles.fieldLabel} htmlFor={id}>
        {label}
      </label>
      <div className={styles.inputWrap}>
        <Icon name={icon} />
        <input {...props} id={id} className={styles.input} />
      </div>
    </div>
  );
}

const rooms = [
  { name: "Vale tudo", category: "Conhecimentos gerais", players: 5, color: "mint" },
  { name: "Luzes, câmera…", category: "Cinema e séries", players: 3, color: "pink" },
  { name: "Deu ciência", category: "Ciência e natureza", players: 6, color: "cyan" },
  { name: "Na ponta da língua", category: "Palavras e expressões", players: 2, color: "yellow" },
  { name: "Mundo afora", category: "Geografia", players: 4, color: "cyan" },
  { name: "Só mais uma", category: "Conhecimentos gerais", players: 7, color: "mint" },
  { name: "Aumenta o som", category: "Música", players: 8, color: "pink" },
  { name: "Túnel do tempo", category: "História", players: 3, color: "yellow" },
  { name: "Modo aventura", category: "Jogos e cultura pop", players: 6, color: "pink" },
  { name: "Bicho curioso", category: "Animais e natureza", players: 2, color: "mint" },
  { name: "Bateu a fome", category: "Comidas e sabores", players: 4, color: "yellow" },
  { name: "Planeta bola", category: "Esportes", players: 8, color: "cyan" },
  { name: "Mistura boa", category: "Conhecimentos gerais", players: 1, color: "mint" },
  { name: "Fora da órbita", category: "Espaço e universo", players: 5, color: "cyan" },
  { name: "Era uma vez", category: "Livros e histórias", players: 0, color: "yellow" },
  { name: "Cena final", category: "Cinema e séries", players: 3, color: "pink" },
] as const;

function RoomList() {
  return (
    <>
      <div
        className={styles.roomScroll}
        role="region"
        aria-label="Lista de salas ilustrativas"
        tabIndex={0}
      >
        <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
          {rooms.map((room) => (
            <li key={room.name} className={`${styles.room} ${styles[room.color]}`}>
              <div className="flex items-center justify-between gap-2">
                <span className={styles.roomCategoryDot} aria-hidden="true" />
                <span
                  className={`${styles.occupancy} ${room.players === 8 ? styles.full : ""}`}
                  aria-label={`${room.players} de 8 jogadores${room.players === 8 ? ", sala cheia" : ""}`}
                >
                  <Icon name={room.players === 8 ? "lock" : "users"} />
                  <span>
                    {room.players}
                    <span className={styles.capacity}>/8</span>
                  </span>
                </span>
              </div>
              <h3 className={styles.roomName}>{room.name}</h3>
              <p className={styles.roomCategory}>{room.category}</p>
            </li>
          ))}
        </ul>
      </div>
      <div
        className={`${styles.roomCaption} flex flex-wrap items-center justify-between gap-x-4 gap-y-1`}
      >
        <span className="inline-flex items-center gap-1.5">
          <Icon name="info" />
          Salas ilustrativas
        </span>
        <span>Até 8 jogadores por sala</span>
      </div>
    </>
  );
}

function PlayPanel() {
  return (
    <section className={`${styles.panel} ${styles.playPanel}`} aria-labelledby="play-title">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h2 id="play-title" className={styles.panelTitle}>
          <Icon name="play" />
          Jogue agora<span className={styles.titleDot}>.</span>
        </h2>
        <div className={`${styles.online} flex items-center gap-2.5`}>
          <Icon name="users" />
          <span className={styles.onlineCount} aria-label="Contagem indisponível">
            —
          </span>
          <span>
            jogadores
            <br />
            online
          </span>
        </div>
      </div>

      <div className="mb-4 grid grid-cols-1 items-end gap-3 md:grid-cols-2 xl:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)_auto]">
        <Field
          id="nickname"
          label="Seu apelido"
          icon="user"
          placeholder="Como te chamam?"
          autoComplete="nickname"
        />
        <Field
          id="room-search"
          label="Buscar sala"
          icon="search"
          placeholder="Encontre sua turma"
          type="search"
          autoComplete="off"
        />
        <div
          className={`${styles.roomTabs} flex md:col-span-2 md:justify-self-end xl:col-span-1`}
          role="group"
          aria-label="Tipos de sala (ilustrativo)"
        >
          <button type="button" aria-disabled="true" className={styles.activeTab}>
            Salas padrão
          </button>
          <button type="button" aria-disabled="true">
            Salas criadas
          </button>
        </div>
      </div>

      <RoomList />

      <div
        className={`${styles.playActions} mt-6 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between`}
      >
        <div className={`${styles.secondaryActions} grid grid-cols-2 gap-2 sm:grid-cols-3`}>
          <Button>
            <Icon name="info" />
            Info da sala
          </Button>
          <Button>
            <Icon name="bulb" />
            Praticar
          </Button>
          <Button className={styles.createRoom}>
            <Icon name="plus" />
            Criar sala
          </Button>
        </div>
        <Button variant="primary" className={styles.playButton}>
          <span>Jogar</span>
          <Icon name="arrow" />
        </Button>
      </div>
    </section>
  );
}

function LoginPanel() {
  return (
    <section className={`${styles.panel} ${styles.loginPanel}`} aria-labelledby="login-title">
      <h2 id="login-title" className={`${styles.panelTitle} ${styles.loginTitle}`}>
        <Icon name="user" />
        Seu cantinho<span className={styles.titleDot}>.</span>
      </h2>
      <p className={styles.panelDescription}>Entre na sua conta e venha jogar.</p>
      <div className="mt-5 grid gap-4">
        <Field
          id="email"
          label="E-mail"
          icon="mail"
          type="email"
          placeholder="voce@exemplo.com"
          autoComplete="email"
        />
        <Field
          id="password"
          label="Senha"
          icon="lock"
          type="password"
          placeholder="Sua senha"
          autoComplete="current-password"
        />
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3">
        <Button variant="primary" className={styles.loginButton}>
          Entrar
          <Icon name="arrow" />
        </Button>
        <Button variant="outline">Criar conta</Button>
      </div>
      <p className={styles.guestNote}>
        <Icon name="spark" />
        Você também pode jogar como convidado.
      </p>
    </section>
  );
}

function HowToPlay() {
  return (
    <section className={`${styles.panel} ${styles.howPanel}`} aria-labelledby="how-title">
      <div className="flex items-center justify-between gap-3">
        <h2 id="how-title" className={styles.howTitle}>
          Um bom palpite
          <br />
          muda o jogo.
        </h2>
        <span className={styles.questionMark} aria-hidden="true">
          ?
        </span>
      </div>
      <h3 className={styles.howSubtitle}>Como jogar</h3>
      <ol className="grid gap-4">
        <li className="flex items-start gap-3">
          <span className={`${styles.step} ${styles.cyan}`}>1</span>
          <p>
            <strong>Encontre sua sala.</strong>
            <br />
            <span>Escolha um tema e junte a turma.</span>
          </p>
        </li>
        <li className="flex items-start gap-3">
          <span className={`${styles.step} ${styles.pink}`}>2</span>
          <p>
            <strong>Solte seus palpites.</strong>
            <br />
            <span>Leia a pergunta e use as dicas.</span>
          </p>
        </li>
        <li className="flex items-start gap-3">
          <span className={`${styles.step} ${styles.yellow}`}>3</span>
          <p>
            <strong>Avance no tabuleiro.</strong>
            <br />
            <span>Acerte e chegue ao final!</span>
          </p>
        </li>
      </ol>
    </section>
  );
}

function Home() {
  return (
    <div className={styles.home}>
      <div className={styles.confetti} aria-hidden="true" />
      <header className="relative">
        <div className={`${styles.container} ${styles.brandArea}`}>
          <h1 className={styles.wordmark} aria-label="Outguessed">
            <span>Out</span>
            <span>guess</span>
            <span>ed</span>
            <span className={styles.brandSpark} aria-hidden="true">
              <Icon name="spark" />
            </span>
          </h1>
          <p className={styles.tagline}>
            <span>Pense.</span>
            <span>Arrisque.</span>
            <span>Surpreenda.</span>
          </p>
        </div>
        <nav className={styles.navbar} aria-label="Navegação principal">
          <div
            className={`${styles.container} flex flex-wrap items-center gap-x-2 gap-y-1 sm:gap-x-4`}
          >
            <span className={`${styles.navItem} ${styles.navActive}`} aria-current="page">
              <Icon name="play" />
              Início
            </span>
            <button type="button" aria-disabled="true" className={styles.navItem}>
              <Icon name="book" />
              Baralhos
            </button>
            <button type="button" aria-disabled="true" className={styles.navItem}>
              <Icon name="bulb" />
              Como jogar
            </button>
            <button type="button" aria-disabled="true" className={styles.navItem}>
              <Icon name="info" />
              Sobre
            </button>
          </div>
        </nav>
      </header>

      <main
        className={`${styles.container} ${styles.main} relative grid items-start gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,3fr)]`}
      >
        <PlayPanel />
        <aside className="grid min-w-0 gap-6" aria-label="Sua conta e como jogar">
          <LoginPanel />
          <HowToPlay />
        </aside>
      </main>

      <footer
        className={`${styles.container} ${styles.footer} relative flex flex-wrap items-center justify-between gap-x-6 gap-y-2`}
      >
        <span className="inline-flex items-center gap-2">
          <Icon name="spark" />
          Outguessed
        </span>
        <p>Perguntas, palpites e boas partidas.</p>
      </footer>
    </div>
  );
}

export default Home;
