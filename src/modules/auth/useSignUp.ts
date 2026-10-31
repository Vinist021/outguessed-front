import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, FormEvent, MouseEvent } from "react";
import { defaultProfilePhoto, profilePhotos } from "./mocks/profilePhotos";
import type { ProfilePhotoId } from "./mocks/profilePhotos";

export default function useSignUp() {
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
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
    setIsPhotoPickerOpen(false);
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
      email,
      password,
      nickname,
      canSubmit: nickname.trim().length > 0,
      passwordVisible,
      selectedProfilePhoto,
      hasSelectedProfilePhoto: profilePhotoId !== null,
      isPhotoPickerOpen,
    },
    methods: {
      handleSubmit,
      handleEmailChange,
      handlePasswordChange,
      handleNicknameChange,
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
