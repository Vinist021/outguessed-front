import type { ComponentPropsWithoutRef } from "react";

import styles from "@/modules/home/home.module.css";

export default function Button({
  children,
  variant = "secondary",
  className = "",
  ...props
}: ComponentPropsWithoutRef<"button"> & { variant?: "primary" | "secondary" | "outline" }) {
  return (
    <button
      {...props}
      type="button"
      aria-disabled="true"
      className={`${styles.button} ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}