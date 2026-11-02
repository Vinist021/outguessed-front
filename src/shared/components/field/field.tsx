import type { ComponentPropsWithRef, ReactNode } from "react";
import type { IconName } from "@/shared/components/icons/types";
import Icon from "@/shared/components/icons/icons";
import styles from "./field.module.css";

export default function Field({
  label,
  icon,
  id,
  endAction,
  error,
  "aria-invalid": ariaInvalid,
  "aria-describedby": ariaDescribedBy,
  ...props
}: ComponentPropsWithRef<"input"> & {
  label: string;
  icon: IconName;
  id: string;
  endAction?: ReactNode;
  error?: string;
}) {
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [ariaDescribedBy, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className="min-w-0">
      <label className={styles.uiFieldLabel} htmlFor={id}>
        {label}
      </label>
      <div className={styles.uiInputWrap}>
        <Icon name={icon} className={styles.uiInputIcon} />
        <input
          {...props}
          id={id}
          aria-invalid={error ? true : ariaInvalid}
          aria-describedby={describedBy}
          className={endAction ? `${styles.uiInput} ${styles.uiInputWithAction}` : styles.uiInput}
        />
        {endAction && <div className={styles.uiInputAction}>{endAction}</div>}
      </div>
      {error && (
        <p id={errorId} className={styles.uiFieldError} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
