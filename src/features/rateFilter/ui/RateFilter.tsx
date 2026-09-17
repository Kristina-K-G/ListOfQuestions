import { useSearchParams } from 'react-router-dom'
import styles from './RateFilter.module.css'

const OPTIONS: number[] = [1, 2, 3, 4, 5]

export function RateFilter() {
  const [searchParams, setSearchParams] = useSearchParams()
  const selected = Number(searchParams.get('rate')) || null

  const handleSelect = (value: number) => {
    const next = new URLSearchParams(searchParams)

    if (selected === value) {
      next.delete('rate')
    } else {
      next.set('rate', String(value))
    }

    next.set('page', '1')
    setSearchParams(next)
  }

  return (
    <div className={styles.root}>
      <h3 className={styles.title}>Рейтинг</h3>
      <ul className={styles.list}>
        {OPTIONS.map((value) => {
          const isActive = selected === value

          return (
            <li key={value}>
              <button
                type="button"
                className={
                  isActive
                    ? `${styles.chip} ${styles.chipActive}`
                    : styles.chip
                }
                onClick={() => handleSelect(value)}
              >
                {value}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}