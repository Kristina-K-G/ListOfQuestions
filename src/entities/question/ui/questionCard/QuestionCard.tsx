import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import type { Question } from "../../model/types";
import arrowDown from "../../../../assets/arrowDown.png";
import arrowUp from "../../../../assets/arrowUp.png";
import styles from "./QuestionCard.module.css";

export type QuestionCardProps = {
  question: Question;
};

export function QuestionCard({ question }: QuestionCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const search = searchParams.toString();
  const questionPath = search
    ? `/questions/${question.id}?${search}`
    : `/questions/${question.id}`;

  return (
    <article className={isOpen ? styles.cardOpen : styles.card}>
      <button
        type="button"
        className={styles.header}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className={styles.titleWrapper}>
          <span className={styles.dot}></span>
          <h3 className={styles.title}>{question.title}</h3>
        </div>
        <span className={styles.chevronWrap}>
          <img
            className={styles.chevron}
            src={isOpen ? arrowUp : arrowDown}
            alt=""
            width={24}
            height={24}
          />
        </span>
      </button>

      {isOpen ? (
        <div className={styles.body}>
          <div className={styles.meta}>
            <div className={styles.badge}>
              <span>Рейтинг:</span>
              <span className={styles.badgeValue}>{question.rate}</span>
            </div>
            <div className={styles.badge}>
              <span>Сложность:</span>
              <span className={styles.badgeValue}>{question.complexity}</span>
            </div>
          </div>

          {question.code ? (
            <div
              className={styles.codeBlock}
              dangerouslySetInnerHTML={{ __html: question.code }}
            />
          ) : null}

          {question.description ? (
            <p className={styles.description}>{question.description}</p>
          ) : null}

          <Link
            to={questionPath}
            className={styles.moreLink}
            onClick={(event) => event.stopPropagation()}
          >
            Подробнее →
          </Link>
        </div>
      ) : null}
    </article>
  );
}
