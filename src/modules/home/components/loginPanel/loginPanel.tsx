import Field from "@/shared/components/field/field";
import Icon from "@/shared/components/icons/icons";
import styles from "@/modules/home/home.module.css";
import Button from "@/shared/components/button/button";
import "./loginPanel.module.css";

export default function LoginPanel() {
  return (
    <section className={`${styles.panel} homeLoginPanel`} aria-labelledby="login-title">
      <h2 id="login-title" className={`${styles.panelTitle} homeLoginTitle`}>
        <Icon name="user" />
        Seu cantinho<span className={`${styles.titleDot} homeLoginDot`}>.</span>
      </h2>
      <p className="homePanelDescription">Entre na sua conta e venha jogar.</p>
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
        <Button variant="primary" className="homeLoginAction homeLoginButton">
          Entrar
          <Icon name="arrow" />
        </Button>
        <Button variant="outline" className="homeLoginAction">
          Criar conta
        </Button>
      </div>
      <p className="homeGuestNote">
        <Icon name="spark" />
        Você também pode jogar como convidado.
      </p>
    </section>
  );
}
