import Icon from "@/shared/components/icons/icons";
import HowToPlay from "@/modules/home/components/howToPlay/howToPlay";
import LoginPanel from "@/modules/home/components/loginPanel/loginPanel";
import PlayPanel from "@/modules/home/components/playPanel/playPanel";
import "./home.css";

function Home() {
  return (
    <div className="home">
      <div className="homeConfetti" aria-hidden="true" />
      <header className="relative">
        <div className="homeContainer homeBrandArea">
          <h1 className="homeWordmark" aria-label="Outguessed">
            <span>Out</span>
            <span>guess</span>
            <span>ed</span>
            <span className="homeBrandSpark" aria-hidden="true">
              <Icon name="spark" />
            </span>
          </h1>
          <p className="homeTagline">
            <span>Pense.</span>
            <span>Arrisque.</span>
            <span>Surpreenda.</span>
          </p>
        </div>
        <nav className="homeNavbar" aria-label="Navegação principal">
          <div className="homeContainer flex flex-wrap items-center gap-x-2 gap-y-1 sm:gap-x-4">
            <span className="homeNavItem homeNavActive" aria-current="page">
              <Icon name="play" />
              Início
            </span>
            <button type="button" aria-disabled="true" className="homeNavItem">
              <Icon name="book" />
              Baralhos
            </button>
            <button type="button" aria-disabled="true" className="homeNavItem">
              <Icon name="bulb" />
              Como jogar
            </button>
            <button type="button" aria-disabled="true" className="homeNavItem">
              <Icon name="info" />
              Sobre
            </button>
          </div>
        </nav>
      </header>

      <main className="homeContainer homeMain relative grid items-start gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,3fr)]">
        <PlayPanel />
        <aside className="grid min-w-0 gap-6" aria-label="Sua conta e como jogar">
          <LoginPanel />
          <HowToPlay />
        </aside>
      </main>

      <footer className="homeContainer homeFooter relative flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
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
