import { useSearchParams } from "react-router-dom";
import { useGetPublicQuestionsQuery } from "../../../entities/question/api/questionApi";
import { QuestionCard } from "../../../entities/question/ui/questionCard/QuestionCard";
import { useFilterMenu } from "../../../shared/lib/filterMenuContext";
import { FilterIcon } from "../../../shared/ui/icons";
import { Pagination } from "./Pagination";
import styles from "./QuestionsList.module.css";

const LIMIT = 10;

function parseIds(value: string | null): number[] {
  if (!value) return [];
  return value
    .split(",")
    .map(Number)
    .filter((id) => !Number.isNaN(id));
}

export function QuestionsList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { open } = useFilterMenu();
  const pageFromUrl = Number(searchParams.get("page")) || 1;
  const specializationId =
    Number(searchParams.get("specialization")) || undefined;
  const skills = parseIds(searchParams.get("skills"));
  const complexity = parseIds(searchParams.get("complexity"));
  const rate = parseIds(searchParams.get("rate"));
  const title = searchParams.get("title") || undefined;

  const { data, isLoading, isError } = useGetPublicQuestionsQuery({
    page: pageFromUrl,
    limit: LIMIT,
    specializationId,
    skills,
    complexity,
    rate,
    title,
  });

  const handlePageChange = (nextPage: number) => {
    const next = new URLSearchParams(searchParams);
    next.set("page", String(nextPage));
    setSearchParams(next);
  };

  if (isLoading) {
    return <p>Идет загрузка...</p>;
  }

  if (isError) {
    return <p>Не удалось загрузить вопросы</p>;
  }

  const questions = data?.data ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.ceil(total / LIMIT);

  if (questions.length === 0) {
    return <p>Вопросы не найдены</p>;
  }

  return (
    <section className={styles.list}>
      <div className={styles.titleRow}>
        <h1 className={styles.title}>Вопросы React, JavaScript</h1>
        <button
          type="button"
          className={styles.filterButton}
          aria-label="Открыть фильтры"
          onClick={open}
        >
          <FilterIcon />
        </button>
      </div>
      <div className={styles.questions}>
        {questions.map((question) => (
          <QuestionCard key={question.id} question={question} />
        ))}
      </div>
      <div className={styles.pagination}>
        <Pagination
          page={pageFromUrl}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </section>
  );
}
