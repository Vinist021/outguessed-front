import { Link } from "react-router";
import Brand from "@/shared/components/brand/brand";
import Button from "@/shared/components/button/button";
import Confetti from "@/shared/components/confetti/confetti";
import Field from "@/shared/components/field/field";
import Icon from "@/shared/components/icons/icons";
import Panel from "@/shared/components/panel/panel";
import ProfilePhotoModal from "./components/profilePhotoModal/profilePhotoModal";
import styles from "./signUp.module.css";
import useSignUp from "./useSignUp";

export default function SignUp() {
  const { state, methods, refs } = useSignUp();

  return (
    <div className={`${styles.authPage} flex min-h-svh flex-col`}>
      <Confetti />
      <header className={`${styles.authHeader} mt-auto flex flex-col items-center`}>
        <Link to="/" className={styles.authBrandLink} aria-label="Outguessed — início">
          <Brand />
        </Link>
      </header>

      <main className={`${styles.authMain} grid w-full gap-6`}>
        <Panel className={styles.authPanel} aria-labelledby="signup-title">
          {state.step === 1 ? (
            <Link to="/" className={styles.authBackLink} aria-label="Voltar ao início">
              <Icon name="arrowUturnLeft" />
            </Link>
          ) : (
            <button
              type="button"
              className={styles.authBackLink}
              aria-label="Voltar para E-mail e Senha"
              onClick={methods.goToFirstStep}
            >
              <Icon name="arrowUturnLeft" />
            </button>
          )}
          <h1
            id="signup-title"
            className={`${styles.authTitle} flex items-center justify-center gap-2`}
          >
            <Icon name="user" />
            Criar conta
          </h1>
          <form
            ref={refs?.formRef}
            className="my-1 grid gap-5"
            aria-labelledby="signup-title"
            onSubmit={methods.handleSubmit}
          >
            {state.step === 1 ? (
              <>
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
                  value={state.email}
                  onChange={methods.handleEmailChange}
                  required
                />
                <Field
                  id="signup-password"
                  name="password"
                  label="Senha"
                  icon="lock"
                  type={state.passwordVisible ? "text" : "password"}
                  placeholder="Sua senha"
                  autoComplete="new-password"
                  value={state.password}
                  onChange={methods.handlePasswordChange}
                  required
                  endAction={
                    <button
                      type="button"
                      className={styles.authPasswordToggle}
                      aria-label={state.passwordVisible ? "Ocultar senha" : "Mostrar senha"}
                      aria-controls="signup-password"
                      onClick={methods.togglePasswordVisible}
                    >
                      <Icon name={state.passwordVisible ? "eye" : "eyeOff"} />
                    </button>
                  }
                />
                <Button type="submit" variant="primary">
                  Avançar
                </Button>
              </>
            ) : (
              <>
                <div className="grid justify-items-center gap-3">
                  <img
                    className={styles.authProfilePhoto}
                    src={state.selectedProfilePhoto.src}
                    alt={`Foto de perfil: ${state.selectedProfilePhoto.name}`}
                    width={80}
                    height={80}
                  />
                  <Button
                    variant="outline"
                    aria-haspopup="dialog"
                    aria-controls="signup-profile-photo-dialog"
                    aria-expanded={state.isPhotoPickerOpen}
                    onClick={methods.openPhotoPicker}
                  >
                    {state.hasSelectedProfilePhoto
                      ? "Alterar foto de perfil"
                      : "Escolher foto de perfil"}
                  </Button>
                </div>
                <Field
                  id="signup-nickname"
                  name="nickname"
                  label="Apelido"
                  icon="user"
                  type="text"
                  placeholder="Como te chamam?"
                  autoComplete="nickname"
                  value={state.nickname}
                  onChange={methods.handleNicknameChange}
                  required
                />
                <Button type="submit" variant="primary" disabled={!state.canSubmit}>
                  Criar conta
                </Button>
              </>
            )}
          </form>

          {state.step === 2 && (
            <ProfilePhotoModal
              ref={refs?.photoDialogRef}
              selectedPhotoId={state.selectedProfilePhoto.id}
              onSelect={methods.selectProfilePhoto}
              onClose={methods.closePhotoPicker}
            />
          )}

          <p className={styles.authSignIn}>
            Já tem uma conta?{" "}
            <Link to="/" className={styles.authLink}>
              Entrar
            </Link>
          </p>
        </Panel>
      </main>

      <footer className={`${styles.authFooter} mt-auto`}>
        Perguntas, palpites e boas partidas.
      </footer>
    </div>
  );
}
