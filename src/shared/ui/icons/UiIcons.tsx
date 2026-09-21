type IconProps = {
  className?: string
}

/** Стрелка «назад» (фиолетовая) */
export function BackIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M14.5 6.5L9 12L14.5 17.5"
        stroke="#6A0BFF"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** Шеврон влево — «Предыдущий» на странице вопроса */
export function PrevIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M14.5 6.5L9 12L14.5 17.5"
        stroke="#5E5E5E"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** Шеврон вправо — «Следующий» на странице вопроса */
export function NextIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M9.5 6.5L15 12L9.5 17.5"
        stroke="#5E5E5E"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** Круглая стрелка пагинации влево */
export function PaginationArrowLeftIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
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
  )
}

/** Круглая стрелка пагинации вправо */
export function PaginationArrowRightIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
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
  )
}

/** Крестик закрытия drawer */
export function CloseIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M5.5 5.5l7 7M12.5 5.5l-7 7"
        stroke="#F3164E"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

/** Иконка фильтров в заголовке списка */
export function FilterIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M3.5 5.5h13M5.5 10h9M7.5 14.5h5"
        stroke="#191919"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="7" cy="5.5" r="1.75" fill="#191919" />
      <circle cx="13" cy="10" r="1.75" fill="#191919" />
      <circle cx="11" cy="14.5" r="1.75" fill="#191919" />
    </svg>
  )
}

/** Бургер-меню в хедере */
export function BurgerIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M7 10h18M7 16h18M7 22h18"
        stroke="#191919"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

/** Шеврон вниз («Подготовка») */
export function ChevronDownIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M7 10l5 5 5-5"
        stroke="#191919"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** Галочка верификации Guru */
export function VerifiedIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="8" fill="#6A0BFF" />
      <path
        d="M4.5 8L7 10.5L11.5 5.5"
        stroke="#FFFFFF"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
