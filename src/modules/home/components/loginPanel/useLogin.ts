import { useState } from "react";
import type { ChangeEvent, SubmitEvent } from "react";
import { useNavigate } from "react-router";
import useAuth from "@/modules/auth/context/useAuth";

export default function useLogin() {
  const { state, methods } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!methods.login({ email, password })) {
      setError("E-mail ou senha inválidos.");
      return;
    }

    setPassword("");
    setError(null);
  }

  function handleEmailChange(event: ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
    setError(null);
  }

  function handlePasswordChange(event: ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
    setError(null);
  }

  function goToSignUp() {
    void navigate("/signup");
  }

  return {
    state: { email, password, error, user: state.user },
    methods: { handleSubmit, handleEmailChange, handlePasswordChange, goToSignUp },
  };
}
