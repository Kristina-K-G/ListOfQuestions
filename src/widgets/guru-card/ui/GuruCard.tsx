import iconRuslan from '../../../assets/IconRuslan.png'
import iconTg from '../../../assets/IconTG.png'
import iconYoutube from '../../../assets/IconYoutube.png'
import iconProfile from '../../../assets/IconProfile.png'
import { VerifiedIcon } from '../../../shared/ui/icons'
import styles from './GuruCard.module.css'

export function GuruCard() {
  return (
    <aside className={styles.card}>
      <div className={styles.content}>
        <div className={styles.profile}>
          <img
            className={styles.avatar}
            src={iconRuslan}
            alt=""
            width={45}
            height={45}
          />
          <div className={styles.profileInfo}>
            <div className={styles.nameRow}>
              <span className={styles.name}>Руслан Куянец</span>
              <span className={styles.verified} aria-hidden="true">
                <VerifiedIcon />
              </span>
            </div>
            <span className={styles.role}>Python Guru</span>
          </div>
        </div>

        <p className={styles.description}>
          Guru — это эксперты YeaHub, которые помогают развивать комьюнити.
        </p>

        <ul className={styles.socials}>
          <li>
            <a
              className={styles.socialLink}
              href="#"
              onClick={(event) => event.preventDefault()}
              aria-label="Telegram"
            >
              <img src={iconTg} alt="" width={24} height={24} />
            </a>
          </li>
          <li>
            <a
              className={styles.socialLink}
              href="#"
              onClick={(event) => event.preventDefault()}
              aria-label="YouTube"
            >
              <img src={iconYoutube} alt="" width={24} height={24} />
            </a>
          </li>
          <li>
            <a
              className={styles.socialLink}
              href="#"
              onClick={(event) => event.preventDefault()}
              aria-label="Профиль"
            >
              <img src={iconProfile} alt="" width={24} height={24} />
            </a>
          </li>
        </ul>
      </div>
    </aside>
  )
}