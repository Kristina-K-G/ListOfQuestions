import type { QuestionSkill } from '../../../entities/question/model/types'
import skillsIcon from '../../../assets/SkillsIcon.png'
import { CloseIcon } from '../../../shared/ui/icons'
import styles from './Question.module.css'

export type QuestionMetaProps = {
  complexity?: number
  rate?: number
  skills: QuestionSkill[]
  keywords: string[]
  authorName?: string
  onClose?: () => void
  variant?: 'card' | 'drawer'
}

export function QuestionMeta({
  complexity,
  rate,
  skills,
  keywords,
  authorName,
  onClose,
  variant = 'card',
}: QuestionMetaProps) {
  const rootClassName =
    variant === 'drawer'
      ? `${styles.metaCard} ${styles.metaDrawer}`
      : styles.metaCard

  return (
    <div className={rootClassName}>
      {onClose ? (
        <button
          type="button"
          className={styles.metaClose}
          onClick={onClose}
          aria-label="Закрыть меню"
        >
          <CloseIcon />
        </button>
      ) : null}

      <div className={styles.metaBlock}>
        <h3 className={styles.metaLabel}>Уровень:</h3>
        <div className={styles.levelRow}>
          <div className={styles.statCard}>
            <div className={styles.statInner}>
              <span className={styles.statName}>Сложность:</span>
              <span className={styles.badge}>{complexity}</span>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statInner}>
              <span className={styles.statName}>Рейтинг:</span>
              <span className={styles.badge}>{rate}</span>
            </div>
          </div>
        </div>
      </div>

      {skills.length > 0 ? (
        <div className={styles.metaBlock}>
          <h3 className={styles.metaLabel}>Навыки:</h3>
          <ul className={styles.skills}>
            {skills.map((skill) => (
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
          Автор: <span className={styles.authorName}>{authorName}</span>
        </p>
      ) : null}
    </div>
  )
}
