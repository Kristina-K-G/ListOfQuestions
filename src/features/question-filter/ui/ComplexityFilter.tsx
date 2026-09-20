import { useSearchParams } from "react-router-dom";
import styles from "./ComplexityFilter.module.css";

type ComplexityOption = {
  label: string
  values: number[]
}

const OPTIONS: ComplexityOption[] = [
  { label: "1-3", values: [1, 2, 3] },
  { label: "4-6", values: [4, 5, 6] },
  { label: "7-8", values: [7, 8] },
  { label: "9-10", values: [9, 10] },
];

export function ComplexityFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selected = searchParams.get("complexity") || "";

  const handleSelect = (values: number[]) => {
    const next = new URLSearchParams(searchParams);
    const value = values.join(",");
    if (selected === value) {
      next.delete("complexity");
    } else {
      next.set("complexity", value);
    }
    next.set("page", "1");
    setSearchParams(next);
  }

    return (
      <div className={styles.root}>
        <h3 className={styles.title}>Уровень сложности</h3>
        <ul className={styles.list}>
          {OPTIONS.map((option) => {
            const value = option.values.join(",");
            const isActive = selected === value;
            return (
              <li key={option.label}>
                <button
                  type="button"
                  className={
                    isActive
                      ? `${styles.chip} ${styles.chipActive}`
                      : styles.chip
                  }
                  onClick={() => handleSelect(option.values)}
                >
                  {option.label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

