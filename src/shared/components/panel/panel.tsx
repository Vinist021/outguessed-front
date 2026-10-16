import type { ComponentPropsWithoutRef } from "react";
import styles from "./panel.module.css";

type PanelProps = ComponentPropsWithoutRef<"section">;

export default function Panel({ className, ...props }: PanelProps) {
  return <section className={[styles.uiPanel, className].filter(Boolean).join(" ")} {...props} />;
}
