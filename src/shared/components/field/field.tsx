import type { ComponentPropsWithoutRef } from "react";
import type { IconName } from "@/shared/components/icons/types";
import Icon from "@/shared/components/icons/icons";
import "./field.css";

export default function Field({
  label,
  icon,
  id,
  ...props
}: ComponentPropsWithoutRef<"input"> & { label: string; icon: IconName; id: string }) {
  return (
    <div className="min-w-0">
      <label className="uiFieldLabel" htmlFor={id}>
        {label}
      </label>
      <div className="uiInputWrap">
        <Icon name={icon} />
        <input {...props} id={id} className="uiInput" />
      </div>
    </div>
  );
}
