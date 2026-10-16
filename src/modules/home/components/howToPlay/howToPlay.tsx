import Panel from "@/shared/components/panel/panel";
import homeStyles from "@/modules/home/home.module.css";
import styles from "./howToPlay.module.css";

export default function HowToPlay() {
  return (
    <Panel
      className={`${homeStyles.homeHowPanel} ${styles.homeHowPanel}`}
      aria-labelledby="how-title"
    >
      <div className="flex items-center justify-between gap-3">
        <h2 id="how-title" className={styles.homeHowTitle}>
          Um bom palpite
          <br />
          muda o jogo.
        </h2>
        <span className={styles.homeQuestionMark} aria-hidden="true">
          ?
        </span>
      </div>
      <h3 className={styles.homeHowSubtitle}>Como jogar</h3>
      <ol className="grid gap-4">
        <li className="flex items-start gap-3">
          <span className={`${styles.homeHowStep} ${styles.homeHowStepCyan}`}>1</span>
          <p className={styles.homeHowStepText}>
            <strong className={styles.homeHowStepLead}>Encontre sua sala.</strong>
            <br />
            <span className={styles.homeHowStepDescription}>Escolha um tema e junte a turma.</span>
          </p>
        </li>
        <li className="flex items-start gap-3">
          <span className={`${styles.homeHowStep} ${styles.homeHowStepPink}`}>2</span>
          <p className={styles.homeHowStepText}>
            <strong className={styles.homeHowStepLead}>Solte seus palpites.</strong>
            <br />
            <span className={styles.homeHowStepDescription}>Leia a pergunta e use as dicas.</span>
          </p>
        </li>
        <li className="flex items-start gap-3">
          <span className={`${styles.homeHowStep} ${styles.homeHowStepYellow}`}>3</span>
          <p className={styles.homeHowStepText}>
            <strong className={styles.homeHowStepLead}>Avance no tabuleiro.</strong>
            <br />
            <span className={styles.homeHowStepDescription}>Acerte e chegue ao final!</span>
          </p>
        </li>
      </ol>
    </Panel>
  );
}
