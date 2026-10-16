import { useState } from "react";
import { Link } from "react-router";
import Brand from "@/shared/components/brand/brand";
import Button from "@/shared/components/button/button";
import Field from "@/shared/components/field/field";
import Icon from "@/shared/components/icons/icons";
import Panel from "@/shared/components/panel/panel";
import styles from "./signUp.module.css";

export default function SignUp() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div className={`${styles.authPage} flex min-h-svh flex-col`}>
      <header className={`${styles.authHeader} flex flex-col items-center gap-2`}>
        <Link to="/" className={styles.authBrandLink} aria-label="Outguessed — início">
          <Brand />
        </Link>
        <Link to="/" className={styles.authLink}>
          Voltar ao início
        </Link>
      </header>

      <main className={`${styles.authMain} grid w-full flex-1 content-center gap-6`}>
        <Panel className={styles.authPanel} aria-labelledby="signup-title">
          <h1
            id="signup-title"
            className={`${styles.authTitle} flex items-center justify-center gap-2`}
          >
            <Icon name="user" />
            Criar conta
          </h1>
          <form
            className="mt-6 grid gap-5"
            aria-labelledby="signup-title"
            aria-describedby="signup-unavailable"
            onSubmit={(event) => event.preventDefault()}
          >
            <Field
              id="signup-email"
              name="email"
              label="E-mail"
              icon="mail"
              type="email"
              placeholder="voce@exemplo.com"
              autoComplete="email"
              autoCapitalize="none"
              spellCheck={false}
              required
            />
            <Field
              id="signup-password"
              name="password"
              label="Senha"
              icon="lock"
              type={passwordVisible ? "text" : "password"}
              placeholder="Sua senha"
              autoComplete="new-password"
              required
              endAction={
                <button
                  type="button"
                  className={styles.authPasswordToggle}
                  aria-label={passwordVisible ? "Ocultar senha" : "Mostrar senha"}
                  aria-controls="signup-password"
                  onClick={() => setPasswordVisible((visible) => !visible)}
                >
                  <Icon name={passwordVisible ? "eye" : "eyeOff"} />
                </button>
              }
            />
            <div className="grid gap-3">
              <p id="signup-unavailable" className={styles.authNotice}>
                O cadastro ainda não está disponível.
              </p>
              <Button
                type="submit"
                variant="primary"
                disabled
                aria-describedby="signup-unavailable"
              >
                Criar conta
              </Button>
            </div>
          </form>
        </Panel>
        <p className={styles.authSignIn}>
          Já tem uma conta?{" "}
          <Link to="/" className={styles.authLink}>
            Entrar
          </Link>
        </p>
      </main>

      <footer className={styles.authFooter}>Perguntas, palpites e boas partidas.</footer>
    </div>
  );
}
