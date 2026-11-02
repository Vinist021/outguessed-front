import { zodResolver } from "@hookform/resolvers/zod";
import type { SubmitEvent } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import useAuth from "@/shared/contexts/auth/useAuth";
import { loginSchema } from "./login.schema";
import type { LoginFormValues } from "./login.schema";

export default function useLogin() {
  const { state, methods } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState, setError, clearErrors, reset, resetField } =
    useForm<LoginFormValues>({
      resolver: zodResolver(loginSchema),
      defaultValues: { email: "", password: "" },
      mode: "onSubmit",
      reValidateMode: "onChange",
    });

  function onValidSubmit(values: LoginFormValues) {
    if (!methods.login(values)) {
      setError("root.credentials", {
        type: "credentials",
        message: "E-mail ou senha inválidos.",
      });
      return;
    }

    resetField("password");
    clearErrors();
  }

  function handleFormSubmit(event: SubmitEvent<HTMLFormElement>) {
    void handleSubmit(onValidSubmit)(event);
  }

  function registerField(name: keyof LoginFormValues) {
    return register(name, {
      onChange: () => clearErrors("root.credentials"),
    });
  }

  function handleLogout() {
    methods.logout();
    reset();
  }

  function goToSignUp() {
    void navigate("/signup");
  }

  return {
    state: {
      errors: formState.errors,
      isSubmitting: formState.isSubmitting,
      user: state.user,
    },
    methods: {
      register: registerField,
      handleSubmit: handleFormSubmit,
      handleLogout,
      goToSignUp,
    },
  };
}
