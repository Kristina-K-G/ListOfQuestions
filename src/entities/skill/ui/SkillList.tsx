import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useGetSkillsQuery } from '../api/skillApi'
import { filterCatalogItems } from '../../../shared/lib/isCleanCatalogTitle'
import skillsIcon from '../../../assets/SkillsIcon.png'
import styles from './SkillList.module.css'

const PREVIEW_LIMIT = 5

function parseIds(value: string | null): number[] {
  if (!value) return []
  return value
    .split(',')
    .map(Number)
    .filter((id) => !Number.isNaN(id))
}

type SkillListProps = {
  title?: string
}

export function SkillList({ title = 'Навыки' }: SkillListProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()

  const specializationId = searchParams.get('specialization') || undefined
  const selectedSkills = parseIds(searchParams.get('skills'))

  const { data, isLoading, isError } = useGetSkillsQuery({
    page: 1,
    limit: PREVIEW_LIMIT,
    specializations: specializationId,
  })

  const total = data?.total ?? 0

  const { data: allData, isLoading: isAllLoading } = useGetSkillsQuery(
    {
      page: 1,
      limit: total || PREVIEW_LIMIT,
      specializations: specializationId,
    },
    {
      skip: total === 0,
    },
  )

  const cleanItems = filterCatalogItems(allData?.data ?? data?.data ?? [])
  const visibleItems = isExpanded
    ? cleanItems
    : cleanItems.slice(0, PREVIEW_LIMIT)

  const showToggle = cleanItems.length > PREVIEW_LIMIT

  const handleSelect = (id: number) => {
    const next = new URLSearchParams(searchParams)
    const set = new Set(selectedSkills)

    if (set.has(id)) {
      set.delete(id)
    } else {
      set.add(id)
    }

    const value = [...set].join(',')
    if (value) {
      next.set('skills', value)
    } else {
      next.delete('skills')
    }

    next.set('page', '1')
    setSearchParams(next)
  }

  return (
    <div className={styles.skills}>
      <h3 className={styles.headerSkills}>{title}</h3>

      {(isLoading || isAllLoading) && <p>Загрузка...</p>}
      {isError && <p>Не удалось загрузить</p>}

      <ul className={styles.list}>
        {visibleItems.map((item) => {
          const isActive = selectedSkills.includes(item.id)

          return (
            <li key={item.id}>
              <button
                type="button"
                className={
                  isActive
                    ? `${styles.chip} ${styles.chipActive}`
                    : styles.chip
                }
                onClick={() => handleSelect(item.id)}
              >
                <img
                  className={styles.icon}
                  src={item.imageSrc || skillsIcon}
                  alt=""
                  width={30}
                  height={30}
                  onError={(event) => {
                    event.currentTarget.src = skillsIcon
                  }}
                />
                <span className={styles.label}>{item.title}</span>
              </button>
            </li>
          )
        })}
      </ul>

      {showToggle ? (
        <button
          type="button"
          className={styles.seeAll}
          onClick={() => setIsExpanded((prev) => !prev)}
        >
          {isExpanded ? 'Скрыть' : 'Посмотреть все'}
        </button>
      ) : null}
    </div>
  )
}