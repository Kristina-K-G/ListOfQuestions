import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import logoYeaHub from "../../../assets/logoYeaHub.png";
import { useFilterMenu } from "../../../shared/lib/filterMenuContext";
import {
  BurgerIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  LoginIcon,
  MaterialsIcon,
  QuestionsIcon,
  RegisterIcon,
  SkillsIcon,
  TrainerIcon,
} from "../../../shared/ui/icons";
import { Sidebar } from "../../sidebar/ui/Sidebar";
import styles from "./Header.module.css";

export function Header() {
  const { pathname } = useLocation();
  const { isOpen, close, toggle } = useFilterMenu();
  const [isPrepOpen, setIsPrepOpen] = useState(false);
  const prepRef = useRef<HTMLDivElement>(null);
  const isQuestionsPage =
    pathname === "/" || pathname.startsWith("/questions/");
  const isQuestionDetail = /^\/questions\/[^/]+/.test(pathname);
  const showFiltersDrawer = isOpen && !isQuestionDetail;

  useEffect(() => {
    close();
  }, [pathname, close]);

  useEffect(() => {
    if (!isPrepOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (
        prepRef.current &&
        !prepRef.current.contains(event.target as Node)
      ) {
        setIsPrepOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsPrepOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isPrepOpen]);

  const closePrep = () => setIsPrepOpen(false);

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

          <div className={styles.prepWrap} ref={prepRef}>
            <button
              type="button"
              className={styles.prep}
              aria-label="Подготовка"
              aria-expanded={isPrepOpen}
              aria-haspopup="menu"
              onClick={() => setIsPrepOpen((prev) => !prev)}
            >
              <span>Подготовка</span>
              <ChevronDownIcon
                className={
                  isPrepOpen
                    ? `${styles.prepIcon} ${styles.prepIconOpen}`
                    : styles.prepIcon
                }
              />
            </button>

            {isPrepOpen ? (
              <div className={styles.prepMenu} role="menu">
                <div className={styles.prepSection}>
                  <p className={styles.prepSectionTitle}>Навигация</p>
                  <NavLink
                    to="/"
                    end
                    role="menuitem"
                    className={
                      isQuestionsPage ? styles.prepItemActive : styles.prepItem
                    }
                    onClick={closePrep}
                  >
                    <span className={styles.prepItemIcon}>
                      <QuestionsIcon />
                    </span>
                    <span className={styles.prepItemLabel}>База вопросов</span>
                    <span className={styles.prepItemArrow}>
                      <ChevronRightIcon />
                    </span>
                  </NavLink>
                  <a
                    href="#"
                    role="menuitem"
                    className={styles.prepItem}
                    onClick={closePrep}
                  >
                    <span className={styles.prepItemIcon}>
                      <TrainerIcon />
                    </span>
                    <span className={styles.prepItemLabel}>Тренажёр</span>
                    <span className={styles.prepItemArrow}>
                      <ChevronRightIcon />
                    </span>
                  </a>
                  <a
                    href="#"
                    role="menuitem"
                    className={styles.prepItem}
                    onClick={closePrep}
                  >
                    <span className={styles.prepItemIcon}>
                      <MaterialsIcon />
                    </span>
                    <span className={styles.prepItemLabel}>Материалы</span>
                    <span className={styles.prepItemArrow}>
                      <ChevronRightIcon />
                    </span>
                  </a>
                  <a
                    href="#"
                    role="menuitem"
                    className={styles.prepItem}
                    onClick={closePrep}
                  >
                    <span className={styles.prepItemIcon}>
                      <SkillsIcon />
                    </span>
                    <span className={styles.prepItemLabel}>Навыки (hh)</span>
                    <span className={styles.prepItemArrow}>
                      <ChevronRightIcon />
                    </span>
                  </a>
                </div>

                <div className={styles.prepDivider} />

                <div className={styles.prepSection}>
                  <p className={styles.prepSectionTitle}>Аккаунт</p>
                  <button
                    type="button"
                    role="menuitem"
                    className={styles.prepItem}
                    onClick={closePrep}
                  >
                    <span className={styles.prepItemIcon}>
                      <LoginIcon />
                    </span>
                    <span className={styles.prepItemLabel}>Вход</span>
                    <span className={styles.prepItemArrow}>
                      <ChevronRightIcon />
                    </span>
                  </button>
                  <button
                    type="button"
                    role="menuitem"
                    className={styles.prepItemAccent}
                    onClick={closePrep}
                  >
                    <span className={styles.prepItemIcon}>
                      <RegisterIcon />
                    </span>
                    <span className={styles.prepItemLabel}>Регистрация</span>
                    <span className={styles.prepItemArrow}>
                      <ChevronRightIcon />
                    </span>
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <div className={styles.actions}>
          <span className={styles.login}>Вход</span>
          <button type="button" className={styles.register}>
            Регистрация
          </button>
        </div>

        <button
          type="button"
          className={styles.burger}
          aria-label="Открыть меню"
          aria-expanded={isOpen}
          onClick={() => {
            setIsPrepOpen(false);
            toggle();
          }}
        >
          <BurgerIcon />
        </button>
      </div>

      {showFiltersDrawer ? (
        <>
          <button
            type="button"
            className={styles.backdrop}
            aria-label="Закрыть меню"
            onClick={close}
          />
          <div className={styles.menuPanel}>
            <Sidebar variant="drawer" onClose={close} />
          </div>
        </>
      ) : null}
    </header>
  );
}
