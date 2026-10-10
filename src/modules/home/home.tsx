import Button from "@/shared/components/button/button";
import Field from "@/shared/components/field/field";
import Icon from "../../shared/components/icons/icons";
import styles from "./home.module.css";
import PlayPanel from "./components/playPanel";

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
