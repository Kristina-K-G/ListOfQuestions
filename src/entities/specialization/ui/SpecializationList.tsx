import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useGetSpecializationsQuery } from '../api/specializationApi'
import { filterCatalogItems } from '../../../shared/lib/isCleanCatalogTitle'
import styles from './SpecializationList.module.css'

const PREVIEW_LIMIT = 5

export function SpecializationList() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()

  const selectedId = Number(searchParams.get('specialization')) || null

  const { data, isLoading, isError } = useGetSpecializationsQuery({
    page: 1,
    limit: 5,
  })

  const total = data?.total ?? 0

  const { data: allData, isLoading: isAllLoading } = useGetSpecializationsQuery(
    {
      page: 1,
      limit: total || 5,
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

    if (selectedId === id) {
      next.delete('specialization')
    } else {
      next.set('specialization', String(id))
    }

    next.delete('skills')
    next.set('page', '1')
    setSearchParams(next)
  }

  return (
    <div className={styles.specializations}>
      <h3 className={styles.headerSpecializations}>Специализация</h3>

      {(isLoading || isAllLoading) && <p>Загрузка...</p>}
      {isError && <p>Не удалось загрузить</p>}

      <ul className={styles.list}>
        {visibleItems.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              className={
                selectedId === item.id
                  ? `${styles.chip} ${styles.chipActive}`
                  : styles.chip
              }
              onClick={() => handleSelect(item.id)}
            >
              {item.title}
            </button>
          </li>
        ))}
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