import styles from '@/modules/home/home.module.css';

export default function HowToPlay() {
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