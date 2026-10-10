import Button from "@/shared/components/button/button";
import Icon from "../../shared/components/icons/icons";
import Field from "@/shared/components/field/field";
import styles from "./home.module.css";
import RoomList from "./components/roomList";

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
