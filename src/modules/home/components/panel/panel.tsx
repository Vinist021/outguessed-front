import type { ComponentPropsWithoutRef } from "react";
import "./panel.css";

type PanelProps = ComponentPropsWithoutRef<"section">;

export default function Panel({ className, ...props }: PanelProps) {
  return <section className={["homePanel", className].filter(Boolean).join(" ")} {...props} />;
}
