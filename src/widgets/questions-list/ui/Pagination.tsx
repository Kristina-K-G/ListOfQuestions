import {
  PaginationArrowLeftIcon,
  PaginationArrowRightIcon,
} from "../../../shared/ui/icons";
import styles from "./Pagination.module.css";

export type PageItem = number | "ellipsis";
export type PaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

function getPageItems(page: number, totalPages: number): PageItem[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  if (page <= 5) {
    return [1, 2, 3, 4, 5, 6, "ellipsis", totalPages];
  }
  if (page >= totalPages - 4) {
    return [
      1,
      "ellipsis",
      totalPages - 5,
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }
  return [
    1,
    "ellipsis",
    page - 2,
    page - 1,
    page,
    page + 1,
    page + 2,
    "ellipsis",
    totalPages,
  ];
}

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const items = getPageItems(page, totalPages);

  return (
    <div className={styles.pagination}>
      <button
        type="button"
        className={styles.arrowBtn}
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
      >
        <PaginationArrowLeftIcon />
      </button>

      {items.map((item, index) => {
        if (item === "ellipsis") {
          return (
            <span key={`ellipsis-${index}`} className={styles.ellipsis}>
              ...
            </span>
          );
        }
        const isActive = item === page;

        return (
          <button
            key={item}
            type="button"
            className={isActive ? styles.pageActive : styles.page}
            onClick={() => onPageChange(item)}
          >
            {item}
          </button>
        );
      })}
      <button
        type="button"
        className={styles.arrowBtn}
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
      >
        <PaginationArrowRightIcon />
      </button>
    </div>
  );
}
