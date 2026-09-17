import styles from "./Pagination.module.css";

export function ArrowLeftIcon() {
  return (
    <svg
      className={styles.arrowIcon}
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="14" cy="14" r="13.25" stroke="#6A0BFF" strokeWidth="1.5" />
      <path
        d="M16 9L11 14L16 19"
        stroke="#6A0BFF"
        strokeWidth="1.67"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowRightIcon() {
  return (
    <svg
      className={styles.arrowIcon}
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="14" cy="14" r="13.25" stroke="#6A0BFF" strokeWidth="1.5" />
      <path
        d="M12 9L17 14L12 19"
        stroke="#6A0BFF"
        strokeWidth="1.67"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export type PageItem = number | 'ellipsis'
export type PaginationProps = {
  page: number
  totalPages: number
  // функция: приняла номер страницы, ничего не вернула
  onPageChange: (page: number) => void
}

function getPageItems(page: number, totalPages: number): PageItem[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  // начало
  if (page <= 5) {
    return [1, 2, 3, 4, 5, 6, "ellipsis", totalPages];
  }
  if (page >= totalPages - 4) {
    // конец
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
    // середина
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
        <ArrowLeftIcon />
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
        <ArrowRightIcon />
      </button>
    </div>
  );
}
