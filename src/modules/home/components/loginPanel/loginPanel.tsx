import Field from "@/shared/components/field/field";
import Icon from "@/shared/components/icons/icons";
import Button from "@/shared/components/button/button";
import Panel from "@/shared/components/panel/panel";
import homeStyles from "@/modules/home/home.module.css";
import styles from "./loginPanel.module.css";
import useLogin from "./useLogin";

export default function LoginPanel() {
  const { state, methods } = useLogin();

  if (state.user) {
    return (
      <Panel className={styles.homePlayerCard} aria-labelledby="login-title">
        <div className={`${styles.homePlayerBanner} relative`}>
          <h2 id="login-title" className={`${homeStyles.homePanelTitle} ${styles.homePlayerTitle}`}>
            <Icon name="user" />
            Seu cantinho
            <span className={`${homeStyles.homeTitleDot} ${styles.homeLoginDot}`}>.</span>
          </h2>
          <span className={styles.homePlayerDecoration} aria-hidden="true" />
        </div>
        <div className={`${styles.homePlayerBody} relative`}>
          <div role="status" className="grid min-w-0 justify-items-start gap-2">
            <img
              className={styles.homeUserAvatar}
              src={state.user.avatar}
              alt={`Avatar de ${state.user.name}: coruja`}
              width={80}
              height={80}
            />
            <p className={styles.homeUserName}>{state.user.name}</p>
          </div>
          <div className="mt-6 grid grid-cols-[minmax(0,1fr)_auto] gap-3">
            <Button type="button" variant="primary" className={styles.homeLoginAction}>
              Perfil
            </Button>
            <Button
              type="button"
              variant="outline"
              className={`${styles.homeLoginAction} ${styles.homePlayerLogout}`}
              onClick={methods.handleLogout}
            >
              Sair
            </Button>
          </div>
        </div>
      </Panel>
    );
  }

  return (
    <Panel className={homeStyles.homeLoginPanel} aria-labelledby="login-title">
      <h2 id="login-title" className={`${homeStyles.homePanelTitle} ${styles.homeLoginTitle}`}>
        <Icon name="user" />
        Seu cantinho
        <span className={`${homeStyles.homeTitleDot} ${styles.homeLoginDot}`}>.</span>
      </h2>
      <p className={styles.homePanelDescription}>Entre na sua conta e venha jogar.</p>
      <form aria-labelledby="login-title" onSubmit={methods.handleSubmit} noValidate>
        <div className="mt-5 grid gap-4">
          <Field
            id="email"
            label="E-mail"
            icon="mail"
            type="email"
            placeholder="voce@exemplo.com"
            autoComplete="email"
            autoCapitalize="none"
            spellCheck={false}
            {...methods.register("email")}
            error={state.errors.email?.message}
            aria-invalid={state.errors.root?.credentials ? true : undefined}
            aria-describedby={state.errors.root?.credentials ? "login-error" : undefined}
            required
          />
          <Field
            id="password"
            label="Senha"
            icon="lock"
            type="password"
            placeholder="Sua senha"
            autoComplete="current-password"
            {...methods.register("password")}
            error={state.errors.password?.message}
            aria-invalid={state.errors.root?.credentials ? true : undefined}
            aria-describedby={state.errors.root?.credentials ? "login-error" : undefined}
            required
          />
        </div>
        {state.errors.root?.credentials && (
          <p id="login-error" role="alert" className={`${styles.homeLoginError} mt-4`}>
            {state.errors.root.credentials.message}
          </p>
        )}
        <div className="mt-6 grid grid-cols-2 gap-3">
          <Button
            type="submit"
            variant="primary"
            className={`${styles.homeLoginAction} ${styles.homeLoginButton}`}
            disabled={state.isSubmitting}
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
    </Panel>
  );
}
