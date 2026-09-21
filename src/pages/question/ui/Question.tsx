import { useEffect, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import {
  useGetPublicQuestionsByIdQuery,
  useGetPublicQuestionsQuery,
} from '../../../entities/question/api/questionApi'
import { getAdjacentQuestions } from '../../../shared/lib/getAdjacentQuestions'
import { useFilterMenu } from '../../../shared/lib/filterMenuContext'
import { BackIcon, NextIcon, PrevIcon } from '../../../shared/ui/icons'
import { GuruCard } from '../../../widgets/guru-card/ui/GuruCard'
import { QuestionMeta } from './QuestionMeta'
import styles from './Question.module.css'

const LIMIT = 10

function parseIds(value: string | null): number[] {
  if (!value) return []
  return value
    .split(',')
    .map(Number)
    .filter((id) => !Number.isNaN(id))
}

function Question() {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const search = searchParams.toString()
  const listPath = search ? `/?${search}` : '/'
  const { isOpen, close } = useFilterMenu()

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

  const listParams = {
    page: pageFromUrl,
    limit: LIMIT,
    specializationId,
    skills,
    complexity,
    rate,
    title,
  }

  const { data: listData } = useGetPublicQuestionsQuery(listParams)

  const questions = listData?.data ?? []
  const { prev, next } = getAdjacentQuestions(questions, id)

  const isFirstOnPage =
    questions.length > 0 && String(questions[0].id) === String(id)
  const isLastOnPage =
    questions.length > 0 &&
    String(questions[questions.length - 1].id) === String(id)
  const total = listData?.total ?? 0
  const hasPrevPage = pageFromUrl > 1
  const hasNextPage = pageFromUrl * LIMIT < total

  const { data: prevPageData } = useGetPublicQuestionsQuery(
    { ...listParams, page: pageFromUrl - 1 },
    { skip: !isFirstOnPage || !hasPrevPage || Boolean(prev) },
  )

  const { data: nextPageData } = useGetPublicQuestionsQuery(
    { ...listParams, page: pageFromUrl + 1 },
    { skip: !isLastOnPage || !hasNextPage || Boolean(next) },
  )

  const prevFromPage =
    prev ??
    (prevPageData?.data?.length
      ? prevPageData.data[prevPageData.data.length - 1]
      : null)
  const nextFromPage =
    next ?? (nextPageData?.data?.length ? nextPageData.data[0] : null)

  const [isLongExpanded, setIsLongExpanded] = useState(false)

  const buildQuestionPath = (
    questionId: string | number,
    search: string,
    page?: number,
  ): string => {
    const params = new URLSearchParams(search)
    if (page != null) {
      params.set('page', String(page))
    }
    const query = params.toString()
    return query ? `/questions/${questionId}?${query}` : `/questions/${questionId}`
  }

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, close])

  if (isLoading) {
    return <p>Идет загрузка...</p>
  }

  if (isError || !data) {
    return <p>Не удалось загрузить вопрос...</p>
  }

  const skillsList = data.questionSkills ?? []
  const keywords = data.keywords ?? []
  const authorName = data.createdBy?.username

  const metaProps = {
    complexity: data.complexity,
    rate: data.rate,
    skills: skillsList,
    keywords,
    authorName,
  }

  return (
    <main className={styles.page}>
      {isOpen ? (
        <>
          <button
            type="button"
            className={styles.metaBackdrop}
            aria-label="Закрыть меню"
            onClick={close}
          />
          <div className={styles.metaPanel} role="dialog" aria-label="Информация о вопросе">
            <QuestionMeta {...metaProps} variant="drawer" onClose={close} />
          </div>
        </>
      ) : null}

      <Link to={listPath} className={styles.back}>
        <BackIcon />
        Назад
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
              {prevFromPage ? (
                <Link
                  to={buildQuestionPath(
                    prevFromPage.id,
                    search,
                    !prev && prevFromPage ? pageFromUrl - 1 : undefined,
                  )}
                  className={styles.navBtn}
                >
                  <span className={styles.navIcon} aria-hidden="true">
                    <PrevIcon />
                  </span>
                  <span className={styles.navLabel}>Предыдущий</span>
                </Link>
              ) : (
                <button type="button" className={styles.navBtn} disabled>
                  <span className={styles.navIcon} aria-hidden="true">
                    <PrevIcon />
                  </span>
                  <span className={styles.navLabel}>Предыдущий</span>
                </button>
              )}

              {nextFromPage ? (
                <Link
                  to={buildQuestionPath(
                    nextFromPage.id,
                    search,
                    !next && nextFromPage ? pageFromUrl + 1 : undefined,
                  )}
                  className={styles.navBtn}
                >
                  <span className={styles.navLabel}>Следующий</span>
                  <span className={styles.navIcon} aria-hidden="true">
                    <NextIcon />
                  </span>
                </Link>
              ) : (
                <button type="button" className={styles.navBtn} disabled>
                  <span className={styles.navLabel}>Следующий</span>
                  <span className={styles.navIcon} aria-hidden="true">
                    <NextIcon />
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
          <QuestionMeta {...metaProps} />
          <GuruCard />
        </aside>
      </div>
    </main>
  )
}

export default Question
