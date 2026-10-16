import type { ComponentPropsWithoutRef } from "react";

import styles from "./button.module.css";

const variantClasses = {
  primary: styles.uiButtonPrimary,
  secondary: styles.uiButtonSecondary,
  outline: styles.uiButtonOutline,
};

export default function Button({
  children,
  variant = "secondary",
  className = "",
  type = "button",
  ...props
}: ComponentPropsWithoutRef<"button"> & { variant?: "primary" | "secondary" | "outline" }) {
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
