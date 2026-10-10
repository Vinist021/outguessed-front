import type { ComponentPropsWithoutRef } from "react";

import "./button.css";

const variantClasses = {
  primary: "uiButtonPrimary",
  secondary: "uiButtonSecondary",
  outline: "uiButtonOutline",
};

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
      className={`uiButton ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
