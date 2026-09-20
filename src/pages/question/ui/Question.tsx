import { useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import {
  useGetPublicQuestionsByIdQuery,
  useGetPublicQuestionsQuery,
} from '../../../entities/question/api/questionApi'
import { getAdjacentQuestions } from '../../../shared/lib/getAdjacentQuestions'
import { GuruCard } from '../../../widgets/guru-card/ui/GuruCard'
import skillsIcon from '../../../assets/SkillsIcon.png'
import styles from './Question.module.css'

const LIMIT = 10

function parseIds(value: string | null): number[] {
  if (!value) return []
  return value
    .split(',')
    .map(Number)
    .filter((id) => !Number.isNaN(id))
}

function ArrowLeftIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
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

function ArrowRightIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
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

function Question() {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const search = searchParams.toString()
  const listPath = search ? `/?${search}` : '/'

  const pageFromUrl = Number(searchParams.get('page')) || 1
  const specializationId =
    Number(searchParams.get('specialization')) || undefined
  const skills = parseIds(searchParams.get('skills'))
  const complexity = parseIds(searchParams.get('complexity'))
  const rate = parseIds(searchParams.get('rate'))
  const title = searchParams.get('title') || undefined

  const { data, isLoading, isError } = useGetPublicQuestionsByIdQuery(id ?? '', {
    skip: !id,
  })

  const { data: listData } = useGetPublicQuestionsQuery({
    page: pageFromUrl,
    limit: LIMIT,
    specializationId,
    skills,
    complexity,
    rate,
    title,
  })

  const [isLongExpanded, setIsLongExpanded] = useState(false)

  const { prev, next } = getAdjacentQuestions(listData?.data ?? [], id)

  const buildQuestionPath = (questionId: string | number, search: string): string =>
    search ? `/questions/${questionId}?${search}` : `/questions/${questionId}`

  if (isLoading) {
    return <p>Идет загрузка...</p>
  }

  if (isError || !data) {
    return <p>Не удалось загрузить вопрос...</p>
  }

  const skillsList = data.questionSkills ?? []
  const keywords = data.keywords ?? []
  const authorName = data.createdBy?.username

  return (
    <main className={styles.page}>
      <Link to={listPath} className={styles.back}>
        ← Назад
      </Link>

      <div className={styles.columns}>
        <div className={styles.content}>
          <section className={styles.header}>
            {data.imageSrc ? (
              <img
                className={styles.headerImage}
                src={data.imageSrc}
                alt=""
              />
            ) : null}
            <div className={styles.headerText}>
              <h1 className={styles.title}>{data.title}</h1>
              {data.description ? (
                <p className={styles.description}>{data.description}</p>
              ) : null}
            </div>
          </section>

          <nav className={styles.navBlock} aria-label="Навигация по вопросам">
            <div className={styles.navRow}>
              {prev ? (
                <Link to={buildQuestionPath(prev.id, search)} className={styles.navBtn}>
                  <span className={styles.navIcon} aria-hidden="true">
                    <ArrowLeftIcon />
                  </span>
                  <span className={styles.navLabel}>Предыдущий</span>
                </Link>
              ) : (
                <button type="button" className={styles.navBtn} disabled>
                  <span className={styles.navIcon} aria-hidden="true">
                    <ArrowLeftIcon />
                  </span>
                  <span className={styles.navLabel}>Предыдущий</span>
                </button>
              )}

              {next ? (
                <Link to={buildQuestionPath(next.id, search)} className={styles.navBtn}>
                  <span className={styles.navLabel}>Следующий</span>
                  <span className={styles.navIcon} aria-hidden="true">
                    <ArrowRightIcon />
                  </span>
                </Link>
              ) : (
                <button type="button" className={styles.navBtn} disabled>
                  <span className={styles.navLabel}>Следующий</span>
                  <span className={styles.navIcon} aria-hidden="true">
                    <ArrowRightIcon />
                  </span>
                </button>
              )}
            </div>
          </nav>

          {data.shortAnswer ? (
            <section className={styles.shortAnswer}>
              <h2 className={styles.blockTitle}>Краткий ответ</h2>
              <div
                className={styles.answerBody}
                dangerouslySetInnerHTML={{ __html: data.shortAnswer }}
              />
            </section>
          ) : null}

          {data.longAnswer ? (
            <section className={styles.longAnswer}>
              <h2 className={styles.blockTitle}>Развёрнутый ответ</h2>
              <div
                className={
                  isLongExpanded
                    ? styles.answerBody
                    : `${styles.answerBody} ${styles.answerBodyCollapsed}`
                }
                dangerouslySetInnerHTML={{ __html: data.longAnswer }}
              />
              <button
                type="button"
                className={styles.expandBtn}
                onClick={() => setIsLongExpanded((expanded) => !expanded)}
              >
                {isLongExpanded ? 'Свернуть' : 'Развернуть'}
              </button>
            </section>
          ) : null}

          {data.code ? (
            <section className={styles.shortAnswer}>
              <div dangerouslySetInnerHTML={{ __html: data.code }} />
            </section>
          ) : null}
        </div>

        <aside className={styles.aside}>
          <div className={styles.metaCard}>
            <div className={styles.metaBlock}>
              <h3 className={styles.metaLabel}>Уровень:</h3>
              <div className={styles.levelRow}>
                <div className={styles.statCard}>
                  <div className={styles.statInner}>
                    <span className={styles.statName}>Сложность:</span>
                    <span className={styles.badge}>{data.complexity}</span>
                  </div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statInner}>
                    <span className={styles.statName}>Рейтинг:</span>
                    <span className={styles.badge}>{data.rate}</span>
                  </div>
                </div>
              </div>
            </div>

            {skillsList.length > 0 ? (
              <div className={styles.metaBlock}>
                <h3 className={styles.metaLabel}>Навыки:</h3>
                <ul className={styles.skills}>
                  {skillsList.map((skill) => (
                    <li key={skill.id}>
                      <div className={styles.skillChip}>
                        <img
                          className={styles.skillIcon}
                          src={skill.imageSrc || skillsIcon}
                          alt=""
                          width={20}
                          height={20}
                          onError={(event) => {
                            event.currentTarget.src = skillsIcon
                          }}
                        />
                        <span className={styles.skillTitle}>{skill.title}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {keywords.length > 0 ? (
              <div className={styles.metaBlock}>
                <h3 className={styles.metaLabel}>Ключевые слова:</h3>
                <ul className={styles.keywords}>
                  {keywords.map((keyword) => (
                    <li key={keyword} className={styles.keyword}>
                      #{keyword}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {authorName ? (
              <p className={styles.author}>
                Автор:{' '}
                <span className={styles.authorName}>{authorName}</span>
              </p>
            ) : null}
          </div>

          <GuruCard />
        </aside>
      </div>
    </main>
  )
}

export default Question
