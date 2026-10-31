import useLogin from "@/modules/auth/useLogin";
import Field from "@/shared/components/field/field";
import Icon from "@/shared/components/icons/icons";
import Button from "@/shared/components/button/button";
import Panel from "@/shared/components/panel/panel";
import homeStyles from "@/modules/home/home.module.css";
import styles from "./loginPanel.module.css";

export default function LoginPanel() {
  const { state, methods } = useLogin();

  return (
    <Panel className={homeStyles.homeLoginPanel} aria-labelledby="login-title">
      <h2 id="login-title" className={`${homeStyles.homePanelTitle} ${styles.homeLoginTitle}`}>
        <Icon name="user" />
        Seu cantinho
        <span className={`${homeStyles.homeTitleDot} ${styles.homeLoginDot}`}>.</span>
      </h2>
      <div role="status">
        {state.user && (
          <div className="mt-5 grid justify-items-center gap-3">
            <img
              className={styles.homeUserAvatar}
              src={state.user.avatar}
              alt={`Avatar de ${state.user.name}: coruja`}
              width={80}
              height={80}
            />
            <p className={styles.homeUserName}>{state.user.name}</p>
          </div>
        )}
      </div>
      {!state.user && (
        <>
          <p className={styles.homePanelDescription}>Entre na sua conta e venha jogar.</p>
          <form aria-labelledby="login-title" onSubmit={methods.handleSubmit}>
            <div className="mt-5 grid gap-4">
              <Field
                id="email"
                name="email"
                label="E-mail"
                icon="mail"
                type="email"
                placeholder="voce@exemplo.com"
                autoComplete="email"
                autoCapitalize="none"
                spellCheck={false}
                value={state.email}
                onChange={methods.handleEmailChange}
                aria-invalid={state.error ? true : undefined}
                aria-describedby={state.error ? "login-error" : undefined}
                required
              />
              <Field
                id="password"
                name="password"
                label="Senha"
                icon="lock"
                type="password"
                placeholder="Sua senha"
                autoComplete="current-password"
                value={state.password}
                onChange={methods.handlePasswordChange}
                aria-invalid={state.error ? true : undefined}
                aria-describedby={state.error ? "login-error" : undefined}
                required
              />
            </div>
            {state.error && (
              <p id="login-error" role="alert" className={`${styles.homeLoginError} mt-4`}>
                {state.error}
              </p>
            )}
            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button
                type="submit"
                variant="primary"
                className={`${styles.homeLoginAction} ${styles.homeLoginButton}`}
              >
                Entrar
                <Icon name="arrow" />
              </Button>
              <Button
                type="button"
                variant="outline"
                className={styles.homeLoginAction}
                onClick={methods.goToSignUp}
              >
                Criar conta
              </Button>
            </div>
          </form>
          <p className={styles.homeGuestNote}>
            <Icon name="spark" className={styles.homeGuestIcon} />
            Você também pode jogar como convidado.
          </p>
        </>
      )}
    </Panel>
  );
}
