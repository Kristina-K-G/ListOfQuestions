import { useSearchParams } from "react-router-dom";
import type { ChangeEvent } from "react";
import { SpecializationList } from "../../../entities/specialization/ui/SpecializationList";
import { SkillList } from "../../../entities/skill/ui/SkillList";
import { ComplexityFilter } from "../../../features/question-filter/ui/ComplexityFilter";
import { RateFilter } from "../../../features/rateFilter/ui/RateFilter";
import { StatusFilter } from "../../../features/statusFilter/ui/StatusFilter";
import styles from "./Sidebar.module.css";
import searchIcon from "../../../assets/searchIcon.png";

export function Sidebar() {
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
  return (
    <aside className={styles.sidebar}>
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
      <SpecializationList />
      <SkillList />
      <ComplexityFilter />
      <RateFilter />
      <StatusFilter />
    </aside>
  );
}
