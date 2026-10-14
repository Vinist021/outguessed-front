import Field from "@/shared/components/field/field";
import Icon from "@/shared/components/icons/icons";
import Button from "@/shared/components/button/button";
import Panel from "@/shared/components/panel/panel";
import "./loginPanel.css";

export default function LoginPanel() {
  return (
    <Panel className="homeLoginPanel" aria-labelledby="login-title">
      <h2 id="login-title" className="homePanelTitle homeLoginTitle">
        <Icon name="user" />
        Seu cantinho<span className="homeTitleDot homeLoginDot">.</span>
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
    </Panel>
  );
}
