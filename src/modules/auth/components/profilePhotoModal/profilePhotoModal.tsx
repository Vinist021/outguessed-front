import type { KeyboardEvent, MouseEvent, Ref } from "react";
import Button from "@/shared/components/button/button";
import { profilePhotos } from "../../mocks/profilePhotos";
import type { ProfilePhotoId } from "../../mocks/profilePhotos";
import styles from "./profilePhotoModal.module.css";

type ProfilePhotoModalProps = {
  ref: Ref<HTMLDialogElement>;
  selectedPhotoId: ProfilePhotoId;
  onSelect: (id: ProfilePhotoId) => void;
  onClose: () => void;
};

export default function ProfilePhotoModal({
  ref,
  selectedPhotoId,
  onSelect,
  onClose,
}: ProfilePhotoModalProps) {
  function handleKeyDown(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key !== "Tab") return;

    const buttons =
      event.currentTarget.querySelectorAll<HTMLButtonElement>("button:not(:disabled)");
    const firstButton = buttons.item(0);
    const lastButton = buttons.item(buttons.length - 1);

    if (event.shiftKey && document.activeElement === firstButton) {
      event.preventDefault();
      lastButton.focus();
    } else if (!event.shiftKey && document.activeElement === lastButton) {
      event.preventDefault();
      firstButton.focus();
    }
  }

  function handleBackdropClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target !== event.currentTarget) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    if (
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom
    ) {
      onClose();
    }
  }

  return (
    <dialog
      ref={ref}
      id="signup-profile-photo-dialog"
      className={styles.authPhotoDialog}
      aria-labelledby="signup-profile-photo-title"
      aria-describedby="signup-profile-photo-description"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClose={onClose}
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
    >
      <div className="grid gap-5">
        <div className="grid gap-2">
          <h2 id="signup-profile-photo-title" className={styles.authPhotoTitle}>
            Escolha sua foto de perfil
          </h2>
          <p id="signup-profile-photo-description" className={styles.authPhotoDescription}>
            Escolha um avatar para usar no seu perfil.
          </p>
        </div>
        <div
          className="grid grid-cols-3 gap-3"
          role="group"
          aria-label="Fotos de perfil disponíveis"
        >
          {profilePhotos.map((photo) => (
            <button
              key={photo.id}
              type="button"
              className={`${styles.authPhotoOption} grid justify-items-center gap-2`}
              aria-pressed={photo.id === selectedPhotoId}
              onClick={() => onSelect(photo.id)}
            >
              <img src={photo.src} alt="" width={72} height={72} />
              <span>{photo.name}</span>
              <span className={styles.authPhotoSelection} aria-hidden="true">
                {photo.id === selectedPhotoId ? "Selecionada" : "Escolher"}
              </span>
            </button>
          ))}
        </div>
        <Button variant="outline" onClick={onClose}>
          Fechar
        </Button>
      </div>
    </dialog>
  );
}
