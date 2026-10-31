import type { ComponentPropsWithoutRef } from "react";

import styles from "./button.module.css";

const variantClasses = {
  primary: styles.uiButtonPrimary,
  secondary: styles.uiButtonSecondary,
  tertiary: styles.uiButtonTertiary,
  outline: styles.uiButtonOutline,
};

export default function Button({
  children,
  variant = "tertiary",
  className = "",
  type = "button",
  ...props
}: ComponentPropsWithoutRef<"button"> & {
  variant?: "primary" | "secondary" | "tertiary" | "outline";
}) {
  return (
    <button
      {...props}
      type={type}
      className={[styles.uiButton, variantClasses[variant], className].filter(Boolean).join(" ")}
    >
      {children}
    </button>
  );
}
