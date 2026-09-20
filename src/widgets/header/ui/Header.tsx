import { NavLink, useLocation } from "react-router-dom";
import logoYeaHub from "../../../assets/logoYeaHub.png";
import styles from "./Header.module.css";

export function Header() {
  const { pathname } = useLocation();
  const isQuestionsPage =
    pathname === "/" || pathname.startsWith("/questions/");

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <img
            className={styles.logo}
            src={logoYeaHub}
            alt="Yeahub"
            width={172}
            height={33}
          />
          <nav className={styles.nav}>
            <NavLink
              to="/"
              end
              className={isQuestionsPage ? styles.navActive : styles.navLink}
            >
              База вопросов
            </NavLink>
            <NavLink to="#" className={styles.navLink}>
              Тренажёр
            </NavLink>
            <NavLink to="#" className={styles.navLink}>
              Материалы
            </NavLink>
            <NavLink to="#" className={styles.navLink}>
              Навыки (hh)
            </NavLink>
          </nav>
        </div>
        <div className={styles.actions}>
          <span className={styles.login}>Вход</span>
          <button type="button" className={styles.register}>
            Регистрация
          </button>
        </div>
      </div>
    </header>
  );
}
