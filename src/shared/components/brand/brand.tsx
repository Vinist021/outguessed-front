import Icon from "@/shared/components/icons/icons";
import styles from "./brand.module.css";

type BrandProps = {
  as?: "h1" | "span";
};

export default function Brand({ as: Tag = "span" }: BrandProps) {
  return (
    <Tag className={styles.uiBrand} aria-label="Outguessed">
      <span className={styles.uiBrandOut}>Out</span>
      <span className={styles.uiBrandGuess}>guess</span>
      <span className={styles.uiBrandEd}>ed</span>
      <span className={styles.uiBrandSpark} aria-hidden="true">
        <Icon name="spark" />
      </span>
    </Tag>
  );
}
