import Icon from "../../shared/components/icons/icons";
import HowToPlay from "./components/howToPlay/howToPlay";
import LoginPanel from "./components/loginPanel/loginPanel";
import PlayPanel from "./components/playPanel";
import styles from "./home.module.css";

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
