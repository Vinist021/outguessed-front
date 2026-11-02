import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import type { MouseEvent, SubmitEvent } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { defaultProfilePhoto, profilePhotos } from "./mocks/profilePhotos";
import type { ProfilePhotoId } from "./mocks/profilePhotos";
import { signUpCredentialsStepSchema, signUpSchema } from "./signUp.schema";
import type { SignUpFormValues } from "./signUp.schema";

export default function useSignUp() {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2>(1);
  const { register, handleSubmit, formState, reset, getValues } = useForm<SignUpFormValues>({
    resolver: zodResolver(step === 1 ? signUpCredentialsStepSchema : signUpSchema),
    defaultValues: { email: "", password: "", nickname: "" },
    mode: "onSubmit",
    reValidateMode: "onChange",
    shouldUnregister: false,
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [profilePhotoId, setProfilePhotoId] = useState<ProfilePhotoId | null>(null);
  const [isPhotoPickerOpen, setIsPhotoPickerOpen] = useState(false);
  const selectedProfilePhoto =
    profilePhotos.find((photo) => photo.id === profilePhotoId) ?? defaultProfilePhoto;
  const formRef = useRef<HTMLFormElement>(null);
  const photoDialogRef = useRef<HTMLDialogElement>(null);
  const photoButtonRef = useRef<HTMLButtonElement>(null);
  const previousStep = useRef(step);

  useEffect(() => {
    if (previousStep.current !== step) {
      formRef.current?.querySelector<HTMLInputElement>("input")?.focus();
      previousStep.current = step;
    }
  }, [step]);

  useEffect(() => {
    const dialog = photoDialogRef.current;
    const button = photoButtonRef.current;
    if (!isPhotoPickerOpen || !dialog) return;

    dialog.showModal();
    dialog.querySelector<HTMLButtonElement>('[aria-pressed="true"]')?.focus();

    return () => {
      dialog.close();
      if (button?.isConnected) button.focus();
    };
  }, [isPhotoPickerOpen]);

  async function validateAndSubmit(event: SubmitEvent<HTMLFormElement>) {
    let isValid = false;
    await handleSubmit(() => {
      isValid = true;
    })(event);

    if (!isValid) return;

    if (step === 1) {
      reset(getValues());
      setStep(2);
      return;
    }

    void navigate("/", { replace: true });
  }

  function handleFormSubmit(event: SubmitEvent<HTMLFormElement>) {
    void validateAndSubmit(event);
  }

  function togglePasswordVisible() {
    setPasswordVisible((visible) => !visible);
  }

  function goToFirstStep() {
    setIsPhotoPickerOpen(false);
    reset(getValues());
    setStep(1);
  }

  function openPhotoPicker(event: MouseEvent<HTMLButtonElement>) {
    photoButtonRef.current = event.currentTarget;
    setIsPhotoPickerOpen(true);
  }

  function closePhotoPicker() {
    setIsPhotoPickerOpen(false);
  }

  function selectProfilePhoto(id: ProfilePhotoId) {
    setProfilePhotoId(id);
    closePhotoPicker();
  }

  return {
    state: {
      step,
      errors: formState.errors,
      isSubmitting: formState.isSubmitting,
      passwordVisible,
      selectedProfilePhoto,
      hasSelectedProfilePhoto: profilePhotoId !== null,
      isPhotoPickerOpen,
    },
    methods: {
      register,
      handleSubmit: handleFormSubmit,
      togglePasswordVisible,
      goToFirstStep,
      openPhotoPicker,
      closePhotoPicker,
      selectProfilePhoto,
    },
    refs: {
      formRef,
      photoDialogRef,
    },
  };
}
