import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

export default function useSignUp() {
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const previousStep = useRef(step);

  useEffect(() => {
    if (previousStep.current !== step) {
      formRef.current?.querySelector<HTMLInputElement>("input")?.focus();
      previousStep.current = step;
    }
  }, [step]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (step === 1) setStep(2);
  }

  function handleEmailChange(event: ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event: ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  function handleNicknameChange(event: ChangeEvent<HTMLInputElement>) {
    setNickname(event.target.value);
  }

  function togglePasswordVisible() {
    setPasswordVisible((visible) => !visible);
  }

  function goToFirstStep() {
    setStep(1);
  }

  return {
    state: {
      step,
      email,
      password,
      nickname,
      passwordVisible,
    },
    methods: {
      handleSubmit,
      handleEmailChange,
      handlePasswordChange,
      handleNicknameChange,
      togglePasswordVisible,
      goToFirstStep,
    },
    refs: {
      formRef,
    },
  };
}
