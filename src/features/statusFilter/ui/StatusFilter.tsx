import { useSearchParams } from "react-router-dom";
import styles from "./StatusFilter.module.css";

type StatusValue = "learned" | "unlearned" | "all";
type StatusOption = { label: string; value: StatusValue };

const OPTIONS: StatusOption[] = [
  { label: "Изученные", value: "learned" },
  { label: "Не изученные", value: "unlearned" },
  { label: "Все", value: "all" },
];

export function StatusFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selected = searchParams.get("status") || "all";

  const handleSelect = (value: StatusValue) => {
    const next = new URLSearchParams(searchParams);
    next.set("status", value);
    next.set("page", "1");
    setSearchParams(next);
  };

  return (
    <div className={styles.root}>
      <h3 className={styles.title}>Статус</h3>
      <ul className={styles.list}>
        {OPTIONS.map((option) => {
          const isActive = selected === option.value;

          return (
            <li key={option.value}>
              <button
                type="button"
                className={
                  isActive ? `${styles.chip} ${styles.chipActive}` : styles.chip
                }
                onClick={() => handleSelect(option.value)}
              >
                {option.label}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
