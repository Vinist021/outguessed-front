import  "@/modules/home/home.css";
import "./howToPlay.css";

export default function HowToPlay() {
  return (
    <section className="panel homeHowPanel" aria-labelledby="how-title">
      <div className="flex items-center justify-between gap-3">
        <h2 id="how-title" className="homeHowTitle">
          Um bom palpite
          <br />
          muda o jogo.
        </h2>
        <span className="homeQuestionMark" aria-hidden="true">
          ?
        </span>
      </div>
      <h3 className="homeHowSubtitle">Como jogar</h3>
      <ol className="grid gap-4">
        <li className="flex items-start gap-3">
          <span className="homeHowStep cyan">1</span>
          <p>
            <strong>Encontre sua sala.</strong>
            <br />
            <span>Escolha um tema e junte a turma.</span>
          </p>
        </li>
        <li className="flex items-start gap-3">
          <span className="homeHowStep pink">2</span>
          <p>
            <strong>Solte seus palpites.</strong>
            <br />
            <span>Leia a pergunta e use as dicas.</span>
          </p>
        </li>
        <li className="flex items-start gap-3">
          <span className="homeHowStep yellow">3</span>
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
