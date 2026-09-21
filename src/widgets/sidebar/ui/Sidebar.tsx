import { useSearchParams } from "react-router-dom";
import type { ChangeEvent } from "react";
import { SpecializationList } from "../../../entities/specialization/ui/SpecializationList";
import { SkillList } from "../../../entities/skill/ui/SkillList";
import { ComplexityFilter } from "../../../features/question-filter/ui/ComplexityFilter";
import { RateFilter } from "../../../features/rateFilter/ui/RateFilter";
import { StatusFilter } from "../../../features/statusFilter/ui/StatusFilter";
import { CloseIcon } from "../../../shared/ui/icons";
import styles from "./Sidebar.module.css";
import searchIcon from "../../../assets/searchIcon.png";

type SidebarProps = {
  onClose?: () => void;
  variant?: "default" | "drawer";
};

export function Sidebar({ onClose, variant = "default" }: SidebarProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const title = searchParams.get("title") || "";

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const next = new URLSearchParams(searchParams);
    const value = event.target.value;

    if (value.trim()) {
      next.set("title", value.trim());
    } else {
      next.delete("title");
    }

    next.set("page", "1");
    setSearchParams(next);
  };

  const rootClassName =
    variant === "drawer"
      ? `${styles.sidebar} ${styles.drawer}`
      : styles.sidebar;

  return (
    <aside className={rootClassName}>
      {onClose ? (
        <button
          type="button"
          className={styles.close}
          onClick={onClose}
          aria-label="Закрыть меню"
        >
          <CloseIcon />
        </button>
      ) : null}

      <div className={styles.filter}>
        <div className={styles.searchWrapper}>
          <img
            src={searchIcon}
            alt="Иконка поиска"
            className={styles.searchIcon}
          />
          <input
            className={styles.searchInput}
            placeholder="Введите запрос..."
            value={title}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <div className={styles.specializationBlock}>
        <SpecializationList />
      </div>
      <SkillList
        title={
          variant === "drawer" ? "Категории вопросов" : "Навыки"
        }
      />
      <ComplexityFilter />
      <RateFilter />
      <StatusFilter />
    </aside>
  );
}
