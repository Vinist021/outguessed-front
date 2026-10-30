import Icon from "@/shared/components/icons/icons";
import Brand from "@/shared/components/brand/brand";
import Confetti from "@/shared/components/confetti/confetti";
import HowToPlay from "@/modules/home/components/howToPlay/howToPlay";
import LoginPanel from "@/modules/home/components/loginPanel/loginPanel";
import PlayPanel from "@/modules/home/components/playPanel/playPanel";
import styles from "./home.module.css";

function Home() {
  return (
    <div className={styles.home}>
      <Confetti />
      <header className="relative">
        <div className={`${styles.homeContainer} ${styles.homeBrandArea}`}>
          <Brand as="h1" />
          <p className={styles.homeTagline}>
            <span className={styles.homeTaglinePart}>Pense.</span>
            <span className={styles.homeTaglinePart}>Arrisque.</span>
            <span className={styles.homeTaglinePart}>Surpreenda.</span>
          </p>
        </div>
        <nav className={styles.homeNavbar} aria-label="Navegação principal">
          <div
            className={`${styles.homeContainer} flex flex-wrap items-center gap-x-2 gap-y-1 sm:gap-x-4`}
          >
            <span className={`${styles.homeNavItem} ${styles.homeNavActive}`} aria-current="page">
              <Icon name="play" />
              Início
            </span>
            <button
              type="button"
              aria-disabled="true"
              className={`${styles.homeNavItem} ${styles.homeNavButton}`}
            >
              <Icon name="book" />
              Baralhos
            </button>
            <button
              type="button"
              aria-disabled="true"
              className={`${styles.homeNavItem} ${styles.homeNavButton}`}
            >
              <Icon name="bulb" />
              Como jogar
            </button>
            <button
              type="button"
              aria-disabled="true"
              className={`${styles.homeNavItem} ${styles.homeNavButton}`}
            >
              <Icon name="info" />
              Sobre
            </button>
          </div>
        </nav>
      </header>

      <main
        className={`${styles.homeContainer} ${styles.homeMain} relative grid items-start gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,3fr)]`}
      >
        <PlayPanel />
        <aside className="grid min-w-0 gap-6" aria-label="Sua conta e como jogar">
          <LoginPanel />
          <HowToPlay />
        </aside>
      </main>

      <footer
        className={`${styles.homeContainer} ${styles.homeFooter} relative flex flex-wrap items-center justify-between gap-x-6 gap-y-2`}
      >
        <span className={`${styles.homeFooterBrand} inline-flex items-center gap-2`}>
          <Icon name="spark" />
          Outguessed
        </span>
        <p>Perguntas, palpites e boas partidas.</p>
      </footer>
    </div>
  );
}

export default Home;
