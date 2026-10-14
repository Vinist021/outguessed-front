import type { ComponentPropsWithoutRef } from "react";
import type { IconName } from "@/shared/components/icons/types";
import Icon from "@/shared/components/icons/icons";
import styles from "./field.module.css";

export default function Field({
  label,
  icon,
  id,
  ...props
}: ComponentPropsWithoutRef<"input"> & { label: string; icon: IconName; id: string }) {
  return (
    <div className="min-w-0">
      <label className={styles.uiFieldLabel} htmlFor={id}>
        {label}
      </label>
      <div className={styles.uiInputWrap}>
        <Icon name={icon} className={styles.uiInputIcon} />
        <input {...props} id={id} className={styles.uiInput} />
      </div>
    </div>
  );
}
