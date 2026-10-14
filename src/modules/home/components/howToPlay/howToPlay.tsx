import Panel from "../panel/panel";
import "./howToPlay.css";

export default function HowToPlay() {
  return (
    <Panel className="homeHowPanel" aria-labelledby="how-title">
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
          <span className="homeHowStep homeHowStep--cyan">1</span>
          <p className="homeHowStepText">
            <strong className="homeHowStepLead">Encontre sua sala.</strong>
            <br />
            <span className="homeHowStepDescription">Escolha um tema e junte a turma.</span>
          </p>
        </li>
        <li className="flex items-start gap-3">
          <span className="homeHowStep homeHowStep--pink">2</span>
          <p className="homeHowStepText">
            <strong className="homeHowStepLead">Solte seus palpites.</strong>
            <br />
            <span className="homeHowStepDescription">Leia a pergunta e use as dicas.</span>
          </p>
        </li>
        <li className="flex items-start gap-3">
          <span className="homeHowStep homeHowStep--yellow">3</span>
          <p className="homeHowStepText">
            <strong className="homeHowStepLead">Avance no tabuleiro.</strong>
            <br />
            <span className="homeHowStepDescription">Acerte e chegue ao final!</span>
          </p>
        </li>
      </ol>
    </Panel>
  );
}
